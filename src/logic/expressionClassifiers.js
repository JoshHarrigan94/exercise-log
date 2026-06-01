import { getExerciseById } from "./exerciseLibrary.js";

function normaliseScores(scores) {
  const total = Object.values(scores)
    .reduce((sum, value) => sum + value, 0);

  if (total === 0) {
    return scores;
  }

  const result = {};

  Object.entries(scores).forEach(([expression, value]) => {
    result[expression] =
      Math.round((value / total) * 100);
  });

  return result;
}

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

  return normaliseScores(scores);
}

export function classifyBlockExpressions(block) {
  if (!block) return {};

  return classifyExpressions(
    block.exercises || []
  );
}

export function classifySessionExpressions(session) {
  if (!session) return {};

  return classifyExpressions(
    session.plannedExercises ||
    session.exercises ||
    []
  );
}

export function getPrimaryExpression(scores) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || null;
}

export function getSecondaryExpression(scores) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])[1]?.[0] || null;
}

export function getTopExpressions(scores, limit = 5) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}

export function describeExpressionProfile(scores) {
  return Object.entries(scores)
    .filter(([, value]) => value > 0)
    .sort((a, b) => b[1] - a[1]);
}