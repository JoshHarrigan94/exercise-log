export function getAllLogs(sessions = []) {
  return sessions.flatMap(session =>
    session.exercises.map(log => ({
      ...log,
      sessionName: session.name,
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
  const logs = getAllLogs(sessions);

  return logs.reduce((acc, log) => {
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
  const logs = getAllLogs(sessions);

  return logs.reduce((acc, log) => {
    acc[log.exerciseId] = (acc[log.exerciseId] || 0) + 1;
    return acc;
  }, {});
}

export function getRecentLogs(sessions = [], limit = 5) {
  return getAllLogs(sessions)
    .sort((a, b) => new Date(b.loggedAt) - new Date(a.loggedAt))
    .slice(0, limit);
}
