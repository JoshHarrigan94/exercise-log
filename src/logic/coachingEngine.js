import {
  classifySession
} from "./domainClassifier.js";

import {
  classifySessionExpressions,
  getPrimaryExpression,
  getTopExpressions
} from "./expressionClassifier.js";

export function generateCoachingReport(session) {
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

  return {
    dominantDomain,
    primaryExpression,
    domains,
    expressions,
    observations,
    recommendations
  };
}

function emptyReport() {
  return {
    dominantDomain: null,
    primaryExpression: null,
    domains: {},
    expressions: {},
    observations: [],
    recommendations: []
  };
}

function getHighest(scores = {}) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || null;
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
        "Track total reps and external load progression closely."
      );
      break;

    case "strength":
      observations.push(
        "Current training is dominated by external resistance strength work."
      );

      recommendations.push(
        "Monitor fatigue accumulation and recovery capacity."
      );
      break;

    case "plyometric":
      observations.push(
        "Current training places a large demand on elastic and reactive qualities."
      );

      recommendations.push(
        "Track tendon soreness and landing quality."
      );
      break;

    case "running":
      observations.push(
        "Current training emphasises locomotion and endurance."
      );

      recommendations.push(
        "Monitor weekly volume progression carefully."
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

      recommendations.push(
        "Track bodyweight alongside performance trends."
      );
    }

    if (expression === "hypertrophy") {
      observations.push(
        `${score}% of training targets hypertrophy.`
      );

      recommendations.push(
        "Monitor weekly volume and recovery capacity."
      );
    }

    if (expression === "reactive-strength") {
      observations.push(
        `${score}% of training targets reactive strength.`
      );

      recommendations.push(
        "Monitor landing quality and tendon readiness."
      );
    }

    if (expression === "aerobic-capacity") {
      observations.push(
        `${score}% of training targets aerobic development.`
      );

      recommendations.push(
        "Monitor pace, heart rate and weekly duration."
      );
    }

    if (expression === "max-strength") {
      observations.push(
        `${score}% of training targets maximal strength.`
      );

      recommendations.push(
        "Track estimated 1RM trends over time."
      );
    }
  });
}
