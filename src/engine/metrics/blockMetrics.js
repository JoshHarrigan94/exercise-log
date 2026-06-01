import { analyseSessionWithProgramme, analyseBlockDomain } from "../index.js";

function getBlockSessions(block = {}, sessions = []) {
  return sessions.filter(session => session.templateId === block.id);
}

function getBlockPlannedWorkoutCount(block = {}) {
  return (block.weeks || []).reduce((total, week) => {
    return total + (week.workouts || []).length;
  }, 0);
}

function getBlockPlannedMovementCount(block = {}) {
  return (block.weeks || []).reduce((total, week) => {
    return total + (week.workouts || []).reduce((weekTotal, workout) => {
      return weekTotal + (workout.exercises || []).length;
    }, 0);
  }, 0);
}

function getAverage(values = []) {
  if (values.length === 0) return 0;

  const total = values.reduce((sum, value) => sum + value, 0);
  return Math.round(total / values.length);
}

function getLatestSessionAnalysis(block, sessions) {
  const blockSessions = getBlockSessions(block, sessions);
  const latest = blockSessions[0];

  if (!latest) return null;

  const blockDomain = analyseBlockDomain(block);

  return analyseSessionWithProgramme(
    latest,
    blockDomain.bestProgrammeMatch
  );
}

export function analyseBlockMetrics(block = {}, sessions = []) {
  const blockSessions = getBlockSessions(block, sessions);
  const blockDomain = analyseBlockDomain(block);

  const sessionAnalyses = blockSessions.map(session =>
    analyseSessionWithProgramme(
      session,
      blockDomain.bestProgrammeMatch
    )
  );

  const completionRates = sessionAnalyses.map(
    analysis => analysis.compliance.completionRate
  );

  const warningCount = sessionAnalyses.reduce(
    (total, analysis) =>
      total + analysis.deviations.filter(item => item.severity === "warning").length,
    0
  );

  const positiveCount = sessionAnalyses.reduce(
    (total, analysis) =>
      total + analysis.deviations.filter(item => item.severity === "positive").length,
    0
  );

  const latestAnalysis = getLatestSessionAnalysis(block, sessions);

  return {
    blockId: block.id,
    blockName: block.name,
    plannedWorkouts: getBlockPlannedWorkoutCount(block),
    plannedMovements: getBlockPlannedMovementCount(block),
    completedSessions: blockSessions.length,
    averageCompletion: getAverage(completionRates),
    warningCount,
    positiveCount,
    latestDecision: latestAnalysis?.coachingDecision || null,
    latestAnalysis,
    domain: blockDomain
  };
}

export function analyseBlocksMetrics(blocks = [], sessions = []) {
  return blocks.map(block =>
    analyseBlockMetrics(block, sessions)
  );
}