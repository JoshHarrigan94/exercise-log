export const movementSchema = {
  id: "string",

  name: "string",

  family: "string",

  description: "string",

  movementType: [
    "strength",
    "calisthenics",
    "plyometric",
    "running",
    "conditioning",
    "mobility",
    "rehab",
    "skill"
  ],

  primaryExpressions: [
    "expression-id"
  ],

  secondaryExpressions: [
    "expression-id"
  ],

  measurableOutputs: [
    "output-id"
  ],

  equipment: [
    "equipment-id"
  ],

  progressionPaths: [
    "movement-id"
  ],

  regressionPaths: [
    "movement-id"
  ],

  riskFactors: [
    "joint-stress",
    "spinal-loading",
    "balance-demand",
    "landing-demand",
    "tendon-demand",
    "technical-complexity"
  ],

  coachingTags: [
    "bilateral",
    "unilateral",
    "single-leg",
    "double-leg",
    "explosive",
    "eccentric",
    "isometric",
    "reactive",
    "cyclical",
    "acyclical",
    "bodyweight",
    "external-load"
  ]
};