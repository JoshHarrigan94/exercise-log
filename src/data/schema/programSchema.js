export const programSchema = {
  id: "string",

  name: "string",

  description: "string",

  category: [
    "strength",
    "hypertrophy",
    "power",
    "speed",
    "conditioning",
    "endurance",
    "skill",
    "rehab"
  ],

  prescriptionType: [
    "straight-sets",
    "top-set",
    "top-set-backoff",
    "ladder",
    "cluster",
    "rest-pause",
    "wave-loading",
    "density",
    "emom",
    "amrap",
    "interval",
    "tempo",
    "isometric"
  ],

  primaryExpressions: [
    "expression-id"
  ],

  secondaryExpressions: [
    "expression-id"
  ],

  measurableTargets: [
    "load",
    "reps",
    "duration",
    "distance",
    "contacts",
    "velocity",
    "heart-rate",
    "pace",
    "rpe"
  ],

  progressionStrategy: [
    "linear",
    "double-progression",
    "wave-loading",
    "percentage-based",
    "volume-based",
    "density-based",
    "velocity-based",
    "readiness-based",
    "auto-regulated"
  ],

  fatigueCost: {
    systemic: "0-10",
    local: "0-10",
    connectiveTissue: "0-10",
    neurological: "0-10"
  },

  coachingRules: [
    {
      condition: "string",
      action: "string"
    }
  ],

  athleteSuitability: [
    "strength",
    "hypertrophy",
    "calisthenics",
    "running",
    "hybrid",
    "field-sport",
    "combat",
    "general-fitness",
    "rehab"
  ]
};