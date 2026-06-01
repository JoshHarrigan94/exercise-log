export function getAllLogs(sessions = []) {
  return sessions.flatMap(session =>
    (session.exercises || []).map(log => ({
      ...log,
      sessionId: session.id,
      sessionName: session.name,
      sessionGoal: session.goal || "",
      sessionDate: session.startedAt
    }))
  );
}

export function getTotalSessions(sessions = []) {
  return sessions.length;
}

export function getTotalLogs(sessions = []) {
  return getAllLogs(sessions).length;
}

export function getMethodBreakdown(sessions = []) {
  return getAllLogs(sessions).reduce((acc, log) => {
    acc[log.methodId] = (acc[log.methodId] || 0) + 1;
    return acc;
  }, {});
}

export function getPainFlags(sessions = []) {
  return getAllLogs(sessions).filter(log => Number(log.pain || 0) >= 3);
}

export function getHighEffortLogs(sessions = []) {
  return getAllLogs(sessions).filter(log => Number(log.rpe || 0) >= 9);
}

export function getExerciseFrequency(sessions = []) {
  return getAllLogs(sessions).reduce((acc, log) => {
    acc[log.exerciseId] = (acc[log.exerciseId] || 0) + 1;
    return acc;
  }, {});
}

export function getRecentLogs(sessions = [], limit = 6) {
  return getAllLogs(sessions)
    .sort((a, b) => new Date(b.loggedAt || b.sessionDate) - new Date(a.loggedAt || a.sessionDate))
    .slice(0, limit);
}

export function getRecentSessions(sessions = [], limit = 6) {
  return [...sessions]
    .sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt))
    .slice(0, limit);
}

export function getSessionsThisMonth(sessions = []) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  return sessions.filter(session => {
    const date = new Date(session.startedAt);
    return date.getFullYear() === year && date.getMonth() === month;
  });
}

export function getTrainingDaysThisMonth(sessions = []) {
  const uniqueDays = new Set(
    getSessionsThisMonth(sessions).map(session =>
      session.startedAt.slice(0, 10)
    )
  );

  return uniqueDays.size;
}

export function getAverageLogsPerSession(sessions = []) {
  if (sessions.length === 0) return 0;

  return Math.round((getTotalLogs(sessions) / sessions.length) * 10) / 10;
}

export function getTopEntries(map = {}, limit = 5) {
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}

export function getConsistencySummary(sessions = []) {
  const trainingDays = getTrainingDaysThisMonth(sessions);

  if (trainingDays >= 16) {
    return "High consistency";
  }

  if (trainingDays >= 8) {
    return "Building rhythm";
  }

  if (trainingDays >= 1) {
    return "Early month";
  }

  return "No sessions this month";
}