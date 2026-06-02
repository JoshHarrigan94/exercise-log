export const coachingRules = [
  {
    id: "relative-strength-bodyweight",
    type: "metric-gap",
    expression: "relative-strength",
    condition: {
      expressionAtLeast: 20
    },
    recommendation:
      "Because relative strength is a major target, track bodyweight alongside reps and external load."
  },

  {
    id: "max-strength-top-set",
    type: "metric-gap",
    expression: "max-strength",
    condition: {
      expressionAtLeast: 20
    },
    recommendation:
      "Because max strength is a major target, track top sets, load, reps and RPE consistently."
  },

  {
    id: "hypertrophy-volume",
    type: "metric-gap",
    expression: "hypertrophy",
    condition: {
      expressionAtLeast: 20
    },
    recommendation:
      "Because hypertrophy is a major target, track weekly sets, reps and proximity to failure."
  },

  {
    id: "reactive-strength-quality",
    type: "metric-gap",
    expression: "reactive-strength",
    condition: {
      expressionAtLeast: 15
    },
    recommendation:
      "Reactive strength work should track jump quality, contact quality and tendon response."
  },

  {
    id: "tendon-capacity-pain-response",
    type: "risk-management",
    expression: "tendon-capacity",
    condition: {
      expressionAtLeast: 10
    },
    recommendation:
      "Tendon capacity work should progress slowly and track next-day response."
  },

  {
    id: "aerobic-capacity-duration",
    type: "metric-gap",
    expression: "aerobic-capacity",
    condition: {
      expressionAtLeast: 20
    },
    recommendation:
      "Aerobic capacity work should track duration, distance, pace and heart rate where possible."
  },

  {
    id: "power-fatigue",
    type: "fatigue-management",
    expression: "power",
    condition: {
      expressionAtLeast: 20
    },
    recommendation:
      "Power work should stay high quality. Avoid progressing volume if output drops."
  }
];

export function getTriggeredCoachingRules(expressionScores = {}) {
  return coachingRules.filter(rule => {
    const score = expressionScores[rule.expression] || 0;
    return score >= rule.condition.expressionAtLeast;
  });
}
