export const expressionTargets = {

  "relative-strength": {
    metrics: [
      "bodyweight",
      "external-load",
      "reps"
    ],

    recommendations: [
      "Track bodyweight consistently.",
      "Track total reps performed.",
      "Track external load progression."
    ]
  },

  "max-strength": {
    metrics: [
      "external-load",
      "estimated-1rm",
      "reps"
    ],

    recommendations: [
      "Track estimated 1RM trends.",
      "Track top sets.",
      "Track weekly intensity exposure."
    ]
  },

  "hypertrophy": {
    metrics: [
      "volume-load",
      "sets",
      "reps",
      "bodyweight"
    ],

    recommendations: [
      "Track weekly volume.",
      "Track bodyweight trends.",
      "Track effective sets."
    ]
  },

  "strength-endurance": {
    metrics: [
      "reps",
      "duration",
      "density"
    ],

    recommendations: [
      "Track total reps.",
      "Track density improvements.",
      "Track work completed per minute."
    ]
  },

  "power": {
    metrics: [
      "jump-height",
      "distance",
      "velocity"
    ],

    recommendations: [
      "Track explosive outputs.",
      "Monitor velocity trends.",
      "Avoid excessive fatigue."
    ]
  },

  "reactive-strength": {
    metrics: [
      "jump-height",
      "ground-contact-time",
      "rsi"
    ],

    recommendations: [
      "Track RSI.",
      "Track contact times.",
      "Monitor tendon readiness."
    ]
  },

  "elasticity": {
    metrics: [
      "contact-time",
      "bounce-quality",
      "stiffness"
    ],

    recommendations: [
      "Monitor elastic rebound.",
      "Track reactive contacts.",
      "Monitor lower-leg fatigue."
    ]
  },

  "aerobic-capacity": {
    metrics: [
      "pace",
      "heart-rate",
      "duration",
      "distance"
    ],

    recommendations: [
      "Track Zone 2 pace.",
      "Track average heart rate.",
      "Track weekly duration."
    ]
  },

  "speed": {
    metrics: [
      "time",
      "distance",
      "velocity"
    ],

    recommendations: [
      "Track sprint times.",
      "Track peak velocity.",
      "Monitor recovery between efforts."
    ]
  },

  "motor-control": {
    metrics: [
      "quality-score",
      "pain-score"
    ],

    recommendations: [
      "Prioritise movement quality.",
      "Track technical consistency."
    ]
  },

  "tendon-capacity": {
    metrics: [
      "pain-score",
      "volume",
      "duration"
    ],

    recommendations: [
      "Track pain trends.",
      "Track loading exposure.",
      "Avoid large spikes in volume."
    ]
  },

  "tissue-tolerance": {
    metrics: [
      "pain-score",
      "volume"
    ],

    recommendations: [
      "Track symptom response.",
      "Progress volume gradually."
    ]
  }
};
