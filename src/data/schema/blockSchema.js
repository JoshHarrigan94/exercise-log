export const blockSchema = {
  id: "string",

  name: "string",

  description: "string",

  durationWeeks: "number",

  sourceType: [
    "custom",
    "system-template",
    "programme-system",
    "coach-built",
    "generated"
  ],

  programmeFamily: [
    "strength",
    "hypertrophy",
    "calisthenics",
    "power",
    "speed",
    "conditioning",
    "endurance",
    "hybrid",
    "rehab",
    "general-fitness"
  ],

  programmeArchetype: [
    "five-three-one",
    "madcow",
    "starting-strength",
    "sbd-powerlifting",
    "triphasic",
    "bodybuilding",
    "calisthenics-skill",
    "calisthenics-strength",
    "crossfit",
    "tactical",
    "plyometric-speed",
    "return-to-run",
    "custom"
  ],

  primaryExpressions: [
    "expression-id"
  ],

  secondaryExpressions: [
    "expression-id"
  ],

  athleteSuitability: [
    "beginner",
    "intermediate",
    "advanced",
    "strength-athlete",
    "hypertrophy-athlete",
    "calisthenics-athlete",
    "runner",
    "field-sport-athlete",
    "combat-athlete",
    "hybrid-athlete",
    "rehab-athlete",
    "general-population"
  ],

  constraints: [
    "time-limited",
    "equipment-limited",
    "bodyweight-only",
    "gym-based",
    "home-based",
    "low-impact",
    "high-impact",
    "high-skill",
    "low-skill",
    "joint-friendly",
    "return-from-injury"
  ],

  weeks: [
    {
      id: "string",
      name: "string",
      intent: "string",

      workouts: [
        {
          id: "string",
          name: "string",
          intent: "string",

          exercises: [
            {
              movementVariantId: "variant-id",
              methodId: "program-method-id",

              prescription: {
                sets: "number",
                reps: "string",
                load: "string",
                rest: "string",
                rpe: "string",
                tempo: "string",
                contacts: "string",
                duration: "string",
                distance: "string"
              },

              coachingNotes: [
                "string"
              ]
            }
          ]
        }
      ]
    }
  ],

  progressionRules: [
    {
      condition: "string",
      action: "string"
    }
  ],

  deloadRules: [
    {
      condition: "string",
      action: "string"
    }
  ],

  successCriteria: [
    "string"
  ],

  riskFlags: [
    "string"
  ]
};