function toNumber(value) {
  if (value === null || value === undefined || value === "") return null;

  const cleaned = String(value)
    .replace(/[^\d.-]/g, "")
    .trim();

  if (!cleaned) return null;

  const number = Number(cleaned);
  return Number.isFinite(number) ? number : null;
}

function normaliseText(value) {
  return String(value || "").trim();
}

export function compareNumber(actual, planned, tolerance = 0) {
  const actualNumber = toNumber(actual);
  const plannedNumber = toNumber(planned);

  if (actualNumber === null || plannedNumber === null) {
    return {
      status: "unknown",
      delta: null,
      actual: actualNumber,
      planned: plannedNumber
    };
  }

  const delta = actualNumber - plannedNumber;

  if (Math.abs(delta) <= tolerance) {
    return {
      status: "matched",
      delta,
      actual: actualNumber,
      planned: plannedNumber
    };
  }

  return {
    status: delta > 0 ? "above" : "below",
    delta,
    actual: actualNumber,
    planned: plannedNumber
  };
}

export function compareText(actual, planned) {
  const actualText = normaliseText(actual);
  const plannedText = normaliseText(planned);

  if (!actualText || !plannedText) {
    return {
      status: "unknown",
      actual: actualText,
      planned: plannedText
    };
  }

  if (actualText === plannedText) {
    return {
      status: "matched",
      actual: actualText,
      planned: plannedText
    };
  }

  return {
    status: "changed",
    actual: actualText,
    planned: plannedText
  };
}

export function calculateSetCompliance(actualSet = {}, plannedSet = {}) {
  const load = compareNumber(actualSet.load, plannedSet.load);
  const reps = compareNumber(
    actualSet.result || actualSet.reps,
    plannedSet.reps || plannedSet.result
  );
  const rpe = compareNumber(actualSet.rpe, plannedSet.rpe, 0.5);
  const rest = compareText(actualSet.rest, plannedSet.rest);

  return {
    load,
    reps,
    rpe,
    rest,
    isAsPlanned:
      ["matched", "unknown"].includes(load.status) &&
      ["matched", "unknown"].includes(reps.status) &&
      ["matched", "unknown"].includes(rpe.status) &&
      ["matched", "unknown"].includes(rest.status)
  };
}

export function calculateExerciseCompliance(actualLogs = [], plannedExercise = {}) {
  const plannedSets = plannedExercise.sets || [];
  const matchingLogs = actualLogs.filter(
    log => log.exerciseId === plannedExercise.exerciseId
  );

  const setReports = plannedSets.map((plannedSet, index) => {
    const actualLog = matchingLogs[index];

    if (!actualLog) {
      return {
        plannedSet,
        actualLog: null,
        status: "missed"
      };
    }

    return {
      plannedSet,
      actualLog,
      status: "logged",
      compliance: calculateSetCompliance(
        {
          ...actualLog.data,
          rpe: actualLog.rpe
        },
        plannedSet
      )
    };
  });

  const extraLogs = matchingLogs.slice(plannedSets.length);

  return {
    exerciseId: plannedExercise.exerciseId,
    plannedSets: plannedSets.length,
    loggedSets: matchingLogs.length,
    missedSets: Math.max(0, plannedSets.length - matchingLogs.length),
    extraSets: extraLogs.length,
    setReports,
    extraLogs,
    isComplete: matchingLogs.length >= plannedSets.length,
    isFullyAsPlanned:
      plannedSets.length > 0 &&
      matchingLogs.length >= plannedSets.length &&
      setReports.every(report =>
        report.status === "logged" &&
        report.compliance?.isAsPlanned
      )
  };
}

export function calculateSessionCompliance(session = {}) {
  const plannedExercises = session.plannedExercises || [];
  const actualLogs = session.exercises || [];

  const exerciseReports = plannedExercises.map(plannedExercise =>
    calculateExerciseCompliance(actualLogs, plannedExercise)
  );

  const plannedSetCount = exerciseReports.reduce(
    (total, report) => total + report.plannedSets,
    0
  );

  const loggedSetCount = actualLogs.length;

  const missedSetCount = exerciseReports.reduce(
    (total, report) => total + report.missedSets,
    0
  );

  const extraSetCount = exerciseReports.reduce(
    (total, report) => total + report.extraSets,
    0
  );

  const completedExerciseCount = exerciseReports.filter(
    report => report.isComplete
  ).length;

  const asPlannedExerciseCount = exerciseReports.filter(
    report => report.isFullyAsPlanned
  ).length;

  return {
    sessionId: session.id,
    sessionName: session.name,
    plannedExercises: plannedExercises.length,
    completedExercises: completedExerciseCount,
    plannedSets: plannedSetCount,
    loggedSets: loggedSetCount,
    missedSets: missedSetCount,
    extraSets: extraSetCount,
    asPlannedExercises: asPlannedExerciseCount,
    completionRate:
      plannedSetCount === 0
        ? 0
        : Math.round((Math.min(loggedSetCount, plannedSetCount) / plannedSetCount) * 100),
    exerciseReports
  };
}
