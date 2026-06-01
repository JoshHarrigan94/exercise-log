export const expressionSchema = {
  id: "string",
  name: "string",
  description: "string",

  category: [
    "force",
    "muscle",
    "power",
    "elastic",
    "energy-system",
    "skill",
    "mobility",
    "tissue",
    "control"
  ],

  measurableSignals: [
    "load",
    "reps",
    "velocity",
    "duration",
    "distance",
    "contacts",
    "tempo",
    "range",
    "heart-rate",
    "pace",
    "rpe"
  ],

  progressionBias: [
    "increase-load",
    "increase-reps",
    "increase-volume",
    "increase-density",
    "increase-complexity",
    "increase-speed",
    "increase-range",
    "increase-tolerance",
    "improve-quality"
  ]
};