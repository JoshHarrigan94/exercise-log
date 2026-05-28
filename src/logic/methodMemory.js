import { getAllLogs } from "./analytics.js";

export function getLastLogForExercise(sessions = [], activeSession = null, exerciseId) {
  const savedLogs = getAllLogs(sessions);
  const activeLogs = activeSession?.exercises || [];

  const allLogs = [
    ...activeLogs.map(log => ({
      ...log,
      sessionDate: activeSession?.startedAt || log.loggedAt
    })),
    ...savedLogs
  ];

  return allLogs.find(log => log.exerciseId === exerciseId) || null;
}

export function getLastLogForExerciseAndMethod(
  sessions = [],
  activeSession = null,
  exerciseId,
  methodId
) {
  const savedLogs = getAllLogs(sessions);
  const activeLogs = activeSession?.exercises || [];

  const allLogs = [
    ...activeLogs.map(log => ({
      ...log,
      sessionDate: activeSession?.startedAt || log.loggedAt
    })),
    ...savedLogs
  ];

  return allLogs.find(
    log => log.exerciseId === exerciseId && log.methodId === methodId
  ) || null;
}

export function getExerciseMemorySummary(log) {
  if (!log) {
    return {
      label: "No previous exposure",
      detail: "Log this once and it will become repeatable."
    };
  }

  return {
    label: "Previous exposure found",
    detail: "Load the previous structure to reduce typing."
  };
}
