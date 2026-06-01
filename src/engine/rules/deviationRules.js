function addDeviation(list, deviation) {
  return [
    ...list,
    {
      severity: deviation.severity || "info",
      type: deviation.type,
      label: deviation.label,
      message: deviation.message,
      meta: deviation.meta || {}
    }
  ];
}

function evaluateComparison({
  list,
  comparison,
  metric,
  higherLabel,
  lowerLabel,
  toleranceLabel
}) {
  if (!comparison || comparison.status === "unknown" || comparison.status === "matched") {
    return list;
  }

  if (comparison.status === "above") {
    return addDeviation(list, {
      severity: metric === "rpe" ? "warning" : "positive",
      type: `${metric}_above_plan`,
      label: higherLabel,
      message: `${metric.toUpperCase()} was above plan by ${comparison.delta}.`,
      meta: comparison
    });
  }

  if (comparison.status === "below") {
    return addDeviation(list, {
      severity: metric === "rpe" ? "positive" : "warning",
      type: `${metric}_below_plan`,
      label: lowerLabel,
      message: `${metric.toUpperCase()} was below plan by ${Math.abs(comparison.delta)}.`,
      meta: comparison
    });
  }

  if (comparison.status === "changed") {
    return addDeviation(list, {
      severity: "info",
      type: `${metric}_changed`,
      label: toleranceLabel,
      message: `${metric} changed from plan.`,
      meta: comparison
    });
  }

  return list;
}

export function getSetDeviations(setReport = {}) {
  if (setReport.status === "missed") {
    return [
      {
        severity: "warning",
        type: "set_missed",
        label: "Missed set",
        message: "This planned set was not logged.",
        meta: {
          plannedSet: setReport.plannedSet
        }
      }
    ];
  }

  const compliance = setReport.compliance;

  if (!compliance) return [];

  let deviations = [];

  deviations = evaluateComparison({
    list: deviations,
    comparison: compliance.load,
    metric: "load",
    higherLabel: "Load increased",
    lowerLabel: "Load reduced",
    toleranceLabel: "Load changed"
  });

  deviations = evaluateComparison({
    list: deviations,
    comparison: compliance.reps,
    metric: "reps",
    higherLabel: "Reps increased",
    lowerLabel: "Reps reduced",
    toleranceLabel: "Reps changed"
  });

  deviations = evaluateComparison({
    list: deviations,
    comparison: compliance.rpe,
    metric: "rpe",
    higherLabel: "RPE higher",
    lowerLabel: "RPE lower",
    toleranceLabel: "RPE changed"
  });

  deviations = evaluateComparison({
    list: deviations,
    comparison: compliance.rest,
    metric: "rest",
    higherLabel: "Rest increased",
    lowerLabel: "Rest reduced",
    toleranceLabel: "Rest changed"
  });

  return deviations;
}

export function getExerciseDeviations(exerciseReport = {}) {
  let deviations = [];

  if (exerciseReport.missedSets > 0) {
    deviations = addDeviation(deviations, {
      severity: "warning",
      type: "missed_sets",
      label: "Missed sets",
      message: `${exerciseReport.missedSets} planned set(s) were missed.`,
      meta: {
        missedSets: exerciseReport.missedSets
      }
    });
  }

  if (exerciseReport.extraSets > 0) {
    deviations = addDeviation(deviations, {
      severity: "positive",
      type: "extra_sets",
      label: "Extra sets",
      message: `${exerciseReport.extraSets} extra set(s) were logged.`,
      meta: {
        extraSets: exerciseReport.extraSets
      }
    });
  }

  exerciseReport.setReports?.forEach(setReport => {
    deviations = [
      ...deviations,
      ...getSetDeviations(setReport)
    ];
  });

  return deviations;
}

export function getSessionDeviations(sessionCompliance = {}) {
  let deviations = [];

  if (sessionCompliance.missedSets > 0) {
    deviations = addDeviation(deviations, {
      severity: "warning",
      type: "session_missed_sets",
      label: "Missed planned work",
      message: `${sessionCompliance.missedSets} set(s) were missed across the session.`,
      meta: {
        missedSets: sessionCompliance.missedSets
      }
    });
  }

  if (sessionCompliance.extraSets > 0) {
    deviations = addDeviation(deviations, {
      severity: "positive",
      type: "session_extra_sets",
      label: "Extra work completed",
      message: `${sessionCompliance.extraSets} extra set(s) were completed.`,
      meta: {
        extraSets: sessionCompliance.extraSets
      }
    });
  }

  sessionCompliance.exerciseReports?.forEach(exerciseReport => {
    deviations = [
      ...deviations,
      ...getExerciseDeviations(exerciseReport)
    ];
  });

  return deviations;
}

export function getDeviationSummary(deviations = []) {
  const warnings = deviations.filter(item => item.severity === "warning").length;
  const positives = deviations.filter(item => item.severity === "positive").length;
  const info = deviations.filter(item => item.severity === "info").length;

  if (warnings === 0 && positives === 0 && info === 0) {
    return {
      status: "as_planned",
      label: "As planned",
      message: "Session matched the planned prescription."
    };
  }

  if (warnings > 0 && positives > 0) {
    return {
      status: "mixed",
      label: "Mixed execution",
      message: "Some work exceeded plan, but some planned work was reduced or missed."
    };
  }

  if (warnings > 0) {
    return {
      status: "under_plan",
      label: "Below plan",
      message: "Some planned work was missed, reduced, or harder than expected."
    };
  }

  if (positives > 0) {
    return {
      status: "above_plan",
      label: "Above plan",
      message: "Session exceeded the planned prescription."
    };
  }

  return {
    status: "changed",
    label: "Modified",
    message: "Session was completed with small changes."
  };
}
