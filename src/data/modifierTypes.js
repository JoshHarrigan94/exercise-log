export const modifierTypes = [
  {
    id: "weighted",
    name: "Weighted",
    description: "Adds external load to the movement.",
    category: "loading",
    effects: {
      expressionAdjustments: {
        "max-strength": 0.12,
        "relative-strength": 0.1,
        hypertrophy: 0.04
      },
      outputAdjustments: ["load"]
    },
    coachingTags: ["advanced", "high-fatigue"],
    progressionRank: 4,
    regressionRank: 1
  },

  {
    id: "assisted",
    name: "Assisted",
    description: "Reduces effective bodyweight or load to make the movement easier.",
    category: "assistance",
    effects: {
      expressionAdjustments: {
        "relative-strength": -0.12,
        "motor-control": 0.06,
        skill: 0.05
      },
      outputAdjustments: ["assistance-level"]
    },
    coachingTags: ["beginner-friendly", "rehab-friendly"],
    progressionRank: 1,
    regressionRank: 4
  },

  {
    id: "tempo",
    name: "Tempo",
    description: "Uses a controlled rep speed or specified phase duration.",
    category: "tempo",
    effects: {
      expressionAdjustments: {
        "motor-control": 0.12,
        hypertrophy: 0.08,
        "tendon-capacity": 0.04
      },
      outputAdjustments: ["tempo"]
    },
    coachingTags: ["joint-friendly", "rehab-friendly"],
    progressionRank: 2,
    regressionRank: 2
  },

  {
    id: "pause",
    name: "Pause",
    description: "Adds a deliberate stop in a specific position.",
    category: "execution",
    effects: {
      expressionAdjustments: {
        "starting-strength": 0.1,
        "motor-control": 0.1,
        "max-strength": 0.04
      },
      outputAdjustments: ["pause-duration"]
    },
    coachingTags: ["advanced", "joint-friendly"],
    progressionRank: 3,
    regressionRank: 2
  },

  {
    id: "isometric",
    name: "Isometric",
    description: "Holds position without visible joint movement.",
    category: "execution",
    effects: {
      expressionAdjustments: {
        "tendon-capacity": 0.12,
        "motor-control": 0.1,
        "max-strength": 0.06
      },
      outputAdjustments: ["duration", "joint-angle"]
    },
    coachingTags: ["rehab-friendly", "joint-friendly"],
    progressionRank: 2,
    regressionRank: 2
  },

  {
    id: "eccentric",
    name: "Eccentric",
    description: "Emphasises the lowering or lengthening phase.",
    category: "tempo",
    effects: {
      expressionAdjustments: {
        hypertrophy: 0.08,
        "tendon-capacity": 0.08,
        "motor-control": 0.06
      },
      outputAdjustments: ["tempo"]
    },
    coachingTags: ["high-fatigue", "rehab-friendly"],
    progressionRank: 3,
    regressionRank: 2
  },

  {
    id: "single-leg",
    name: "Single-Leg",
    description: "Movement is performed using one leg as the primary support or driver.",
    category: "stance",
    effects: {
      expressionAdjustments: {
        "motor-control": 0.1,
        "tissue-tolerance": 0.08,
        "relative-strength": 0.04
      },
      outputAdjustments: ["side", "symmetry"]
    },
    coachingTags: ["advanced", "balance-demand"],
    progressionRank: 3,
    regressionRank: 2
  },

  {
    id: "single-arm",
    name: "Single-Arm",
    description: "Movement is performed using one arm as the primary driver.",
    category: "stance",
    effects: {
      expressionAdjustments: {
        "motor-control": 0.1,
        "relative-strength": 0.05,
        skill: 0.04
      },
      outputAdjustments: ["side", "symmetry"]
    },
    coachingTags: ["advanced"],
    progressionRank: 3,
    regressionRank: 2
  },

  {
    id: "reactive",
    name: "Reactive",
    description: "Movement relies on rapid ground contact or fast stretch-shortening behaviour.",
    category: "reactive",
    effects: {
      expressionAdjustments: {
        "reactive-strength": 0.16,
        elasticity: 0.12,
        power: 0.05
      },
      outputAdjustments: ["contacts", "ground-contact-time", "rsi"]
    },
    coachingTags: ["advanced", "high-fatigue"],
    progressionRank: 4,
    regressionRank: 1
  },

  {
    id: "continuous",
    name: "Continuous",
    description: "Movement is performed repeatedly without a full reset.",
    category: "execution",
    effects: {
      expressionAdjustments: {
        "strength-endurance": 0.08,
        "work-capacity": 0.08,
        elasticity: 0.04
      },
      outputAdjustments: ["duration", "contacts", "density"]
    },
    coachingTags: ["high-fatigue"],
    progressionRank: 3,
    regressionRank: 2
  },

  {
    id: "partial-rom",
    name: "Partial Range",
    description: "Movement uses a reduced range of motion.",
    category: "range-of-motion",
    effects: {
      expressionAdjustments: {
        "max-strength": 0.05,
        "motor-control": -0.03
      },
      outputAdjustments: ["range"]
    },
    coachingTags: ["advanced"],
    progressionRank: 2,
    regressionRank: 2
  },

  {
    id: "full-rom",
    name: "Full Range",
    description: "Movement uses the full intended range of motion.",
    category: "range-of-motion",
    effects: {
      expressionAdjustments: {
        hypertrophy: 0.06,
        mobility: 0.04,
        "motor-control": 0.04
      },
      outputAdjustments: ["range"]
    },
    coachingTags: ["joint-friendly"],
    progressionRank: 2,
    regressionRank: 2
  },

  {
    id: "depth-limited",
    name: "Depth Limited",
    description: "Movement range is intentionally restricted by target depth or external object.",
    category: "range-of-motion",
    effects: {
      expressionAdjustments: {
        "tissue-tolerance": 0.08,
        "motor-control": 0.08,
        mobility: -0.04
      },
      outputAdjustments: ["range", "box-height"]
    },
    coachingTags: ["rehab-friendly", "joint-friendly"],
    progressionRank: 1,
    regressionRank: 3
  },

  {
    id: "band-assisted",
    name: "Band Assisted",
    description: "Resistance band reduces effective load or bodyweight.",
    category: "assistance",
    effects: {
      expressionAdjustments: {
        "relative-strength": -0.1,
        skill: 0.06,
        "motor-control": 0.04
      },
      outputAdjustments: ["assistance-level"]
    },
    coachingTags: ["beginner-friendly", "rehab-friendly"],
    progressionRank: 1,
    regressionRank: 4
  },

  {
    id: "band-resisted",
    name: "Band Resisted",
    description: "Resistance band increases resistance or changes the loading curve.",
    category: "loading",
    effects: {
      expressionAdjustments: {
        power: 0.06,
        "max-strength": 0.04,
        "motor-control": 0.04
      },
      outputAdjustments: ["band-tension"]
    },
    coachingTags: ["advanced"],
    progressionRank: 3,
    regressionRank: 2
  },

  {
    id: "bodyweight",
    name: "Bodyweight",
    description: "Movement is primarily loaded by the athlete's own body mass.",
    category: "loading",
    effects: {
      expressionAdjustments: {
        "relative-strength": 0.08,
        skill: 0.03
      },
      outputAdjustments: ["bodyweight", "reps"]
    },
    coachingTags: ["beginner-friendly"],
    progressionRank: 1,
    regressionRank: 2
  },

  {
    id: "external-load",
    name: "External Load",
    description: "Movement uses a barbell, dumbbell, kettlebell, vest, belt or other load.",
    category: "loading",
    effects: {
      expressionAdjustments: {
        "max-strength": 0.08,
        hypertrophy: 0.04
      },
      outputAdjustments: ["load"]
    },
    coachingTags: ["high-fatigue"],
    progressionRank: 3,
    regressionRank: 1
  }
];
