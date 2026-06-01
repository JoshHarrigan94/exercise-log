function toNumber(value) {
  if (value === null || value === undefined || value === "") return null;

  const cleaned = String(value)
    .replace(/[^\d.-]/g, "")
    .trim();

  if (!cleaned) return null;

  const number = Number(cleaned);
  return Number.isFinite(number) ? number : null;
}

function getLogLoad(log) {
  return toNumber(log?.data?.load);
}

function getLogResult(log) {
  return toNumber(log?.data?.result || log?.data?.reps);
}

function getLogRpe(log) {
  return toNumber(log?.rpe);
}

export function getExerciseLogs(sessions = [], exerciseId) {
  return sessions
    .flatMap(session =>
      (session.exercises || []).map(log => ({
        ...log,
        sessionId: session.id,
        sessionName: session.name,
        sessionDate: session.startedAt
      }))
    )
    .filter(log => log.exerciseId === exerciseId)
    .sort((a, b) => new Date(a.loggedAt || a.sessionDate) - new Date(b.loggedAt || b.sessionDate));
}

export function getBestLoad(logs = []) {
  return logs.reduce((best, log) => {
    const load = getLogLoad(log);

    if (load === null) return best;
    if (!best || load > best.load) {
      return {
        load,
        log
      };
    }

    return best;
  }, null);
}

export function getBestResult(logs = []) {
  return logs.reduce((best, log) => {
    const result = getLogResult(log);

    if (result === null) return best;
    if (!best || result > best.result) {
      return {
        result,
        log
      };
    }

    return best;
  }, null);
}

export function getRecentTrend(logs = [], limit = 6) {
  const recent = logs.slice(-limit);

  if (recent.length < 2) {
    return {
      status: "insufficient_data",
      message: "More exposures needed to identify a trend.",
      recent
    };
  }

  const first = recent[0];
  const last = recent[recent.length - 1];

  const firstLoad = getLogLoad(first);
  const lastLoad = getLogLoad(last);

  const firstResult = getLogResult(first);
  const lastResult = getLogResult(last);

  const firstRpe = getLogRpe(first);
  const lastRpe = getLogRpe(last);

  const loadDelta =
    firstLoad !== null && lastLoad !== null
      ? lastLoad - firstLoad
      : null;

  const resultDelta =
    firstResult !== null && lastResult !== null
      ? lastResult - firstResult
      : null;

  const rpeDelta =
    firstRpe !== null && lastRpe !== null
      ? lastRpe - firstRpe
      : null;

  let status = "stable";

  if ((loadDelta !== null && loadDelta > 0) || (resultDelta !== null && resultDelta > 0)) {
    status = "progressing";
  }

  if ((loadDelta !== null && loadDelta < 0) || (resultDelta !== null && resultDelta < 0)) {
    status = "regressing";
  }

  return {
    status,
    loadDelta,
    resultDelta,
    rpeDelta,
    recent
  };
}

export function analyseExerciseProgression(sessions = [], exerciseId) {
  const logs = getExerciseLogs(sessions, exerciseId);

  return {
    exerciseId,
    exposures: logs.length,
    bestLoad: getBestLoad(logs),
    bestResult: getBestResult(logs),
    trend: getRecentTrend(logs),
    logs
  };
}
