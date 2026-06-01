import { calculateSessionCompliance } from "./metrics/compliance.js";
import {
  getSessionDeviations,
  getDeviationSummary
} from "./rules/deviationRules.js";
import { composeSessionFeedback } from "./feedback/feedbackComposer.js";
import {
  analyseExerciseProgression,
  getExerciseLogs,
  getBestLoad,
  getBestResult,
  getRecentTrend
} from "./metrics/progression.js";

import {
  analyseBlockDomain,
  analyseBlocksDomain,
  classifyExerciseDomain,
  classifyWorkoutDomain,
  classifyBlockDomain,
  classifyBlocks,
  matchProgrammeArchetypes,
  getBestProgrammeMatch,
  getProgrammeArchetypes
} from "./domains/index.js";

import {
  getProgrammeDNA,
  getAllProgrammeDNA,
  getProgrammeProgressionModel,
  getRuleSetForProgramme,
  getRuleSetForProgrammeMatch,
  getAllProgressionRuleModels,
  makeCoachingDecision
} from "./programming/index.js";

export function analyseSession(session = {}) {
  const compliance = calculateSessionCompliance(session);
  const deviations = getSessionDeviations(compliance);
  const summary = getDeviationSummary(deviations);
  const feedback = composeSessionFeedback({
    compliance,
    deviations,
    summary
  });

  return {
    sessionId: session.id,
    sessionName: session.name,
    compliance,
    deviations,
    summary,
    feedback
  };
}

export function analyseSessionWithProgramme(session = {}, programmeMatch = null) {
  const sessionAnalysis = analyseSession(session);
  const coachingDecision = makeCoachingDecision({
    sessionAnalysis,
    programmeMatch
  });

  return {
    ...sessionAnalysis,
    coachingDecision
  };
}

export function analyseSessions(sessions = []) {
  return sessions.map(analyseSession);
}

export {
  analyseExerciseProgression,
  getExerciseLogs,
  getBestLoad,
  getBestResult,
  getRecentTrend,

  analyseBlockDomain,
  analyseBlocksDomain,
  classifyExerciseDomain,
  classifyWorkoutDomain,
  classifyBlockDomain,
  classifyBlocks,
  matchProgrammeArchetypes,
  getBestProgrammeMatch,
  getProgrammeArchetypes,

  getProgrammeDNA,
  getAllProgrammeDNA,
  getProgrammeProgressionModel,
  getRuleSetForProgramme,
  getRuleSetForProgrammeMatch,
  getAllProgressionRuleModels,
  makeCoachingDecision
};