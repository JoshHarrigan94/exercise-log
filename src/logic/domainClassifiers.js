import { getExerciseById } from "./exerciseLibrary.js";

const DOMAINS = [
  "strength",
  "calisthenics",
  "hypertrophy",
  "plyometric",
  "running",
  "conditioning",
  "rehab",
  "general"
];

function emptyScores() {
  return DOMAINS.reduce((scores, domain) => {
    scores[domain] = 0;
    return scores;
  }, {});
}

export function classifyExercises(exercises = []) {
  const scores = emptyScores();

  exercises.forEach(item => {
    const exercise = getExerciseById(item.exerciseId);

    if (!exercise) return;

    const base =
      exercise.base ||
      exercise;

    const domain = base.domain || "general";

    scores[domain] += 1;
  });

  return normaliseScores(scores);
}

export function classifyBlock(block) {
  if (!block) {
    return emptyScores();
  }

  return classifyExercises(block.exercises || []);
}

export function classifySession(session) {
  if (!session) {
    return emptyScores();
  }

  const exercises =
    session.plannedExercises ||
    session.exercises ||
    [];

  return classifyExercises(exercises);
}

function normaliseScores(scores) {
  const total = Object.values(scores)
    .reduce((sum, value) => sum + value, 0);

  if (total === 0) {
    return scores;
  }

  const result = {};

  Object.entries(scores).forEach(([domain, value]) => {
    result[domain] =
      Math.round((value / total) * 100);
  });

  return result;
}

export function getPrimaryDomain(scores) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || "general";
}

export function getSecondaryDomain(scores) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])[1]?.[0] || null;
}

export function describeDomainMix(scores) {
  return Object.entries(scores)
    .filter(([, value]) => value > 0)
    .sort((a, b) => b[1] - a[1]);
}
