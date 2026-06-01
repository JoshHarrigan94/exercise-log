export const modifierSchema = {
  id: "string",

  name: "string",

  description: "string",

  category: [
    "loading",
    "tempo",
    "range-of-motion",
    "assistance",
    "stance",
    "position",
    "reactive",
    "stability",
    "equipment",
    "execution"
  ],

  effects: {
    expressionAdjustments: {
      "expression-id": "number"
    },

    outputAdjustments: [
      "output-id"
    ]
  },

  coachingTags: [
    "beginner-friendly",
    "advanced",
    "rehab-friendly",
    "high-skill",
    "high-fatigue",
    "joint-friendly"
  ],

  progressionRank: "number",

  regressionRank: "number"
};
