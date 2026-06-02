import {
  classifySession
} from "./domainClassifiersjs";

import {
  classifySessionExpressions,
  getPrimaryExpression,
  getTopExpressions
} from "./expressionClassifiers.js";

import {
  analyseExpressionGaps
} from "./expressionGapAnalysis.js";

import {
  getTriggeredCoachingRules
} from "./coachingRules.js";

export function generateCoachingReport(
  session,
  athleteProfile = {}
) {
  if (!session) {
    return emptyReport();
  }

  const domains =
    classifySession(session);

  const expressions =
    classifySessionExpressions(session);

  const dominantDomain =
    getHighest(domains);

  const primaryExpression =
    getPrimaryExpression(expressions);

  const observations = [];
  const recommendations = [];

  buildDomainObservations(
    dominantDomain,
    observations,
    recommendations
  );

  buildExpressionObservations(
    expressions,
    observations,
    recommendations
  );

  const gapAnalysis =
    analyseExpressionGaps(expressions);

  gapAnalysis.recommendations.forEach(item => {
    recommendations.push(item);
  });

  const triggeredRules =
    getTriggeredCoachingRules(expressions);

  triggeredRules.forEach(rule => {
    recommendations.push(rule.recommendation);
  });

  return {
    dominantDomain,
    primaryExpression,

    domains,
    expressions,

    observations,

    recommendations: dedupe(
      recommendations
    ),

    requiredMetrics:
      gapAnalysis.requiredMetrics,

    triggeredRules:
      triggeredRules.map(rule => rule.id)
  };
}

function emptyReport() {
  return {
    dominantDomain: null,
    primaryExpression: null,

    domains: {},
    expressions: {},

    observations: [],
    recommendations: [],

    requiredMetrics: [],
    triggeredRules: []
  };
}

function getHighest(scores = {}) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || null;
}

function dedupe(items = []) {
  return [...new Set(items)];
}

function buildDomainObservations(
  dominantDomain,
  observations,
  recommendations
) {
  switch (dominantDomain) {

    case "calisthenics":
      observations.push(
        "Current training is dominated by bodyweight strength work."
      );

      recommendations.push(
        "Track total reps and external load progression."
      );
      break;

    case "strength":
      observations.push(
        "Current training is dominated by external resistance strength work."
      );

      recommendations.push(
        "Monitor fatigue accumulation and recovery."
      );
      break;

    case "plyometric":
      observations.push(
        "Current training places large demands on elastic and reactive qualities."
      );

      recommendations.push(
        "Monitor landing quality and tendon response."
      );
      break;

    case "running":
      observations.push(
        "Current training emphasises locomotion and endurance."
      );

      recommendations.push(
        "Monitor weekly running volume progression."
      );
      break;
  }
}

function buildExpressionObservations(
  expressions,
  observations,
  recommendations
) {
  const topExpressions =
    getTopExpressions(expressions, 3);

  topExpressions.forEach(([expression, score]) => {

    if (expression === "relative-strength") {
      observations.push(
        `${score}% of training targets relative strength.`
      );
    }

    if (expression === "hypertrophy") {
      observations.push(
        `${score}% of training targets hypertrophy.`
      );
    }

    if (expression === "max-strength") {
      observations.push(
        `${score}% of training targets maximal strength.`
      );
    }

    if (expression === "reactive-strength") {
      observations.push(
        `${score}% of training targets reactive strength.`
      );
    }

    if (expression === "aerobic-capacity") {
      observations.push(
        `${score}% of training targets aerobic capacity.`
      );
    }
  });
}
