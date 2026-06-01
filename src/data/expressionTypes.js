export const expressionTypes = [
  {
    id: "max-strength",
    name: "Max Strength",
    description: "Highest force output against heavy resistance.",
    category: "force",
    measurableSignals: ["load", "reps", "rpe"],
    progressionBias: ["increase-load", "improve-quality"]
  },

  {
    id: "relative-strength",
    name: "Relative Strength",
    description: "Strength expressed relative to bodyweight.",
    category: "force",
    measurableSignals: ["load", "reps", "bodyweight", "rpe"],
    progressionBias: ["increase-load", "increase-reps", "increase-complexity"]
  },

  {
    id: "starting-strength",
    name: "Starting Strength",
    description: "Ability to rapidly produce force from a static or paused position.",
    category: "force",
    measurableSignals: ["load", "velocity", "pause-duration"],
    progressionBias: ["increase-load", "increase-speed", "improve-quality"]
  },

  {
    id: "hypertrophy",
    name: "Hypertrophy",
    description: "Muscle growth stimulus through repeatable volume and proximity to failure.",
    category: "muscle",
    measurableSignals: ["sets", "reps", "load", "rpe", "tempo"],
    progressionBias: ["increase-reps", "increase-volume", "increase-load"]
  },

  {
    id: "strength-endurance",
    name: "Strength Endurance",
    description: "Ability to sustain repeated force output over multiple reps or sets.",
    category: "muscle",
    measurableSignals: ["reps", "sets", "duration", "density", "rpe"],
    progressionBias: ["increase-reps", "increase-density", "increase-volume"]
  },

  {
    id: "power",
    name: "Power",
    description: "Ability to express force quickly.",
    category: "power",
    measurableSignals: ["velocity", "distance", "jump-height", "load"],
    progressionBias: ["increase-speed", "increase-load", "improve-quality"]
  },

  {
    id: "reactive-strength",
    name: "Reactive Strength",
    description: "Ability to absorb and re-express force rapidly.",
    category: "elastic",
    measurableSignals: ["contacts", "ground-contact-time", "jump-height", "rsi"],
    progressionBias: ["increase-speed", "increase-tolerance", "improve-quality"]
  },

  {
    id: "elasticity",
    name: "Elasticity",
    description: "Tendon and fascial contribution to repeated spring-like movement.",
    category: "elastic",
    measurableSignals: ["contacts", "duration", "ground-contact-quality"],
    progressionBias: ["increase-contacts", "increase-tolerance", "improve-quality"]
  },

  {
    id: "speed",
    name: "Speed",
    description: "Ability to move or cover distance rapidly.",
    category: "power",
    measurableSignals: ["distance", "time", "velocity"],
    progressionBias: ["increase-speed", "improve-quality"]
  },

  {
    id: "acceleration",
    name: "Acceleration",
    description: "Ability to rapidly increase speed from a start.",
    category: "power",
    measurableSignals: ["distance", "time", "split-time"],
    progressionBias: ["increase-speed", "improve-quality"]
  },

  {
    id: "aerobic-capacity",
    name: "Aerobic Capacity",
    description: "Sustainable low-to-moderate intensity energy production.",
    category: "energy-system",
    measurableSignals: ["duration", "distance", "heart-rate", "pace"],
    progressionBias: ["increase-duration", "increase-distance", "increase-density"]
  },

  {
    id: "anaerobic-capacity",
    name: "Anaerobic Capacity",
    description: "Ability to tolerate and repeat high-intensity efforts.",
    category: "energy-system",
    measurableSignals: ["intervals", "duration", "distance", "rest", "rpe"],
    progressionBias: ["increase-density", "increase-duration", "increase-reps"]
  },

  {
    id: "skill",
    name: "Skill",
    description: "Technical execution, coordination and movement-specific proficiency.",
    category: "skill",
    measurableSignals: ["quality", "range", "reps", "success-rate"],
    progressionBias: ["increase-complexity", "improve-quality"]
  },

  {
    id: "motor-control",
    name: "Motor Control",
    description: "Ability to control position, tempo, range and alignment.",
    category: "control",
    measurableSignals: ["tempo", "range", "quality", "stability"],
    progressionBias: ["increase-range", "increase-complexity", "improve-quality"]
  },

  {
    id: "mobility",
    name: "Mobility",
    description: "Usable range of motion under control.",
    category: "mobility",
    measurableSignals: ["range", "duration", "quality"],
    progressionBias: ["increase-range", "increase-duration", "improve-quality"]
  },

  {
    id: "tendon-capacity",
    name: "Tendon Capacity",
    description: "Capacity of tendon structures to tolerate and adapt to loading.",
    category: "tissue",
    measurableSignals: ["load", "duration", "contacts", "pain-response", "next-day-response"],
    progressionBias: ["increase-tolerance", "increase-load", "increase-contacts"]
  },

  {
    id: "tissue-tolerance",
    name: "Tissue Tolerance",
    description: "General tolerance of joints, connective tissue and local structures to repeated exposure.",
    category: "tissue",
    measurableSignals: ["volume", "frequency", "pain-response", "next-day-response"],
    progressionBias: ["increase-tolerance", "increase-volume", "increase-frequency"]
  },

  {
    id: "work-capacity",
    name: "Work Capacity",
    description: "Ability to tolerate and recover from total training work.",
    category: "energy-system",
    measurableSignals: ["sets", "reps", "duration", "density", "rpe"],
    progressionBias: ["increase-volume", "increase-density", "increase-frequency"]
  }
];
