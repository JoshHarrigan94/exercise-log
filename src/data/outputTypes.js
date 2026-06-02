export const outputTypes = [

  // Universal Strength / Hypertrophy Outputs

  {
    id: "load",
    name: "Load",
    category: "strength",
    unit: "kg",
    description:
      "External resistance used for the movement expression.",

    appliesTo: [
      "*"
    ],

    diagnosticUse: [
      "force-production",
      "strength-capacity",
      "progression-tracking"
    ]
  },

  {
    id: "reps",
    name: "Reps",
    category: "volume",
    unit: "count",
    description:
      "Number of completed repetitions.",

    appliesTo: [
      "*"
    ],

    diagnosticUse: [
      "volume-tolerance",
      "strength-endurance",
      "progression-tracking"
    ]
  },

  {
    id: "sets",
    name: "Sets",
    category: "volume",
    unit: "count",
    description:
      "Number of performed sets.",

    appliesTo: [
      "*"
    ],

    diagnosticUse: [
      "volume-exposure",
      "workload-tracking"
    ]
  },

  {
    id: "rpe",
    name: "RPE",
    category: "effort",
    unit: "1-10",
    description:
      "Subjective rating of perceived exertion.",

    appliesTo: [
      "*"
    ],

    diagnosticUse: [
      "effort-cost",
      "fatigue-state",
      "readiness-context"
    ]
  },

  {
    id: "rir",
    name: "RIR",
    category: "effort",
    unit: "reps-in-reserve",
    description:
      "Estimated repetitions remaining before failure.",

    appliesTo: [
      "*"
    ],

    diagnosticUse: [
      "proximity-to-failure",
      "load-calibration",
      "fatigue-management"
    ]
  },

  {
    id: "tempo",
    name: "Tempo",
    category: "execution",
    unit: "text",
    description:
      "Controlled timing of eccentric, pause, concentric and reset phases.",

    appliesTo: [
      "*"
    ],

    diagnosticUse: [
      "control",
      "tissue-tolerance",
      "positional-discipline"
    ]
  },

  {
    id: "pause-duration",
    name: "Pause Duration",
    category: "execution",
    unit: "seconds",
    description:
      "Length of deliberate pause within the movement expression.",

    appliesTo: [
      "*"
    ],

    diagnosticUse: [
      "positional-strength",
      "stretch-shortening-removal",
      "control-under-load"
    ]
  },

  {
    id: "bodyweight",
    name: "Bodyweight",
    category: "context",
    unit: "kg",
    description:
      "Athlete bodyweight at time of performance.",

    appliesTo: [
      "*"
    ],

    diagnosticUse: [
      "relative-strength",
      "normalisation",
      "body-mass-context"
    ]
  },

  // Velocity / Power Outputs

  {
    id: "velocity",
    name: "Velocity",
    category: "power",
    unit: "m/s",
    description:
      "Movement speed of the implement or body during the expression.",

    appliesTo: [
      "squat",
      "hinge",
      "horizontal-push",
      "vertical-push",
      "jump",
      "throw"
    ],

    diagnosticUse: [
      "speed-strength",
      "velocity-loss",
      "force-velocity-profile"
    ]
  },

  {
    id: "peak-force",
    name: "Peak Force",
    category: "force",
    unit: "N",
    description:
      "Highest force produced during a movement expression or test.",

    appliesTo: [
      "squat",
      "hinge",
      "jump",
      "isometric"
    ],

    diagnosticUse: [
      "max-force",
      "force-production",
      "asymmetry"
    ]
  },

  {
    id: "force",
    name: "Force",
    category: "force",
    unit: "N",
    description:
      "Measured force output during a movement expression.",

    appliesTo: [
      "squat",
      "hinge",
      "jump",
      "isometric"
    ],

    diagnosticUse: [
      "force-production",
      "rate-of-force-development"
    ]
  },

  {
    id: "power",
    name: "Power",
    category: "power",
    unit: "W",
    description:
      "Rate of work or force application during the movement expression.",

    appliesTo: [
      "jump",
      "throw",
      "sprint",
      "squat",
      "hinge"
    ],

    diagnosticUse: [
      "explosive-output",
      "force-velocity-profile",
      "athletic-expression"
    ]
  },

  // Jump / Plyometric Outputs

  {
    id: "jump-height",
    name: "Jump Height",
    category: "jump",
    unit: "cm",
    description:
      "Vertical displacement achieved during a jump.",

    appliesTo: [
      "jump"
    ],

    diagnosticUse: [
      "concentric-power",
      "lower-body-power",
      "fatigue-state"
    ]
  },

  {
    id: "distance",
    name: "Distance",
    category: "distance",
    unit: "m",
    description:
      "Horizontal distance travelled or projected.",

    appliesTo: [
      "bound",
      "hop",
      "sprint",
      "run",
      "carry",
      "throw"
    ],

    diagnosticUse: [
      "horizontal-power",
      "locomotion-capacity",
      "work-capacity"
    ]
  },

  {
    id: "contact-time",
    name: "Contact Time",
    category: "plyometric",
    unit: "ms",
    description:
      "Time spent on the ground during reactive jumps, hops or bounds.",

    appliesTo: [
      "jump",
      "hop",
      "bound"
    ],

    diagnosticUse: [
      "stiffness",
      "elasticity",
      "reactive-strength"
    ]
  },

  {
    id: "rsi",
    name: "RSI",
    category: "plyometric",
    unit: "ratio",
    description:
      "Reactive Strength Index, usually derived from jump height divided by contact time.",

    appliesTo: [
      "jump",
      "hop",
      "bound"
    ],

    diagnosticUse: [
      "reactive-strength",
      "elasticity",
      "stiffness-regulation"
    ]
  },

  {
    id: "contacts",
    name: "Contacts",
    category: "plyometric",
    unit: "count",
    description:
      "Number of ground contacts during hopping, jumping or plyometric work.",

    appliesTo: [
      "jump",
      "hop",
      "bound"
    ],

    diagnosticUse: [
      "plyometric-volume",
      "tendon-exposure",
      "elastic-fatigue"
    ]
  },

  {
    id: "landing-quality",
    name: "Landing Quality",
    category: "movement-quality",
    unit: "score",
    description:
      "Qualitative score of landing control, alignment and stiffness regulation.",

    appliesTo: [
      "landing",
      "jump",
      "hop",
      "bound"
    ],

    diagnosticUse: [
      "deceleration-control",
      "braking-capacity",
      "tissue-tolerance"
    ]
  },

  // Locomotion / Endurance Outputs

  {
    id: "duration",
    name: "Duration",
    category: "time",
    unit: "seconds",
    description:
      "Total time spent performing or holding the movement expression.",

    appliesTo: [
      "*"
    ],

    diagnosticUse: [
      "time-under-tension",
      "work-capacity",
      "fatigue-resistance"
    ]
  },

  {
    id: "time",
    name: "Time",
    category: "time",
    unit: "seconds",
    description:
      "Elapsed time for a defined distance or task.",

    appliesTo: [
      "sprint",
      "run",
      "carry",
      "step"
    ],

    diagnosticUse: [
      "speed",
      "pace",
      "task-completion"
    ]
  },

  {
    id: "speed",
    name: "Speed",
    category: "locomotion",
    unit: "m/s",
    description:
      "Rate of movement over ground.",

    appliesTo: [
      "sprint",
      "run",
      "carry"
    ],

    diagnosticUse: [
      "speed-expression",
      "acceleration",
      "max-velocity"
    ]
  },

  {
    id: "pace",
    name: "Pace",
    category: "endurance",
    unit: "min/km",
    description:
      "Time taken per unit distance.",

    appliesTo: [
      "run"
    ],

    diagnosticUse: [
      "aerobic-capacity",
      "threshold",
      "fatigue-resistance"
    ]
  },

  {
    id: "heart-rate",
    name: "Heart Rate",
    category: "endurance",
    unit: "bpm",
    description:
      "Cardiac response during or after the movement expression.",

    appliesTo: [
      "run",
      "sprint",
      "carry",
      "step"
    ],

    diagnosticUse: [
      "aerobic-load",
      "recovery-cost",
      "conditioning-state"
    ]
  },

  {
    id: "elevation-gain",
    name: "Elevation Gain",
    category: "locomotion",
    unit: "m",
    description:
      "Vertical elevation accumulated during locomotion.",

    appliesTo: [
      "run",
      "step",
      "carry"
    ],

    diagnosticUse: [
      "climbing-capacity",
      "local-muscular-endurance",
      "durability"
    ]
  },

  // Context / Quality Outputs

  {
    id: "side",
    name: "Side",
    category: "context",
    unit: "left-right",
    description:
      "Side of the body used or measured.",

    appliesTo: [
      "*"
    ],

    diagnosticUse: [
      "asymmetry",
      "unilateral-comparison"
    ]
  },

  {
    id: "quality",
    name: "Quality",
    category: "movement-quality",
    unit: "score",
    description:
      "Subjective or coach-rated quality of execution.",

    appliesTo: [
      "*"
    ],

    diagnosticUse: [
      "technical-consistency",
      "motor-control",
      "skill-expression"
    ]
  },

  {
    id: "pain-response",
    name: "Pain Response",
    category: "rehab",
    unit: "0-10",
    description:
      "Pain level during or after the movement expression.",

    appliesTo: [
      "*"
    ],

    diagnosticUse: [
      "tissue-tolerance",
      "symptom-response",
      "rehab-progression"
    ]
  },

  {
    id: "joint-angle",
    name: "Joint Angle",
    category: "position",
    unit: "degrees",
    description:
      "Joint angle or position at which force, control or tolerance is expressed.",

    appliesTo: [
      "*"
    ],

    diagnosticUse: [
      "joint-angle-specific-strength",
      "positional-capacity",
      "range-specific-limitation"
    ]
  },

  {
    id: "range",
    name: "Range",
    category: "position",
    unit: "text",
    description:
      "Range of motion used during the movement expression.",

    appliesTo: [
      "*"
    ],

    diagnosticUse: [
      "mobility",
      "positional-strength",
      "movement-access"
    ]
  },

  {
    id: "rest",
    name: "Rest",
    category: "programming",
    unit: "seconds",
    description:
      "Rest period between efforts or sets.",

    appliesTo: [
      "*"
    ],

    diagnosticUse: [
      "density",
      "recovery-capacity",
      "work-capacity"
    ]
  }

];

export function getOutputTypeById(outputId) {
  return outputTypes.find(output =>
    output.id === outputId
  );
}

export function getOutputTypesForPattern(patternId) {
  return outputTypes.filter(output =>
    output.appliesTo.includes("*") ||
    output.appliesTo.includes(patternId)
  );
}