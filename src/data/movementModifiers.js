export const movementModifiers = [

  // Equipment

  {
    id: "barbell",
    name: "Barbell",
    category: "equipment",

    compatiblePatterns: [
      "*"
    ],

    effects: {
      outputs: ["load"],
      diagnosticSignals: []
    }
  },

  {
    id: "dumbbell",
    name: "Dumbbell",
    category: "equipment",

    compatiblePatterns: [
      "*"
    ],

    effects: {
      outputs: ["load"],
      diagnosticSignals: [
        "stability-demand"
      ]
    }
  },

  {
    id: "bodyweight",
    name: "Bodyweight",
    category: "equipment",

    compatiblePatterns: [
      "*"
    ],

    effects: {
      outputs: ["bodyweight"],
      diagnosticSignals: [
        "relative-strength"
      ]
    }
  },

  {
    id: "machine",
    name: "Machine",
    category: "equipment",

    compatiblePatterns: [
      "*"
    ],

    effects: {
      outputs: ["load"],
      diagnosticSignals: [
        "reduced-stability-demand"
      ]
    }
  },

  // Position

  {
    id: "front-rack",
    name: "Front Rack",
    category: "position",

    compatiblePatterns: [
      "squat"
    ],

    effects: {
      diagnosticSignals: [
        "anterior-chain",
        "torso-control",
        "quad-dominance"
      ]
    }
  },

  {
    id: "rear-rack",
    name: "Rear Rack",
    category: "position",

    compatiblePatterns: [
      "squat"
    ],

    effects: {
      diagnosticSignals: [
        "posterior-chain",
        "force-production"
      ]
    }
  },

  {
    id: "overhead",
    name: "Overhead",
    category: "position",

    compatiblePatterns: [
      "squat",
      "carry",
      "walk"
    ],

    effects: {
      diagnosticSignals: [
        "shoulder-stability",
        "trunk-control"
      ]
    }
  },

  // Range Of Motion

  {
    id: "quarter-rom",
    name: "Quarter Range",
    category: "range-of-motion",

    compatiblePatterns: [
      "squat",
      "hinge",
      "horizontal-push"
    ],

    effects: {
      diagnosticSignals: [
        "joint-angle-specific-strength",
        "high-force-production"
      ]
    }
  },

  {
    id: "full-rom",
    name: "Full Range",
    category: "range-of-motion",

    compatiblePatterns: [
      "*"
    ],

    effects: {
      diagnosticSignals: [
        "mobility",
        "positional-strength"
      ]
    }
  },

  {
    id: "deficit",
    name: "Deficit",
    category: "range-of-motion",

    compatiblePatterns: [
      "hinge",
      "carry"
    ],

    effects: {
      diagnosticSignals: [
        "bottom-position-strength",
        "mobility-demand"
      ]
    }
  },

  // Tempo

  {
    id: "pause",
    name: "Pause",
    category: "tempo",

    compatiblePatterns: [
      "*"
    ],

    effects: {
      outputs: [
        "pause-duration"
      ],

      diagnosticSignals: [
        "positional-strength",
        "stretch-shortening-removal"
      ]
    }
  },

  {
    id: "slow-eccentric",
    name: "Slow Eccentric",
    category: "tempo",

    compatiblePatterns: [
      "*"
    ],

    effects: {
      outputs: [
        "tempo"
      ],

      diagnosticSignals: [
        "control",
        "tissue-tolerance"
      ]
    }
  },

  {
    id: "explosive",
    name: "Explosive",
    category: "tempo",

    compatiblePatterns: [
      "*"
    ],

    effects: {
      outputs: [
        "velocity"
      ],

      diagnosticSignals: [
        "rate-of-force-development",
        "power"
      ]
    }
  },

  // Loading

  {
    id: "weighted",
    name: "Weighted",
    category: "loading",

    compatiblePatterns: [
      "*"
    ],

    effects: {
      outputs: [
        "load"
      ],

      diagnosticSignals: [
        "force-production"
      ]
    }
  },

  {
    id: "assisted",
    name: "Assisted",
    category: "loading",

    compatiblePatterns: [
      "vertical-pull",
      "horizontal-push",
      "vertical-push"
    ],

    effects: {
      diagnosticSignals: [
        "skill-development",
        "regression"
      ]
    }
  },

  {
    id: "accommodating-resistance",
    name: "Accommodating Resistance",
    category: "loading",

    compatiblePatterns: [
      "squat",
      "hinge",
      "horizontal-push",
      "vertical-push"
    ],

    effects: {
      diagnosticSignals: [
        "lockout-strength",
        "velocity-maintenance"
      ]
    }
  },

  // Limb

  {
    id: "single-leg",
    name: "Single Leg",
    category: "limb",

    compatiblePatterns: [
      "jump",
      "hop",
      "bound",
      "lunge",
      "step"
    ],

    effects: {
      outputs: [
        "side"
      ],

      diagnosticSignals: [
        "asymmetry",
        "unilateral-capacity",
        "hip-control"
      ]
    }
  },

  {
    id: "double-leg",
    name: "Double Leg",
    category: "limb",

    compatiblePatterns: [
      "jump",
      "hop",
      "bound"
    ],

    effects: {
      diagnosticSignals: [
        "bilateral-force-production"
      ]
    }
  },

  // Reactive

  {
    id: "reactive",
    name: "Reactive",
    category: "intent",

    compatiblePatterns: [
      "jump",
      "hop",
      "bound",
      "landing"
    ],

    effects: {
      outputs: [
        "contact-time",
        "rsi"
      ],

      diagnosticSignals: [
        "elasticity",
        "stiffness",
        "reactive-strength"
      ]
    }
  },

  {
    id: "concentric-only",
    name: "Concentric Only",
    category: "intent",

    compatiblePatterns: [
      "jump",
      "squat",
      "hinge"
    ],

    effects: {
      diagnosticSignals: [
        "starting-strength",
        "force-production"
      ]
    }
  },

  // Isometric

  {
    id: "isometric",
    name: "Isometric",
    category: "contraction",

    compatiblePatterns: [
      "*"
    ],

    effects: {
      outputs: [
        "duration"
      ],

      diagnosticSignals: [
        "joint-angle-strength",
        "tendon-capacity",
        "positional-capacity"
      ]
    }
  }

];