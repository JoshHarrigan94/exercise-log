import { calculateSessionCompliance } from "./metrics/compliance.js";
import {
  getSessionDeviations,
  getDeviationSummary
} from "./rules/deviationRules.js";
import { composeSessionFeedback } from "./feedback/feedbackComposer.js";

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

export function analyseSessions(sessions = []) {
  return sessions.map(analyseSession);
}
