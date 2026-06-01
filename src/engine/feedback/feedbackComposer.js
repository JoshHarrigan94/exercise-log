function getTopDeviations(deviations = [], limit = 4) {
  return deviations
    .filter(item => item.severity === "warning" || item.severity === "positive")
    .slice(0, limit);
}

export function composeSessionFeedback({ compliance, deviations = [], summary }) {
  const topDeviations = getTopDeviations(deviations);

  return {
    title: summary.label,
    message: summary.message,
    completionRate: compliance.completionRate,
    bullets: [
      `${compliance.loggedSets}/${compliance.plannedSets} planned sets logged.`,
      `${compliance.completedExercises}/${compliance.plannedExercises} planned movements completed.`,
      ...topDeviations.map(item => item.message)
    ],
    recommendation: composeRecommendation(summary.status, topDeviations)
  };
}

function composeRecommendation(status, deviations = []) {
  if (status === "as_planned") {
    return "Hold the progression steady or increase slightly next exposure if recovery is good.";
  }

  if (status === "above_plan") {
    return "Consider progressing load, reps, density, or difficulty next time, but avoid increasing every variable at once.";
  }

  if (status === "under_plan") {
    return "Repeat this prescription or reduce one variable next exposure until execution quality stabilises.";
  }

  if (status === "mixed") {
    return "Review which movements exceeded plan and which fell short before progressing the block.";
  }

  if (deviations.length > 0) {
    return "Small deviations logged. Keep the plan stable unless the same pattern repeats.";
  }

  return "Continue collecting planned versus actual data before changing the block.";
}
