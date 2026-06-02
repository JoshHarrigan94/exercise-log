export const movementPatterns = [

  // Foundational Strength Patterns

  {
    id: "squat",
    name: "Squat",
    category: "lower-body",
    description:
      "Knee-dominant lower-body pattern used to express squatting strength, control, power and positional capacity.",

    aliases: [
      "knee dominant",
      "squatting",
      "lower body squat"
    ],

    bodyRegions: [
      "quads",
      "glutes",
      "adductors",
      "trunk"
    ],

    defaultOutputs: [
      "load",
      "reps",
      "rpe"
    ],

    compatibleModifierTypes: [
      "equipment",
      "loading",
      "range-of-motion",
      "tempo",
      "position",
      "stance",
      "intent"
    ],

    diagnosticRoles: [
      "lower-body-force-production",
      "positional-strength",
      "quad-dominance",
      "trunk-control"
    ]
  },

  {
    id: "hinge",
    name: "Hinge",
    category: "lower-body",
    description:
      "Hip-dominant pattern used to express posterior-chain strength, hip extension power and trunk stiffness.",

    aliases: [
      "hip hinge",
      "posterior chain",
      "deadlift pattern"
    ],

    bodyRegions: [
      "glutes",
      "hamstrings",
      "spinal erectors",
      "trunk",
      "grip"
    ],

    defaultOutputs: [
      "load",
      "reps",
      "rpe"
    ],

    compatibleModifierTypes: [
      "equipment",
      "loading",
      "range-of-motion",
      "tempo",
      "position",
      "stance",
      "intent"
    ],

    diagnosticRoles: [
      "posterior-chain-strength",
      "hip-extension-capacity",
      "trunk-stiffness",
      "starting-strength"
    ]
  },

  {
    id: "lunge",
    name: "Lunge",
    category: "lower-body",
    description:
      "Split-stance lower-body pattern used to express unilateral strength, hip control and asymmetry.",

    aliases: [
      "split stance",
      "single leg squat pattern",
      "unilateral lower body"
    ],

    bodyRegions: [
      "quads",
      "glutes",
      "adductors",
      "hips"
    ],

    defaultOutputs: [
      "load",
      "reps",
      "side",
      "rpe"
    ],

    compatibleModifierTypes: [
      "equipment",
      "loading",
      "tempo",
      "range-of-motion",
      "stance",
      "intent"
    ],

    diagnosticRoles: [
      "unilateral-strength",
      "hip-control",
      "asymmetry",
      "tissue-tolerance"
    ]
  },

  {
    id: "step",
    name: "Step",
    category: "lower-body",
    description:
      "Stepping pattern used to express single-leg strength, climbing capacity, knee tolerance and work capacity.",

    aliases: [
      "step up",
      "step down",
      "box step"
    ],

    bodyRegions: [
      "quads",
      "glutes",
      "calves",
      "hips"
    ],

    defaultOutputs: [
      "height",
      "load",
      "reps",
      "side"
    ],

    compatibleModifierTypes: [
      "equipment",
      "loading",
      "height",
      "tempo",
      "intent"
    ],

    diagnosticRoles: [
      "single-leg-capacity",
      "climbing-capacity",
      "knee-tolerance",
      "work-capacity"
    ]
  },

  // Upper Body Push / Pull

  {
    id: "horizontal-push",
    name: "Horizontal Push",
    category: "upper-body",
    description:
      "Pressing pattern used to express chest, shoulder and triceps force production in a horizontal direction.",

    aliases: [
      "press",
      "bench",
      "push up",
      "chest press"
    ],

    bodyRegions: [
      "chest",
      "triceps",
      "shoulders",
      "core"
    ],

    defaultOutputs: [
      "load",
      "reps",
      "rpe"
    ],

    compatibleModifierTypes: [
      "equipment",
      "loading",
      "tempo",
      "range-of-motion",
      "grip",
      "position",
      "intent"
    ],

    diagnosticRoles: [
      "upper-body-force-production",
      "pressing-strength",
      "lockout-strength",
      "positional-control"
    ]
  },

  {
    id: "vertical-push",
    name: "Vertical Push",
    category: "upper-body",
    description:
      "Overhead or support-based pressing pattern used to express shoulder, triceps and trunk capacity.",

    aliases: [
      "overhead press",
      "shoulder press",
      "dip",
      "support press"
    ],

    bodyRegions: [
      "shoulders",
      "triceps",
      "upper back",
      "core"
    ],

    defaultOutputs: [
      "load",
      "reps",
      "rpe"
    ],

    compatibleModifierTypes: [
      "equipment",
      "loading",
      "tempo",
      "range-of-motion",
      "grip",
      "position",
      "intent"
    ],

    diagnosticRoles: [
      "overhead-strength",
      "shoulder-capacity",
      "support-strength",
      "trunk-control"
    ]
  },

  {
    id: "horizontal-pull",
    name: "Horizontal Pull",
    category: "upper-body",
    description:
      "Rowing pattern used to express upper-back, lat, grip and scapular pulling capacity.",

    aliases: [
      "row",
      "rowing",
      "pull horizontally"
    ],

    bodyRegions: [
      "back",
      "lats",
      "rear delts",
      "arms",
      "grip"
    ],

    defaultOutputs: [
      "load",
      "reps",
      "rpe"
    ],

    compatibleModifierTypes: [
      "equipment",
      "loading",
      "tempo",
      "range-of-motion",
      "grip",
      "position",
      "intent"
    ],

    diagnosticRoles: [
      "upper-back-capacity",
      "scapular-control",
      "pulling-volume",
      "grip-contribution"
    ]
  },

  {
    id: "vertical-pull",
    name: "Vertical Pull",
    category: "upper-body",
    description:
      "Vertical pulling pattern used to express relative strength, lat capacity, scapular depression and grip.",

    aliases: [
      "pull up",
      "chin up",
      "pulldown",
      "vertical pulling"
    ],

    bodyRegions: [
      "back",
      "lats",
      "arms",
      "grip",
      "shoulders"
    ],

    defaultOutputs: [
      "reps",
      "external-load",
      "bodyweight",
      "rpe"
    ],

    compatibleModifierTypes: [
      "equipment",
      "loading",
      "assistance",
      "tempo",
      "range-of-motion",
      "grip",
      "position",
      "intent"
    ],

    diagnosticRoles: [
      "relative-strength",
      "scapular-depression",
      "lat-capacity",
      "grip-endurance"
    ]
  },

  // Locomotion / Athletic Patterns

  {
    id: "jump",
    name: "Jump",
    category: "athletic-development",
    description:
      "Bilateral or unilateral take-off pattern used to express power, stiffness, coordination and lower-body explosiveness.",

    aliases: [
      "vertical jump",
      "box jump",
      "broad jump",
      "jumping"
    ],

    bodyRegions: [
      "quads",
      "glutes",
      "hamstrings",
      "calves",
      "feet"
    ],

    defaultOutputs: [
      "jump-height",
      "distance",
      "reps",
      "quality"
    ],

    compatibleModifierTypes: [
      "direction",
      "loading",
      "landing",
      "surface",
      "intent",
      "approach"
    ],

    diagnosticRoles: [
      "concentric-power",
      "lower-body-power",
      "coordination",
      "force-expression"
    ]
  },

  {
    id: "hop",
    name: "Hop",
    category: "athletic-development",
    description:
      "Single-leg or repeated elastic pattern used to express ankle stiffness, tendon capacity and reactive qualities.",

    aliases: [
      "pogo",
      "single leg hop",
      "ankle hop"
    ],

    bodyRegions: [
      "calves",
      "achilles",
      "feet",
      "ankles"
    ],

    defaultOutputs: [
      "contacts",
      "duration",
      "distance",
      "quality"
    ],

    compatibleModifierTypes: [
      "limb",
      "direction",
      "surface",
      "rhythm",
      "intent"
    ],

    diagnosticRoles: [
      "elasticity",
      "tendon-capacity",
      "stiffness",
      "reactive-strength"
    ]
  },

  {
    id: "bound",
    name: "Bound",
    category: "athletic-development",
    description:
      "Powerful horizontal projection pattern used to express hip power, elasticity and coordination.",

    aliases: [
      "bounding",
      "alternate bound",
      "triple hop"
    ],

    bodyRegions: [
      "glutes",
      "hamstrings",
      "calves",
      "hips"
    ],

    defaultOutputs: [
      "distance",
      "contacts",
      "quality"
    ],

    compatibleModifierTypes: [
      "limb",
      "direction",
      "rhythm",
      "surface",
      "intent"
    ],

    diagnosticRoles: [
      "horizontal-power",
      "elasticity",
      "coordination",
      "projection-capacity"
    ]
  },

  {
    id: "landing",
    name: "Landing",
    category: "athletic-development",
    description:
      "Deceleration pattern used to express braking capacity, control, stiffness regulation and tissue tolerance.",

    aliases: [
      "stick landing",
      "drop landing",
      "deceleration landing"
    ],

    bodyRegions: [
      "feet",
      "ankles",
      "knees",
      "hips",
      "trunk"
    ],

    defaultOutputs: [
      "height",
      "landing-quality",
      "side"
    ],

    compatibleModifierTypes: [
      "height",
      "limb",
      "direction",
      "surface",
      "intent"
    ],

    diagnosticRoles: [
      "deceleration",
      "braking-capacity",
      "landing-control",
      "tissue-tolerance"
    ]
  },

  {
    id: "sprint",
    name: "Sprint",
    category: "locomotion",
    description:
      "High-speed running pattern used to express acceleration, velocity, power and running mechanics.",

    aliases: [
      "sprinting",
      "acceleration",
      "max velocity",
      "speed work"
    ],

    bodyRegions: [
      "glutes",
      "hamstrings",
      "calves",
      "feet",
      "trunk"
    ],

    defaultOutputs: [
      "distance",
      "time",
      "speed",
      "reps"
    ],

    compatibleModifierTypes: [
      "distance",
      "surface",
      "gradient",
      "resistance",
      "start-position",
      "intent"
    ],

    diagnosticRoles: [
      "acceleration",
      "max-velocity",
      "speed-expression",
      "running-mechanics"
    ]
  },

  {
    id: "run",
    name: "Run",
    category: "locomotion",
    description:
      "Sustained running pattern used to express aerobic capacity, threshold, durability and fatigue resistance.",

    aliases: [
      "running",
      "easy run",
      "tempo run",
      "interval run"
    ],

    bodyRegions: [
      "heart",
      "lungs",
      "legs",
      "feet"
    ],

    defaultOutputs: [
      "duration",
      "distance",
      "pace",
      "heart-rate"
    ],

    compatibleModifierTypes: [
      "intensity-zone",
      "surface",
      "gradient",
      "duration",
      "interval-structure"
    ],

    diagnosticRoles: [
      "aerobic-capacity",
      "lactate-threshold",
      "fatigue-resistance",
      "tissue-tolerance"
    ]
  },

  // Carry / Throw / Rotation

  {
    id: "carry",
    name: "Carry",
    category: "loaded-locomotion",
    description:
      "Loaded locomotion pattern used to express grip, trunk stiffness, gait robustness and work capacity.",

    aliases: [
      "loaded carry",
      "farmer carry",
      "loaded walk"
    ],

    bodyRegions: [
      "grip",
      "traps",
      "core",
      "hips",
      "legs"
    ],

    defaultOutputs: [
      "load",
      "distance",
      "duration"
    ],

    compatibleModifierTypes: [
      "equipment",
      "loading",
      "carry-position",
      "distance",
      "surface",
      "intent"
    ],

    diagnosticRoles: [
      "work-capacity",
      "grip-capacity",
      "trunk-stiffness",
      "gait-under-load"
    ]
  },

  {
    id: "throw",
    name: "Throw",
    category: "athletic-development",
    description:
      "Projection pattern used to express upper-body, trunk and hip power through acceleration of an implement.",

    aliases: [
      "medicine ball throw",
      "chest throw",
      "rotational throw"
    ],

    bodyRegions: [
      "hips",
      "core",
      "shoulders",
      "arms"
    ],

    defaultOutputs: [
      "load",
      "distance",
      "reps"
    ],

    compatibleModifierTypes: [
      "equipment",
      "direction",
      "stance",
      "intent"
    ],

    diagnosticRoles: [
      "upper-body-power",
      "rotational-power",
      "coordination",
      "force-transfer"
    ]
  },

  {
    id: "rotation",
    name: "Rotation",
    category: "core",
    description:
      "Rotational trunk pattern used to express force transfer, rotational control and oblique capacity.",

    aliases: [
      "twist",
      "chop",
      "lift",
      "rotational core"
    ],

    bodyRegions: [
      "core",
      "obliques",
      "hips",
      "shoulders"
    ],

    defaultOutputs: [
      "load",
      "reps",
      "side"
    ],

    compatibleModifierTypes: [
      "equipment",
      "direction",
      "stance",
      "tempo",
      "intent"
    ],

    diagnosticRoles: [
      "rotational-control",
      "rotational-power",
      "force-transfer",
      "trunk-coordination"
    ]
  },

  {
    id: "anti-rotation",
    name: "Anti Rotation",
    category: "core",
    description:
      "Trunk control pattern used to resist unwanted rotation and express anti-rotational stiffness.",

    aliases: [
      "pallof",
      "anti rotation core"
    ],

    bodyRegions: [
      "core",
      "obliques",
      "hips"
    ],

    defaultOutputs: [
      "load",
      "reps",
      "duration",
      "side"
    ],

    compatibleModifierTypes: [
      "equipment",
      "stance",
      "tempo",
      "intent"
    ],

    diagnosticRoles: [
      "trunk-stiffness",
      "anti-rotation-control",
      "force-transfer",
      "asymmetry"
    ]
  },

  {
    id: "anti-extension",
    name: "Anti Extension",
    category: "core",
    description:
      "Trunk control pattern used to resist spinal extension and express anterior-core capacity.",

    aliases: [
      "plank",
      "hollow hold",
      "dead bug"
    ],

    bodyRegions: [
      "core",
      "trunk",
      "hips"
    ],

    defaultOutputs: [
      "duration",
      "reps",
      "quality"
    ],

    compatibleModifierTypes: [
      "equipment",
      "position",
      "loading",
      "tempo",
      "intent"
    ],

    diagnosticRoles: [
      "anterior-core-control",
      "pelvic-control",
      "trunk-stiffness",
      "fatigue-resistance"
    ]
  },

  {
    id: "anti-lateral-flexion",
    name: "Anti Lateral Flexion",
    category: "core",
    description:
      "Trunk control pattern used to resist side bending and express lateral-core capacity.",

    aliases: [
      "side plank",
      "lateral core",
      "suitcase carry"
    ],

    bodyRegions: [
      "obliques",
      "core",
      "hips"
    ],

    defaultOutputs: [
      "duration",
      "load",
      "side",
      "quality"
    ],

    compatibleModifierTypes: [
      "equipment",
      "position",
      "loading",
      "tempo",
      "intent"
    ],

    diagnosticRoles: [
      "lateral-core-control",
      "frontal-plane-stability",
      "asymmetry",
      "trunk-stiffness"
    ]
  }

];