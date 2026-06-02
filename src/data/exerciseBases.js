export const exerciseBases = [

  // Vertical Pull

  {
    id: "pull-up",
    name: "Pull Up",
    domain: "calisthenics",
    family: "vertical-pull",

    aliases: [
      "pullup",
      "strict pull up",
      "bodyweight pull up"
    ],

    equipment: [
      "bodyweight",
      "pull-up bar"
    ],

    bodyRegions: [
      "back",
      "lats",
      "arms",
      "grip"
    ],

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
    domain: "calisthenics",
    family: "vertical-pull",

    aliases: [
      "chinup",
      "underhand pull up",
      "supinated pull up"
    ],

    equipment: [
      "bodyweight",
      "pull-up bar"
    ],

    bodyRegions: [
      "back",
      "lats",
      "biceps",
      "grip"
    ],

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
    id: "lat-pulldown",
    name: "Lat Pulldown",
    domain: "strength",
    family: "vertical-pull",

    aliases: [
      "pulldown",
      "cable pulldown",
      "machine pulldown"
    ],

    equipment: [
      "cable",
      "machine"
    ],

    bodyRegions: [
      "back",
      "lats",
      "arms"
    ],

    primaryExpressions: [
      "hypertrophy"
    ],

    secondaryExpressions: [
      "strength-endurance",
      "motor-control"
    ],

    measurableOutputs: [
      "load",
      "reps",
      "tempo"
    ]
  },

  // Horizontal Pull

  {
    id: "row",
    name: "Row",
    domain: "strength",
    family: "horizontal-pull",

    aliases: [
      "rowing",
      "generic row"
    ],

    equipment: [
      "barbell",
      "dumbbell",
      "cable",
      "machine",
      "bodyweight",
      "rings"
    ],

    bodyRegions: [
      "back",
      "lats",
      "rear delts",
      "arms",
      "grip"
    ],

    primaryExpressions: [
      "hypertrophy"
    ],

    secondaryExpressions: [
      "strength-endurance",
      "motor-control"
    ],

    measurableOutputs: [
      "load",
      "reps",
      "range"
    ]
  },

  {
    id: "inverted-row",
    name: "Inverted Row",
    domain: "calisthenics",
    family: "horizontal-pull",

    aliases: [
      "bodyweight row",
      "ring row",
      "trx row"
    ],

    equipment: [
      "bodyweight",
      "rings",
      "trx",
      "bar"
    ],

    bodyRegions: [
      "back",
      "lats",
      "arms",
      "grip"
    ],

    primaryExpressions: [
      "relative-strength"
    ],

    secondaryExpressions: [
      "hypertrophy",
      "strength-endurance"
    ],

    measurableOutputs: [
      "reps",
      "body-angle",
      "tempo"
    ]
  },

  {
    id: "barbell-row",
    name: "Barbell Row",
    domain: "strength",
    family: "horizontal-pull",

    aliases: [
      "bent over row",
      "bb row"
    ],

    equipment: [
      "barbell"
    ],

    bodyRegions: [
      "back",
      "lats",
      "spinal erectors",
      "grip"
    ],

    primaryExpressions: [
      "hypertrophy"
    ],

    secondaryExpressions: [
      "max-strength",
      "strength-endurance"
    ],

    measurableOutputs: [
      "load",
      "reps",
      "rpe"
    ]
  },

  {
    id: "pendlay-row",
    name: "Pendlay Row",
    domain: "strength",
    family: "horizontal-pull",

    aliases: [
      "dead stop row",
      "explosive barbell row"
    ],

    equipment: [
      "barbell"
    ],

    bodyRegions: [
      "back",
      "lats",
      "posterior chain"
    ],

    primaryExpressions: [
      "power"
    ],

    secondaryExpressions: [
      "max-strength",
      "hypertrophy"
    ],

    measurableOutputs: [
      "load",
      "reps",
      "rpe"
    ]
  },

  // Horizontal Push

  {
    id: "push-up",
    name: "Push Up",
    domain: "calisthenics",
    family: "horizontal-push",

    aliases: [
      "pushup",
      "press up",
      "bodyweight press"
    ],

    equipment: [
      "bodyweight"
    ],

    bodyRegions: [
      "chest",
      "triceps",
      "shoulders",
      "core"
    ],

    primaryExpressions: [
      "relative-strength"
    ],

    secondaryExpressions: [
      "strength-endurance",
      "hypertrophy"
    ],

    measurableOutputs: [
      "reps",
      "external-load",
      "bodyweight"
    ]
  },

  {
    id: "bench-press",
    name: "Bench Press",
    domain: "strength",
    family: "horizontal-push",

    aliases: [
      "barbell bench press",
      "flat bench",
      "bench"
    ],

    equipment: [
      "barbell",
      "bench"
    ],

    bodyRegions: [
      "chest",
      "triceps",
      "shoulders"
    ],

    primaryExpressions: [
      "max-strength"
    ],

    secondaryExpressions: [
      "hypertrophy",
      "strength-endurance"
    ],

    measurableOutputs: [
      "load",
      "reps",
      "rpe"
    ]
  },

  // Vertical Push

  {
    id: "dip",
    name: "Dip",
    domain: "calisthenics",
    family: "vertical-push",

    aliases: [
      "parallel bar dip",
      "bodyweight dip"
    ],

    equipment: [
      "bodyweight",
      "dip bars",
      "rings"
    ],

    bodyRegions: [
      "chest",
      "triceps",
      "shoulders"
    ],

    primaryExpressions: [
      "relative-strength"
    ],

    secondaryExpressions: [
      "hypertrophy",
      "strength-endurance"
    ],

    measurableOutputs: [
      "load",
      "reps",
      "bodyweight"
    ]
  },

  {
    id: "overhead-press",
    name: "Overhead Press",
    domain: "strength",
    family: "vertical-push",

    aliases: [
      "shoulder press",
      "strict press",
      "military press"
    ],

    equipment: [
      "barbell",
      "dumbbell",
      "kettlebell"
    ],

    bodyRegions: [
      "shoulders",
      "triceps",
      "upper back",
      "core"
    ],

    primaryExpressions: [
      "max-strength"
    ],

    secondaryExpressions: [
      "hypertrophy",
      "motor-control"
    ],

    measurableOutputs: [
      "load",
      "reps",
      "rpe"
    ]
  },

  // Squat / Knee Dominant

  {
    id: "squat",
    name: "Squat",
    domain: "strength",
    family: "squat",

    aliases: [
      "barbell squat",
      "back squat"
    ],

    equipment: [
      "barbell",
      "bodyweight",
      "dumbbell",
      "kettlebell",
      "machine"
    ],

    bodyRegions: [
      "quads",
      "glutes",
      "adductors",
      "trunk"
    ],

    primaryExpressions: [
      "max-strength"
    ],

    secondaryExpressions: [
      "hypertrophy",
      "motor-control"
    ],

    measurableOutputs: [
      "load",
      "reps",
      "rpe"
    ]
  },

  {
    id: "split-squat",
    name: "Split Squat",
    domain: "strength",
    family: "lunge",

    aliases: [
      "static lunge",
      "stationary lunge"
    ],

    equipment: [
      "bodyweight",
      "dumbbell",
      "barbell",
      "kettlebell"
    ],

    bodyRegions: [
      "quads",
      "glutes",
      "adductors",
      "hips"
    ],

    primaryExpressions: [
      "hypertrophy"
    ],

    secondaryExpressions: [
      "motor-control",
      "tissue-tolerance"
    ],

    measurableOutputs: [
      "load",
      "reps",
      "side",
      "rpe"
    ]
  },

  {
    id: "bulgarian-split-squat",
    name: "Bulgarian Split Squat",
    domain: "strength",
    family: "lunge",

    aliases: [
      "rfess",
      "rear foot elevated split squat"
    ],

    equipment: [
      "bodyweight",
      "dumbbell",
      "barbell",
      "bench"
    ],

    bodyRegions: [
      "quads",
      "glutes",
      "adductors"
    ],

    primaryExpressions: [
      "hypertrophy"
    ],

    secondaryExpressions: [
      "motor-control",
      "tissue-tolerance"
    ],

    measurableOutputs: [
      "load",
      "reps",
      "side",
      "rpe"
    ]
  },

  {
    id: "step-up",
    name: "Step Up",
    domain: "strength",
    family: "step",

    aliases: [
      "box step up",
      "weighted step up"
    ],

    equipment: [
      "bodyweight",
      "box",
      "bench",
      "dumbbell",
      "barbell"
    ],

    bodyRegions: [
      "quads",
      "glutes",
      "calves",
      "hips"
    ],

    primaryExpressions: [
      "tissue-tolerance"
    ],

    secondaryExpressions: [
      "hypertrophy",
      "motor-control"
    ],

    measurableOutputs: [
      "load",
      "reps",
      "height",
      "side"
    ]
  },

  // Hinge / Posterior Chain

  {
    id: "deadlift",
    name: "Deadlift",
    domain: "strength",
    family: "hinge",

    aliases: [
      "conventional deadlift",
      "pull from floor"
    ],

    equipment: [
      "barbell",
      "trap bar"
    ],

    bodyRegions: [
      "glutes",
      "hamstrings",
      "back",
      "grip",
      "trunk"
    ],

    primaryExpressions: [
      "max-strength"
    ],

    secondaryExpressions: [
      "power",
      "tissue-tolerance"
    ],

    measurableOutputs: [
      "load",
      "reps",
      "rpe"
    ]
  },

  {
    id: "rdl",
    name: "Romanian Deadlift",
    domain: "strength",
    family: "hinge",

    aliases: [
      "rdl",
      "stiff leg deadlift",
      "hip hinge"
    ],

    equipment: [
      "barbell",
      "dumbbell",
      "kettlebell"
    ],

    bodyRegions: [
      "hamstrings",
      "glutes",
      "back"
    ],

    primaryExpressions: [
      "hypertrophy"
    ],

    secondaryExpressions: [
      "tendon-capacity",
      "motor-control"
    ],

    measurableOutputs: [
      "load",
      "reps",
      "rpe"
    ]
  },

  {
    id: "hip-thrust",
    name: "Hip Thrust",
    domain: "strength",
    family: "hinge",

    aliases: [
      "barbell hip thrust",
      "glute bridge"
    ],

    equipment: [
      "barbell",
      "bench",
      "bodyweight"
    ],

    bodyRegions: [
      "glutes",
      "hamstrings"
    ],

    primaryExpressions: [
      "hypertrophy"
    ],

    secondaryExpressions: [
      "max-strength"
    ],

    measurableOutputs: [
      "load",
      "reps",
      "rpe"
    ]
  },

  {
    id: "kettlebell-swing",
    name: "Kettlebell Swing",
    domain: "power",
    family: "hinge",

    aliases: [
      "kb swing",
      "hardstyle swing"
    ],

    equipment: [
      "kettlebell"
    ],

    bodyRegions: [
      "glutes",
      "hamstrings",
      "back",
      "trunk"
    ],

    primaryExpressions: [
      "power"
    ],

    secondaryExpressions: [
      "work-capacity",
      "tendon-capacity"
    ],

    measurableOutputs: [
      "load",
      "reps",
      "duration",
      "density"
    ]
  },

  // Lower Leg / Rehab

  {
    id: "calf-raise",
    name: "Calf Raise",
    domain: "rehab",
    family: "calf",

    aliases: [
      "standing calf raise",
      "heel raise"
    ],

    equipment: [
      "bodyweight",
      "dumbbell",
      "machine",
      "smith machine"
    ],

    bodyRegions: [
      "calves",
      "achilles",
      "feet"
    ],

    primaryExpressions: [
      "tendon-capacity"
    ],

    secondaryExpressions: [
      "hypertrophy",
      "tissue-tolerance"
    ],

    measurableOutputs: [
      "load",
      "reps",
      "tempo",
      "pain-response"
    ]
  },

  {
    id: "tibialis-raise",
    name: "Tibialis Raise",
    domain: "rehab",
    family: "tibialis",

    aliases: [
      "tib raise",
      "shin raise",
      "anterior tib raise"
    ],

    equipment: [
      "bodyweight",
      "band",
      "machine"
    ],

    bodyRegions: [
      "shins",
      "ankles",
      "feet"
    ],

    primaryExpressions: [
      "tissue-tolerance"
    ],

    secondaryExpressions: [
      "motor-control"
    ],

    measurableOutputs: [
      "reps",
      "load",
      "range"
    ]
  },

  {
    id: "nordic-curl",
    name: "Nordic Curl",
    domain: "resilience",
    family: "knee-flexion",

    aliases: [
      "nordic hamstring curl",
      "nordic"
    ],

    equipment: [
      "bodyweight",
      "partner",
      "anchor"
    ],

    bodyRegions: [
      "hamstrings",
      "posterior chain"
    ],

    primaryExpressions: [
      "tissue-tolerance"
    ],

    secondaryExpressions: [
      "eccentric-strength",
      "hypertrophy"
    ],

    measurableOutputs: [
      "reps",
      "range",
      "tempo"
    ]
  },

  {
    id: "copenhagen-plank",
    name: "Copenhagen Plank",
    domain: "resilience",
    family: "adductor",

    aliases: [
      "copenhagen",
      "adductor plank"
    ],

    equipment: [
      "bodyweight",
      "bench"
    ],

    bodyRegions: [
      "adductors",
      "core",
      "hips"
    ],

    primaryExpressions: [
      "tissue-tolerance"
    ],

    secondaryExpressions: [
      "motor-control",
      "isometric-strength"
    ],

    measurableOutputs: [
      "duration",
      "side",
      "quality"
    ]
  },

  // Core / Carry

  {
    id: "plank",
    name: "Plank",
    domain: "core",
    family: "anti-extension",

    aliases: [
      "front plank",
      "prone plank"
    ],

    equipment: [
      "bodyweight"
    ],

    bodyRegions: [
      "core",
      "trunk",
      "shoulders"
    ],

    primaryExpressions: [
      "motor-control"
    ],

    secondaryExpressions: [
      "tissue-tolerance"
    ],

    measurableOutputs: [
      "duration",
      "load",
      "quality"
    ]
  },

  {
    id: "loaded-carry",
    name: "Loaded Carry",
    domain: "conditioning",
    family: "carry",

    aliases: [
      "carry",
      "farmer carry",
      "loaded walk"
    ],

    equipment: [
      "dumbbell",
      "kettlebell",
      "trap bar",
      "sandbag"
    ],

    bodyRegions: [
      "grip",
      "traps",
      "core",
      "hips"
    ],

    primaryExpressions: [
      "work-capacity"
    ],

    secondaryExpressions: [
      "tissue-tolerance",
      "motor-control"
    ],

    measurableOutputs: [
      "load",
      "distance",
      "duration"
    ]
  },

  // Sled / Conditioning

  {
    id: "sled-push",
    name: "Sled Push",
    domain: "conditioning",
    family: "locomotion",

    aliases: [
      "prowler push",
      "sled drive"
    ],

    equipment: [
      "sled"
    ],

    bodyRegions: [
      "quads",
      "glutes",
      "calves",
      "trunk"
    ],

    primaryExpressions: [
      "work-capacity"
    ],

    secondaryExpressions: [
      "acceleration",
      "strength-endurance"
    ],

    measurableOutputs: [
      "load",
      "distance",
      "duration",
      "speed"
    ]
  },

  {
    id: "sled-drag",
    name: "Sled Drag",
    domain: "conditioning",
    family: "locomotion",

    aliases: [
      "backward sled drag",
      "sled pull"
    ],

    equipment: [
      "sled"
    ],

    bodyRegions: [
      "quads",
      "calves",
      "knees"
    ],

    primaryExpressions: [
      "tissue-tolerance"
    ],

    secondaryExpressions: [
      "work-capacity"
    ],

    measurableOutputs: [
      "load",
      "distance",
      "duration"
    ]
  },

  // Elastic / Plyometric

  {
    id: "pogo",
    name: "Pogo",
    domain: "plyometric",
    family: "hop",

    aliases: [
      "ankle pogo",
      "pogo jump",
      "pogo hops"
    ],

    equipment: [
      "bodyweight"
    ],

    bodyRegions: [
      "calves",
      "achilles",
      "ankles",
      "feet"
    ],

    primaryExpressions: [
      "elasticity"
    ],

    secondaryExpressions: [
      "reactive-strength",
      "tendon-capacity"
    ],

    measurableOutputs: [
      "contacts",
      "duration",
      "quality"
    ]
  },

  {
    id: "broad-jump",
    name: "Broad Jump",
    domain: "plyometric",
    family: "jump",

    aliases: [
      "standing broad jump",
      "horizontal jump"
    ],

    equipment: [
      "bodyweight"
    ],

    bodyRegions: [
      "glutes",
      "hamstrings",
      "quads",
      "calves"
    ],

    primaryExpressions: [
      "power"
    ],

    secondaryExpressions: [
      "reactive-strength",
      "coordination"
    ],

    measurableOutputs: [
      "distance",
      "reps",
      "quality"
    ]
  },

  {
    id: "drop-jump",
    name: "Drop Jump",
    domain: "plyometric",
    family: "jump",

    aliases: [
      "depth drop jump",
      "reactive jump"
    ],

    equipment: [
      "box",
      "bodyweight"
    ],

    bodyRegions: [
      "calves",
      "quads",
      "ankles",
      "feet"
    ],

    primaryExpressions: [
      "elasticity"
    ],

    secondaryExpressions: [
      "power",
      "tissue-tolerance"
    ],

    measurableOutputs: [
      "height",
      "contact-time",
      "rsi",
      "quality"
    ]
  },

  // Running / Speed

  {
    id: "sprint",
    name: "Sprint",
    domain: "running",
    family: "sprint",

    aliases: [
      "flat sprint",
      "max speed sprint",
      "acceleration sprint"
    ],

    equipment: [
      "bodyweight",
      "track",
      "field"
    ],

    bodyRegions: [
      "glutes",
      "hamstrings",
      "calves",
      "feet"
    ],

    primaryExpressions: [
      "speed"
    ],

    secondaryExpressions: [
      "power",
      "elasticity"
    ],

    measurableOutputs: [
      "distance",
      "time",
      "speed"
    ]
  },

  {
    id: "hill-sprint",
    name: "Hill Sprint",
    domain: "speed",
    family: "sprint",

    aliases: [
      "incline sprint",
      "uphill sprint"
    ],

    equipment: [
      "bodyweight",
      "hill"
    ],

    bodyRegions: [
      "glutes",
      "hamstrings",
      "calves",
      "feet"
    ],

    primaryExpressions: [
      "acceleration"
    ],

    secondaryExpressions: [
      "power",
      "tissue-tolerance"
    ],

    measurableOutputs: [
      "distance",
      "duration",
      "reps",
      "rest"
    ]
  },

  {
    id: "wicket-run",
    name: "Wicket Run",
    domain: "speed",
    family: "sprint",

    aliases: [
      "wickets",
      "mini hurdle run",
      "max velocity drill"
    ],

    equipment: [
      "wickets",
      "mini hurdles"
    ],

    bodyRegions: [
      "hips",
      "hamstrings",
      "calves",
      "feet"
    ],

    primaryExpressions: [
      "max-velocity"
    ],

    secondaryExpressions: [
      "coordination",
      "elasticity"
    ],

    measurableOutputs: [
      "distance",
      "spacing",
      "reps",
      "quality"
    ]
  },

  {
    id: "zone2-run",
    name: "Zone 2 Run",
    domain: "running",
    family: "locomotion",

    aliases: [
      "easy run",
      "aerobic run",
      "base run"
    ],

    equipment: [
      "bodyweight",
      "road",
      "trail",
      "treadmill"
    ],

    bodyRegions: [
      "heart",
      "lungs",
      "legs",
      "feet"
    ],

    primaryExpressions: [
      "aerobic-capacity"
    ],

    secondaryExpressions: [
      "tissue-tolerance"
    ],

    measurableOutputs: [
      "duration",
      "distance",
      "pace",
      "heart-rate"
    ]
  }

];