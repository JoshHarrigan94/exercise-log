import { getExerciseById } from "./exerciseLibrary.js";

function unique(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function increment(map, key) {
  if (!key) return;
  map[key] = (map[key] || 0) + 1;
}

export function analyseAtlasExposure(session) {
  const familyCounts = {};
  const expressionCounts = {};
  const outputCounts = {};
  const sourceCounts = {};

  const entries = session?.logs || session?.exercises || [];

  entries.forEach(entry => {
    const exerciseId =
      entry.exerciseId ||
      entry.id ||
      entry.movementId;

    const exercise = getExerciseById(exerciseId);

    if (!exercise) return;

    increment(sourceCounts, exercise.source || "unknown");

    const family =
      exercise.family?.name ||
      exercise.familyName ||
      exercise.pattern ||
      exercise.category;

    increment(familyCounts, family);

    const expressions = unique([
      ...(exercise.base?.primaryExpressions || []),
      ...(exercise.base?.secondaryExpressions || []),
      ...(exercise.expressions || []).map(expression =>
        expression.name || expression.id || expression
      ),
      exercise.primaryExpression
    ]);

    expressions.forEach(expression =>
      increment(expressionCounts, expression)
    );

    const outputs = unique([
      ...(exercise.base?.measurableOutputs || []),
      ...(exercise.measurableOutputs || [])
    ]);

    outputs.forEach(output =>
      increment(outputCounts, output)
    );
  });

  const topFamily = Object.entries(familyCounts)
    .sort((a, b) => b[1] - a[1])[0];

  const topExpression = Object.entries(expressionCounts)
    .sort((a, b) => b[1] - a[1])[0];

  const missingMajorFamilies = [
    "vertical-pull",
    "horizontal-push",
    "squat",
    "hinge",
    "carry",
    "jump"
  ].filter(family =>
    !Object.keys(familyCounts)
      .join(" ")
      .toLowerCase()
      .includes(family)
  );

  return {
    familyCounts,
    expressionCounts,
    outputCounts,
    sourceCounts,

    dominantFamily: topFamily
      ? { name: topFamily[0], count: topFamily[1] }
      : null,

    dominantExpression: topExpression
      ? { name: topExpression[0], count: topExpression[1] }
      : null,

    missingMajorFamilies
  };
}

export function generateAtlasCoachingObservations(session) {
  const analysis = analyseAtlasExposure(session);
  const observations = [];

  if (analysis.dominantFamily) {
    observations.push(
      `Dominant movement family: ${analysis.dominantFamily.name}.`
    );
  }

  if (analysis.dominantExpression) {
    observations.push(
      `Dominant expression bias: ${analysis.dominantExpression.name}.`
    );
  }

  if (analysis.missingMajorFamilies.length) {
    observations.push(
      `Potential exposure gaps: ${analysis.missingMajorFamilies.join(", ")}.`
    );
  }

  return {
    analysis,
    observations
  };
}