export const exerciseBases = [

  // Vertical Pull

  {
    id: "pull-up",

    name: "Pull Up",

    family: "vertical-pull",

    primaryExpressions: [
      "relative-strength"
    ],

    secondaryExpressions: [
      "hypertrophy",
      "strength-endurance"
    ],

    measurableOutputs: [
      "reps",
      "external-load",
      "bodyweight"
    ]
  },

  {
    id: "chin-up",

    name: "Chin Up",

    family: "vertical-pull",

    primaryExpressions: [
      "relative-strength"
    ],

    secondaryExpressions: [
      "hypertrophy"
    ],

    measurableOutputs: [
      "reps",
      "external-load"
    ]
  },

  // Horizontal Push

  {
    id: "push-up",

    name: "Push Up",

    family: "horizontal-push",

    primaryExpressions: [
      "relative-strength"
    ],

    secondaryExpressions: [
      "strength-endurance",
      "hypertrophy"
    ],

    measurableOutputs: [
      "reps",
      "external-load"
    ]
  },

  {
    id: "bench-press",

    name: "Bench Press",

    family: "horizontal-push",

    primaryExpressions: [
      "max-strength"
    ],

    secondaryExpressions: [
      "hypertrophy"
    ],

    measurableOutputs: [
      "load",
      "reps"
    ]
  },

  {
    id: "dip",

    name: "Dip",

    family: "vertical-push",

    primaryExpressions: [
      "relative-strength"
    ],

    secondaryExpressions: [
      "hypertrophy"
    ],

    measurableOutputs: [
      "load",
      "reps"
    ]
  },

  // Squat

  {
    id: "squat",

    name: "Squat",

    family: "squat",

    primaryExpressions: [
      "max-strength"
    ],

    secondaryExpressions: [
      "hypertrophy"
    ],

    measurableOutputs: [
      "load",
      "reps"
    ]
  },

  {
    id: "split-squat",

    name: "Split Squat",

    family: "lunge",

    primaryExpressions: [
      "hypertrophy"
    ],

    secondaryExpressions: [
      "motor-control",
      "tissue-tolerance"
    ],

    measurableOutputs: [
      "load",
      "reps"
    ]
  },

  // Hinge

  {
    id: "deadlift",

    name: "Deadlift",

    family: "hinge",

    primaryExpressions: [
      "max-strength"
    ],

    secondaryExpressions: [
      "power"
    ],

    measurableOutputs: [
      "load",
      "reps"
    ]
  },

  {
    id: "rdl",

    name: "Romanian Deadlift",

    family: "hinge",

    primaryExpressions: [
      "hypertrophy"
    ],

    secondaryExpressions: [
      "tendon-capacity"
    ],

    measurableOutputs: [
      "load",
      "reps"
    ]
  },

  // Elastic

  {
    id: "pogo",

    name: "Pogo",

    family: "hop",

    primaryExpressions: [
      "elasticity"
    ],

    secondaryExpressions: [
      "reactive-strength",
      "tendon-capacity"
    ],

    measurableOutputs: [
      "contacts",
      "duration"
    ]
  },

  {
    id: "broad-jump",

    name: "Broad Jump",

    family: "jump",

    primaryExpressions: [
      "power"
    ],

    secondaryExpressions: [
      "reactive-strength"
    ],

    measurableOutputs: [
      "distance",
      "reps"
    ]
  },

  {
    id: "drop-jump",

    name: "Drop Jump",

    family: "jump",

    primaryExpressions: [
      "reactive-strength"
    ],

    secondaryExpressions: [
      "elasticity"
    ],

    measurableOutputs: [
      "jump-height",
      "ground-contact-time"
    ]
  },

  // Running

  {
    id: "sprint",

    name: "Sprint",

    family: "sprint",

    primaryExpressions: [
      "speed"
    ],

    secondaryExpressions: [
      "power"
    ],

    measurableOutputs: [
      "distance",
      "time"
    ]
  },

  {
    id: "zone2-run",

    name: "Zone 2 Run",

    family: "locomotion",

    primaryExpressions: [
      "aerobic-capacity"
    ],

    secondaryExpressions: [
      "tissue-tolerance"
    ],

    measurableOutputs: [
      "duration",
      "distance",
      "pace"
    ]
  }

];