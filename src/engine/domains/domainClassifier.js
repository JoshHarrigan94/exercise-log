const DOMAIN_KEYS = [
  "strength",
  "hypertrophy",
  "calisthenics",
  "plyometrics",
  "conditioning",
  "mobility",
  "power",
  "endurance",
  "rehab"
];

const METHOD_DOMAIN_WEIGHTS = {
  "standard-sets": { hypertrophy: 2, strength: 1 },
  "top-set": { strength: 3, power: 1 },
  "top-set-backoff": { strength: 2, hypertrophy: 2 },
  "ladder": { calisthenics: 3, strength: 1, endurance: 1 },
  "top-set-ladder": { calisthenics: 2, strength: 2 },
  "cluster": { strength: 2, power: 2 },
  "rest-pause": { hypertrophy: 3, strength: 1 },
  "isometric": { strength: 1, calisthenics: 1, rehab: 1 },
  "intervals": { conditioning: 3, endurance: 2 },
  "emom": { conditioning: 2, endurance: 2, power: 1 },
  "amrap": { conditioning: 2, endurance: 2, hypertrophy: 1 },
  "tempo": { hypertrophy: 2, strength: 1 },
  "plyometric": { plyometrics: 4, power: 2 },
  "mobility": { mobility: 4, rehab: 1 }
};

const TEXT_DOMAIN_KEYWORDS = {
  strength: [
    "strength",
    "heavy",
    "max",
    "1rm",
    "3rm",
    "5rm",
    "sbd",
    "squat",
    "bench",
    "deadlift",
    "powerlifting",
    "5/3/1",
    "531",
    "madcow",
    "starting strength",
    "texas method"
  ],

  hypertrophy: [
    "hypertrophy",
    "bodybuilding",
    "pump",
    "volume",
    "muscle",
    "upper",
    "lower",
    "push",
    "pull",
    "legs",
    "ppl",
    "bro split"
  ],

  calisthenics: [
    "calisthenics",
    "pull-up",
    "pull up",
    "chin-up",
    "chin up",
    "dip",
    "push-up",
    "push up",
    "muscle-up",
    "muscle up",
    "lever",
    "planche",
    "thenx",
    "bodyweight"
  ],

  plyometrics: [
    "plyometric",
    "plyo",
    "jump",
    "bounds",
    "pogos",
    "hops",
    "sprint",
    "reactive",
    "contacts",
    "rsi"
  ],

  conditioning: [
    "conditioning",
    "metcon",
    "crossfit",
    "wod",
    "emom",
    "amrap",
    "interval",
    "circuit",
    "engine",
    "work capacity"
  ],

  mobility: [
    "mobility",
    "flexibility",
    "rom",
    "range",
    "stretch",
    "controlled articular",
    "cars"
  ],

  power: [
    "power",
    "explosive",
    "velocity",
    "speed",
    "triphasic",
    "dynamic effort",
    "contrast"
  ],

  endurance: [
    "endurance",
    "aerobic",
    "zone 2",
    "threshold",
    "tempo run",
    "capacity"
  ],

  rehab: [
    "rehab",
    "prehab",
    "pain",
    "return to run",
    "tendon",
    "achilles",
    "calf",
    "isometric",
    "eccentric"
  ]
};

function createScoreMap() {
  return DOMAIN_KEYS.reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {});
}

function addWeightedScores(scores, weights = {}, multiplier = 1) {
  Object.entries(weights).forEach(([domain, value]) => {
    if (scores[domain] === undefined) return;
    scores[domain] += value * multiplier;
  });
}

function addKeywordScores(scores, text = "", multiplier = 1) {
  const lower = String(text || "").toLowerCase();

  Object.entries(TEXT_DOMAIN_KEYWORDS).forEach(([domain, keywords]) => {
    keywords.forEach(keyword => {
      if (lower.includes(keyword)) {
        scores[domain] += 1 * multiplier;
      }
    });
  });
}

function getExerciseVolumeMultiplier(exercise = {}) {
  const setCount = exercise.sets?.length || 1;
  return Math.max(1, Math.min(setCount, 6));
}

function normaliseScores(scores) {
  const total = Object.values(scores).reduce((sum, value) => sum + value, 0);

  if (total === 0) {
    return DOMAIN_KEYS.reduce((acc, key) => {
      acc[key] = 0;
      return acc;
    }, {});
  }

  return DOMAIN_KEYS.reduce((acc, key) => {
    acc[key] = Math.round((scores[key] / total) * 100);
    return acc;
  }, {});
}

function getPrimaryDomain(percentages = {}) {
  return Object.entries(percentages).sort((a, b) => b[1] - a[1])[0]?.[0] || "unknown";
}

function getDominantDomains(percentages = {}, threshold = 15) {
  return Object.entries(percentages)
    .filter(([, value]) => value >= threshold)
    .sort((a, b) => b[1] - a[1])
    .map(([domain, percentage]) => ({
      domain,
      percentage
    }));
}

export function classifyExerciseDomain(exercise = {}) {
  const scores = createScoreMap();

  addWeightedScores(
    scores,
    METHOD_DOMAIN_WEIGHTS[exercise.methodId] || {},
    getExerciseVolumeMultiplier(exercise)
  );

  addKeywordScores(scores, exercise.target, 1);
  addKeywordScores(scores, exercise.notes, 1);

  const percentages = normaliseScores(scores);

  return {
    exerciseId: exercise.exerciseId,
    methodId: exercise.methodId,
    scores,
    percentages,
    primaryDomain: getPrimaryDomain(percentages),
    dominantDomains: getDominantDomains(percentages)
  };
}

export function classifyWorkoutDomain(workout = {}) {
  const scores = createScoreMap();

  (workout.exercises || []).forEach(exercise => {
    const exerciseClassification = classifyExerciseDomain(exercise);

    Object.entries(exerciseClassification.scores).forEach(([domain, value]) => {
      scores[domain] += value;
    });
  });

  addKeywordScores(scores, workout.name, 2);
  addKeywordScores(scores, workout.goal, 2);

  const percentages = normaliseScores(scores);

  return {
    workoutId: workout.id,
    workoutName: workout.name,
    scores,
    percentages,
    primaryDomain: getPrimaryDomain(percentages),
    dominantDomains: getDominantDomains(percentages)
  };
}

export function classifyBlockDomain(block = {}) {
  const scores = createScoreMap();

  (block.weeks || []).forEach(week => {
    (week.workouts || []).forEach(workout => {
      const workoutClassification = classifyWorkoutDomain(workout);

      Object.entries(workoutClassification.scores).forEach(([domain, value]) => {
        scores[domain] += value;
      });
    });
  });

  addKeywordScores(scores, block.name, 3);
  addKeywordScores(scores, block.goal, 3);
  addKeywordScores(scores, block.priority, 2);

  const percentages = normaliseScores(scores);

  return {
    blockId: block.id,
    blockName: block.name,
    scores,
    percentages,
    primaryDomain: getPrimaryDomain(percentages),
    dominantDomains: getDominantDomains(percentages)
  };
}

export function classifyBlocks(blocks = []) {
  return blocks.map(classifyBlockDomain);
}