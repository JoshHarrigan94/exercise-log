import { expressionTargets } from "./expressionTargets.js";

export function analyseExpressionGaps(expressionScores = {}) {

  const expressions = Object.entries(expressionScores)
    .filter(([, value]) => value > 0)
    .sort((a, b) => b[1] - a[1]);

  const requiredMetrics = new Set();
  const recommendations = [];

  expressions.forEach(([expression]) => {

    const target =
      expressionTargets[expression];

    if (!target) return;

    target.metrics.forEach(metric => {
      requiredMetrics.add(metric);
    });

    target.recommendations.forEach(item => {
      recommendations.push(item);
    });
  });

  return {
    requiredMetrics: [...requiredMetrics],
    recommendations
  };
}
