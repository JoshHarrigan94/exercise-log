import { getExerciseById } from "./exerciseLibrary.js";

export function classifyExpressions(exercises = []) {
  const scores = {};

  exercises.forEach(item => {
    const exercise = getExerciseById(item.exerciseId);

    if (!exercise) return;

    const base =
      exercise.base ||
      exercise;

    (base.primaryExpressions || []).forEach(expression => {
      scores[expression] =
        (scores[expression] || 0) + 3;
    });

    (base.secondaryExpressions || []).forEach(expression => {
      scores[expression] =
        (scores[expression] || 0) + 1;
    });
  });

  return normalise(scores);
}

function normalise(scores) {
  const total =
    Object.values(scores)
      .reduce((sum, value) => sum + value, 0);

  if (total === 0) return scores;

  const result = {};

  Object.entries(scores).forEach(([key, value]) => {
    result[key] =
      Math.round((value / total) * 100);
  });

  return result;
}

export function getPrimaryExpression(scores) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || null;
}

export function getTopExpressions(scores, limit = 5) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}