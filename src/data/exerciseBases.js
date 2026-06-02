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

,

// Home Training Expansion

{
  id: "pike-push-up",
  name: "Pike Push Up",
  domain: "calisthenics",
  family: "vertical-push",
  aliases: ["pike pushup"],
  equipment: ["bodyweight"],
  bodyRegions: ["shoulders", "triceps", "upper chest"],
  primaryExpressions: ["relative-strength"],
  secondaryExpressions: ["hypertrophy"],
  measurableOutputs: ["reps", "tempo"]
},

{
  id: "handstand-push-up",
  name: "Handstand Push Up",
  domain: "calisthenics",
  family: "vertical-push",
  aliases: ["hspu"],
  equipment: ["bodyweight", "wall"],
  bodyRegions: ["shoulders", "triceps", "core"],
  primaryExpressions: ["relative-strength"],
  secondaryExpressions: ["motor-control"],
  measurableOutputs: ["reps", "range"]
},

{
  id: "ring-row",
  name: "Ring Row",
  domain: "calisthenics",
  family: "horizontal-pull",
  aliases: ["gymnastic ring row"],
  equipment: ["rings"],
  bodyRegions: ["back", "arms", "grip"],
  primaryExpressions: ["relative-strength"],
  secondaryExpressions: ["hypertrophy"],
  measurableOutputs: ["reps", "body-angle"]
},

{
  id: "band-row",
  name: "Band Row",
  domain: "strength",
  family: "horizontal-pull",
  aliases: ["resistance band row"],
  equipment: ["band"],
  bodyRegions: ["back", "arms"],
  primaryExpressions: ["hypertrophy"],
  secondaryExpressions: ["strength-endurance"],
  measurableOutputs: ["reps", "band-tension"]
},

{
  id: "band-pulldown",
  name: "Band Pulldown",
  domain: "strength",
  family: "vertical-pull",
  aliases: ["resistance band pulldown"],
  equipment: ["band"],
  bodyRegions: ["back", "lats"],
  primaryExpressions: ["hypertrophy"],
  secondaryExpressions: ["motor-control"],
  measurableOutputs: ["reps", "band-tension"]
},

{
  id: "goblet-squat",
  name: "Goblet Squat",
  domain: "strength",
  family: "squat",
  aliases: ["kb squat", "db squat"],
  equipment: ["kettlebell", "dumbbell"],
  bodyRegions: ["quads", "glutes", "core"],
  primaryExpressions: ["hypertrophy"],
  secondaryExpressions: ["motor-control"],
  measurableOutputs: ["load", "reps"]
},

{
  id: "walking-lunge",
  name: "Walking Lunge",
  domain: "strength",
  family: "lunge",
  aliases: ["lunges"],
  equipment: ["bodyweight", "dumbbell", "barbell"],
  bodyRegions: ["quads", "glutes", "adductors"],
  primaryExpressions: ["hypertrophy"],
  secondaryExpressions: ["work-capacity"],
  measurableOutputs: ["load", "reps", "distance"]
},

{
  id: "single-leg-rdl",
  name: "Single Leg RDL",
  domain: "strength",
  family: "hinge",
  aliases: ["single leg romanian deadlift"],
  equipment: ["bodyweight", "dumbbell", "kettlebell"],
  bodyRegions: ["hamstrings", "glutes", "foot"],
  primaryExpressions: ["motor-control"],
  secondaryExpressions: ["hypertrophy"],
  measurableOutputs: ["load", "reps", "side"]
},

{
  id: "glute-bridge",
  name: "Glute Bridge",
  domain: "strength",
  family: "hinge",
  aliases: ["bridge"],
  equipment: ["bodyweight", "barbell"],
  bodyRegions: ["glutes", "hamstrings"],
  primaryExpressions: ["hypertrophy"],
  secondaryExpressions: ["tissue-tolerance"],
  measurableOutputs: ["load", "reps", "duration"]
},

{
  id: "wall-sit",
  name: "Wall Sit",
  domain: "resilience",
  family: "isometric",
  aliases: ["wall squat"],
  equipment: ["bodyweight", "wall"],
  bodyRegions: ["quads", "knees"],
  primaryExpressions: ["tissue-tolerance"],
  secondaryExpressions: ["strength-endurance"],
  measurableOutputs: ["duration"]
},

{
  id: "side-plank",
  name: "Side Plank",
  domain: "core",
  family: "anti-lateral-flexion",
  aliases: ["lateral plank"],
  equipment: ["bodyweight"],
  bodyRegions: ["obliques", "core", "hips"],
  primaryExpressions: ["motor-control"],
  secondaryExpressions: ["tissue-tolerance"],
  measurableOutputs: ["duration", "side"]
},

{
  id: "dead-bug",
  name: "Dead Bug",
  domain: "core",
  family: "anti-extension",
  aliases: ["deadbug"],
  equipment: ["bodyweight"],
  bodyRegions: ["core", "hips"],
  primaryExpressions: ["motor-control"],
  secondaryExpressions: ["coordination"],
  measurableOutputs: ["reps", "quality"]
},

{
  id: "hollow-hold",
  name: "Hollow Hold",
  domain: "core",
  family: "anti-extension",
  aliases: ["hollow body hold"],
  equipment: ["bodyweight"],
  bodyRegions: ["core", "hip flexors"],
  primaryExpressions: ["motor-control"],
  secondaryExpressions: ["relative-strength"],
  measurableOutputs: ["duration"]
},

{
  id: "bear-crawl",
  name: "Bear Crawl",
  domain: "conditioning",
  family: "locomotion",
  aliases: ["crawl"],
  equipment: ["bodyweight"],
  bodyRegions: ["shoulders", "core", "hips"],
  primaryExpressions: ["work-capacity"],
  secondaryExpressions: ["motor-control"],
  measurableOutputs: ["distance", "duration"]
},

{
  id: "burpee",
  name: "Burpee",
  domain: "conditioning",
  family: "full-body",
  aliases: ["squat thrust"],
  equipment: ["bodyweight"],
  bodyRegions: ["full body"],
  primaryExpressions: ["work-capacity"],
  secondaryExpressions: ["strength-endurance"],
  measurableOutputs: ["reps", "duration"]
},

{
  id: "mountain-climber",
  name: "Mountain Climber",
  domain: "conditioning",
  family: "core",
  aliases: ["mountain climbers"],
  equipment: ["bodyweight"],
  bodyRegions: ["core", "shoulders", "hip flexors"],
  primaryExpressions: ["work-capacity"],
  secondaryExpressions: ["motor-control"],
  measurableOutputs: ["reps", "duration"]
},

{
  id: "jump-squat",
  name: "Jump Squat",
  domain: "power",
  family: "jump",
  aliases: ["squat jump"],
  equipment: ["bodyweight", "dumbbell"],
  bodyRegions: ["quads", "glutes", "calves"],
  primaryExpressions: ["power"],
  secondaryExpressions: ["elasticity"],
  measurableOutputs: ["reps", "height"]
},

{
  id: "lateral-bound",
  name: "Lateral Bound",
  domain: "power",
  family: "jump",
  aliases: ["skater jump"],
  equipment: ["bodyweight"],
  bodyRegions: ["glutes", "adductors", "ankles"],
  primaryExpressions: ["power"],
  secondaryExpressions: ["motor-control"],
  measurableOutputs: ["distance", "reps"]
},

{
  id: "single-leg-pogo",
  name: "Single Leg Pogo",
  domain: "plyometric",
  family: "hop",
  aliases: ["single leg ankle hop"],
  equipment: ["bodyweight"],
  bodyRegions: ["calves", "achilles", "feet"],
  primaryExpressions: ["elasticity"],
  secondaryExpressions: ["tendon-capacity"],
  measurableOutputs: ["contacts", "duration"]
},

{
  id: "band-pull-apart",
  name: "Band Pull Apart",
  domain: "resilience",
  family: "horizontal-pull",
  aliases: ["pull apart"],
  equipment: ["band"],
  bodyRegions: ["rear delts", "upper back"],
  primaryExpressions: ["tissue-tolerance"],
  secondaryExpressions: ["motor-control"],
  measurableOutputs: ["reps"]
},

{
  id: "face-pull",
  name: "Face Pull",
  domain: "resilience",
  family: "horizontal-pull",
  aliases: ["cable face pull", "band face pull"],
  equipment: ["cable", "band"],
  bodyRegions: ["rear delts", "upper back", "rotator cuff"],
  primaryExpressions: ["tissue-tolerance"],
  secondaryExpressions: ["motor-control"],
  measurableOutputs: ["load", "reps"]
}

,

// Calisthenics Skill & Static Expansion

{
  id: "front-lever",
  name: "Front Lever",
  domain: "calisthenics",
  family: "static-hold",
  aliases: ["full front lever"],
  equipment: ["bar", "rings"],
  bodyRegions: ["lats", "core", "shoulders"],
  primaryExpressions: ["isometric-strength"],
  secondaryExpressions: ["relative-strength"],
  measurableOutputs: ["hold-duration", "quality"]
},

{
  id: "back-lever",
  name: "Back Lever",
  domain: "calisthenics",
  family: "static-hold",
  aliases: ["full back lever"],
  equipment: ["bar", "rings"],
  bodyRegions: ["shoulders", "back", "core"],
  primaryExpressions: ["isometric-strength"],
  secondaryExpressions: ["motor-control"],
  measurableOutputs: ["hold-duration", "quality"]
},

{
  id: "planche",
  name: "Planche",
  domain: "calisthenics",
  family: "static-hold",
  aliases: ["full planche"],
  equipment: ["floor", "parallettes"],
  bodyRegions: ["shoulders", "chest", "core"],
  primaryExpressions: ["relative-strength"],
  secondaryExpressions: ["isometric-strength"],
  measurableOutputs: ["hold-duration", "quality"]
},

{
  id: "handstand",
  name: "Handstand",
  domain: "calisthenics",
  family: "inversion",
  aliases: ["free handstand"],
  equipment: ["floor"],
  bodyRegions: ["shoulders", "core"],
  primaryExpressions: ["motor-control"],
  secondaryExpressions: ["isometric-strength"],
  measurableOutputs: ["hold-duration", "quality"]
},

{
  id: "l-sit",
  name: "L Sit",
  domain: "calisthenics",
  family: "static-hold",
  aliases: ["lsit"],
  equipment: ["floor", "parallettes", "dip bars"],
  bodyRegions: ["core", "hip flexors", "triceps"],
  primaryExpressions: ["isometric-strength"],
  secondaryExpressions: ["motor-control"],
  measurableOutputs: ["hold-duration"]
},

{
  id: "muscle-up",
  name: "Muscle Up",
  domain: "calisthenics",
  family: "vertical-pull",
  aliases: ["bar muscle up", "strict muscle up"],
  equipment: ["bar", "rings"],
  bodyRegions: ["back", "arms", "shoulders"],
  primaryExpressions: ["relative-strength"],
  secondaryExpressions: ["power"],
  measurableOutputs: ["reps", "external-load"]
},

{
  id: "archer-pull-up",
  name: "Archer Pull Up",
  domain: "calisthenics",
  family: "vertical-pull",
  aliases: ["archer pullup"],
  equipment: ["bar", "rings"],
  bodyRegions: ["back", "arms"],
  primaryExpressions: ["relative-strength"],
  secondaryExpressions: ["motor-control"],
  measurableOutputs: ["reps"]
},

{
  id: "typewriter-pull-up",
  name: "Typewriter Pull Up",
  domain: "calisthenics",
  family: "vertical-pull",
  aliases: ["typewriter pullup"],
  equipment: ["bar"],
  bodyRegions: ["back", "arms", "core"],
  primaryExpressions: ["motor-control"],
  secondaryExpressions: ["relative-strength"],
  measurableOutputs: ["reps"]
},

{
  id: "pseudo-planche-push-up",
  name: "Pseudo Planche Push Up",
  domain: "calisthenics",
  family: "horizontal-push",
  aliases: ["pppu"],
  equipment: ["floor"],
  bodyRegions: ["chest", "shoulders", "core"],
  primaryExpressions: ["relative-strength"],
  secondaryExpressions: ["planche-development"],
  measurableOutputs: ["reps"]
},

{
  id: "ring-dip",
  name: "Ring Dip",
  domain: "calisthenics",
  family: "vertical-push",
  aliases: ["gymnastic ring dip"],
  equipment: ["rings"],
  bodyRegions: ["chest", "triceps", "shoulders"],
  primaryExpressions: ["relative-strength"],
  secondaryExpressions: ["motor-control"],
  measurableOutputs: ["reps", "external-load"]
},

{
  id: "skin-the-cat",
  name: "Skin The Cat",
  domain: "calisthenics",
  family: "shoulder-mobility",
  aliases: ["german hang transition"],
  equipment: ["rings", "bar"],
  bodyRegions: ["shoulders", "back", "core"],
  primaryExpressions: ["mobility"],
  secondaryExpressions: ["motor-control"],
  measurableOutputs: ["reps", "range"]
},

{
  id: "german-hang",
  name: "German Hang",
  domain: "calisthenics",
  family: "shoulder-mobility",
  aliases: ["back shoulder stretch"],
  equipment: ["rings", "bar"],
  bodyRegions: ["shoulders", "chest"],
  primaryExpressions: ["mobility"],
  secondaryExpressions: ["tissue-tolerance"],
  measurableOutputs: ["duration"]
}

,

// Powerlifting Expansion

{
  id: "front-squat",
  name: "Front Squat",
  domain: "powerlifting",
  family: "squat",
  aliases: ["olympic squat"],
  equipment: ["barbell"],
  bodyRegions: ["quads", "upper back", "core"],
  primaryExpressions: ["max-strength"],
  secondaryExpressions: ["motor-control"],
  measurableOutputs: ["load", "reps", "rpe"]
},

{
  id: "pause-squat",
  name: "Pause Squat",
  domain: "powerlifting",
  family: "squat",
  aliases: ["paused squat"],
  equipment: ["barbell"],
  bodyRegions: ["quads", "glutes", "core"],
  primaryExpressions: ["max-strength"],
  secondaryExpressions: ["motor-control"],
  measurableOutputs: ["load", "reps", "pause-duration"]
},

{
  id: "box-squat",
  name: "Box Squat",
  domain: "powerlifting",
  family: "squat",
  aliases: ["westside box squat"],
  equipment: ["barbell", "box"],
  bodyRegions: ["glutes", "hamstrings", "quads"],
  primaryExpressions: ["max-strength"],
  secondaryExpressions: ["power"],
  measurableOutputs: ["load", "reps"]
},

{
  id: "safety-bar-squat",
  name: "Safety Bar Squat",
  domain: "powerlifting",
  family: "squat",
  aliases: ["ssb squat"],
  equipment: ["safety squat bar"],
  bodyRegions: ["quads", "upper back", "core"],
  primaryExpressions: ["max-strength"],
  secondaryExpressions: ["hypertrophy"],
  measurableOutputs: ["load", "reps", "rpe"]
},

{
  id: "pin-squat",
  name: "Pin Squat",
  domain: "powerlifting",
  family: "squat",
  aliases: ["rack squat"],
  equipment: ["barbell", "rack"],
  bodyRegions: ["quads", "glutes"],
  primaryExpressions: ["max-strength"],
  secondaryExpressions: ["starting-strength"],
  measurableOutputs: ["load", "reps"]
},

{
  id: "spoto-press",
  name: "Spoto Press",
  domain: "powerlifting",
  family: "horizontal-push",
  aliases: ["spoto bench"],
  equipment: ["barbell", "bench"],
  bodyRegions: ["chest", "triceps"],
  primaryExpressions: ["max-strength"],
  secondaryExpressions: ["motor-control"],
  measurableOutputs: ["load", "reps"]
},

{
  id: "close-grip-bench-press",
  name: "Close Grip Bench Press",
  domain: "powerlifting",
  family: "horizontal-push",
  aliases: ["cgbp"],
  equipment: ["barbell", "bench"],
  bodyRegions: ["triceps", "chest"],
  primaryExpressions: ["max-strength"],
  secondaryExpressions: ["hypertrophy"],
  measurableOutputs: ["load", "reps"]
},

{
  id: "board-press",
  name: "Board Press",
  domain: "powerlifting",
  family: "horizontal-push",
  aliases: ["2 board press", "3 board press"],
  equipment: ["barbell", "bench"],
  bodyRegions: ["triceps", "chest"],
  primaryExpressions: ["max-strength"],
  secondaryExpressions: ["lockout-strength"],
  measurableOutputs: ["load", "reps"]
},

{
  id: "pin-press",
  name: "Pin Press",
  domain: "powerlifting",
  family: "horizontal-push",
  aliases: ["rack press"],
  equipment: ["barbell", "rack"],
  bodyRegions: ["chest", "triceps"],
  primaryExpressions: ["starting-strength"],
  secondaryExpressions: ["max-strength"],
  measurableOutputs: ["load", "reps"]
},

{
  id: "deficit-deadlift",
  name: "Deficit Deadlift",
  domain: "powerlifting",
  family: "hinge",
  aliases: ["standing deficit deadlift"],
  equipment: ["barbell", "plate"],
  bodyRegions: ["hamstrings", "glutes", "back"],
  primaryExpressions: ["max-strength"],
  secondaryExpressions: ["starting-strength"],
  measurableOutputs: ["load", "reps"]
},

{
  id: "block-pull",
  name: "Block Pull",
  domain: "powerlifting",
  family: "hinge",
  aliases: ["elevated deadlift"],
  equipment: ["barbell", "blocks"],
  bodyRegions: ["back", "glutes"],
  primaryExpressions: ["lockout-strength"],
  secondaryExpressions: ["max-strength"],
  measurableOutputs: ["load", "reps"]
},

{
  id: "rack-pull",
  name: "Rack Pull",
  domain: "powerlifting",
  family: "hinge",
  aliases: ["high pull deadlift"],
  equipment: ["barbell", "rack"],
  bodyRegions: ["back", "traps", "glutes"],
  primaryExpressions: ["lockout-strength"],
  secondaryExpressions: ["hypertrophy"],
  measurableOutputs: ["load", "reps"]
},

{
  id: "good-morning",
  name: "Good Morning",
  domain: "powerlifting",
  family: "hinge",
  aliases: ["barbell good morning"],
  equipment: ["barbell"],
  bodyRegions: ["hamstrings", "glutes", "spinal erectors"],
  primaryExpressions: ["hypertrophy"],
  secondaryExpressions: ["tissue-tolerance"],
  measurableOutputs: ["load", "reps"]
},

{
  id: "paused-deadlift",
  name: "Paused Deadlift",
  domain: "powerlifting",
  family: "hinge",
  aliases: ["pause deadlift"],
  equipment: ["barbell"],
  bodyRegions: ["hamstrings", "glutes", "back"],
  primaryExpressions: ["max-strength"],
  secondaryExpressions: ["motor-control"],
  measurableOutputs: ["load", "reps", "pause-duration"]
}

,

// Olympic Weightlifting

{
  id: "snatch",
  name: "Snatch",
  domain: "weightlifting",
  family: "olympic-lift",
  aliases: ["full snatch"],
  equipment: ["barbell"],
  bodyRegions: ["full body"],
  primaryExpressions: ["power"],
  secondaryExpressions: ["coordination", "mobility"],
  measurableOutputs: ["load", "reps", "velocity"]
},

{
  id: "clean-and-jerk",
  name: "Clean and Jerk",
  domain: "weightlifting",
  family: "olympic-lift",
  aliases: ["c&j"],
  equipment: ["barbell"],
  bodyRegions: ["full body"],
  primaryExpressions: ["power"],
  secondaryExpressions: ["coordination", "max-strength"],
  measurableOutputs: ["load", "reps", "velocity"]
},

{
  id: "power-snatch",
  name: "Power Snatch",
  domain: "weightlifting",
  family: "olympic-lift",
  aliases: ["high catch snatch"],
  equipment: ["barbell"],
  bodyRegions: ["full body"],
  primaryExpressions: ["power"],
  secondaryExpressions: ["speed"],
  measurableOutputs: ["load", "reps", "velocity"]
},

{
  id: "hang-snatch",
  name: "Hang Snatch",
  domain: "weightlifting",
  family: "olympic-lift",
  aliases: ["hang power snatch"],
  equipment: ["barbell"],
  bodyRegions: ["posterior chain", "upper back"],
  primaryExpressions: ["power"],
  secondaryExpressions: ["coordination"],
  measurableOutputs: ["load", "reps"]
},

{
  id: "snatch-pull",
  name: "Snatch Pull",
  domain: "weightlifting",
  family: "olympic-pull",
  aliases: ["pull for snatch"],
  equipment: ["barbell"],
  bodyRegions: ["posterior chain", "traps"],
  primaryExpressions: ["power"],
  secondaryExpressions: ["max-strength"],
  measurableOutputs: ["load", "reps", "velocity"]
},

{
  id: "snatch-balance",
  name: "Snatch Balance",
  domain: "weightlifting",
  family: "overhead-squat",
  aliases: ["drop snatch"],
  equipment: ["barbell"],
  bodyRegions: ["shoulders", "upper back", "quads"],
  primaryExpressions: ["coordination"],
  secondaryExpressions: ["mobility"],
  measurableOutputs: ["load", "reps"]
},

{
  id: "overhead-squat",
  name: "Overhead Squat",
  domain: "weightlifting",
  family: "squat",
  aliases: ["ohs"],
  equipment: ["barbell"],
  bodyRegions: ["shoulders", "quads", "core"],
  primaryExpressions: ["mobility"],
  secondaryExpressions: ["motor-control"],
  measurableOutputs: ["load", "reps"]
},

{
  id: "clean",
  name: "Clean",
  domain: "weightlifting",
  family: "olympic-lift",
  aliases: ["full clean"],
  equipment: ["barbell"],
  bodyRegions: ["full body"],
  primaryExpressions: ["power"],
  secondaryExpressions: ["coordination"],
  measurableOutputs: ["load", "reps", "velocity"]
},

{
  id: "power-clean",
  name: "Power Clean",
  domain: "weightlifting",
  family: "olympic-lift",
  aliases: ["high catch clean"],
  equipment: ["barbell"],
  bodyRegions: ["posterior chain", "traps"],
  primaryExpressions: ["power"],
  secondaryExpressions: ["speed"],
  measurableOutputs: ["load", "reps", "velocity"]
},

{
  id: "hang-clean",
  name: "Hang Clean",
  domain: "weightlifting",
  family: "olympic-lift",
  aliases: ["hang power clean"],
  equipment: ["barbell"],
  bodyRegions: ["posterior chain", "upper back"],
  primaryExpressions: ["power"],
  secondaryExpressions: ["coordination"],
  measurableOutputs: ["load", "reps"]
},

{
  id: "clean-pull",
  name: "Clean Pull",
  domain: "weightlifting",
  family: "olympic-pull",
  aliases: ["pull for clean"],
  equipment: ["barbell"],
  bodyRegions: ["posterior chain", "traps"],
  primaryExpressions: ["power"],
  secondaryExpressions: ["max-strength"],
  measurableOutputs: ["load", "reps", "velocity"]
},

{
  id: "jerk",
  name: "Jerk",
  domain: "weightlifting",
  family: "olympic-lift",
  aliases: ["split jerk"],
  equipment: ["barbell"],
  bodyRegions: ["shoulders", "legs", "core"],
  primaryExpressions: ["power"],
  secondaryExpressions: ["coordination"],
  measurableOutputs: ["load", "reps"]
},

{
  id: "push-jerk",
  name: "Push Jerk",
  domain: "weightlifting",
  family: "olympic-lift",
  aliases: ["power jerk"],
  equipment: ["barbell"],
  bodyRegions: ["shoulders", "legs", "core"],
  primaryExpressions: ["power"],
  secondaryExpressions: ["speed"],
  measurableOutputs: ["load", "reps"]
},

{
  id: "push-press",
  name: "Push Press",
  domain: "weightlifting",
  family: "vertical-push",
  aliases: ["leg drive press"],
  equipment: ["barbell", "dumbbell"],
  bodyRegions: ["shoulders", "triceps", "legs"],
  primaryExpressions: ["power"],
  secondaryExpressions: ["max-strength"],
  measurableOutputs: ["load", "reps", "velocity"]
},

{
  id: "tall-clean",
  name: "Tall Clean",
  domain: "weightlifting",
  family: "technique-drill",
  aliases: ["clean turnover drill"],
  equipment: ["barbell"],
  bodyRegions: ["upper back", "hips"],
  primaryExpressions: ["coordination"],
  secondaryExpressions: ["motor-control"],
  measurableOutputs: ["load", "reps", "quality"]
},

{
  id: "tall-snatch",
  name: "Tall Snatch",
  domain: "weightlifting",
  family: "technique-drill",
  aliases: ["snatch turnover drill"],
  equipment: ["barbell"],
  bodyRegions: ["upper back", "shoulders"],
  primaryExpressions: ["coordination"],
  secondaryExpressions: ["motor-control"],
  measurableOutputs: ["load", "reps", "quality"]
}

,

// Strongman

{
  id: "farmers-walk",
  name: "Farmers Walk",
  domain: "strongman",
  family: "carry",
  aliases: ["farmers carry", "farmer carry"],
  equipment: ["farmers handles", "dumbbell", "trap bar"],
  bodyRegions: ["grip", "traps", "core", "hips"],
  primaryExpressions: ["work-capacity"],
  secondaryExpressions: ["max-strength", "tissue-tolerance"],
  measurableOutputs: ["load", "distance", "duration"]
},

{
  id: "yoke-walk",
  name: "Yoke Walk",
  domain: "strongman",
  family: "carry",
  aliases: ["yoke carry"],
  equipment: ["yoke"],
  bodyRegions: ["traps", "core", "hips", "legs"],
  primaryExpressions: ["max-strength"],
  secondaryExpressions: ["work-capacity"],
  measurableOutputs: ["load", "distance", "time"]
},

{
  id: "sandbag-carry",
  name: "Sandbag Carry",
  domain: "strongman",
  family: "carry",
  aliases: ["bear hug carry"],
  equipment: ["sandbag"],
  bodyRegions: ["core", "arms", "upper back", "legs"],
  primaryExpressions: ["work-capacity"],
  secondaryExpressions: ["tissue-tolerance"],
  measurableOutputs: ["load", "distance", "duration"]
},

{
  id: "sandbag-load",
  name: "Sandbag Load",
  domain: "strongman",
  family: "loading",
  aliases: ["sandbag over bar"],
  equipment: ["sandbag"],
  bodyRegions: ["full body"],
  primaryExpressions: ["power"],
  secondaryExpressions: ["work-capacity"],
  measurableOutputs: ["load", "reps", "height"]
},

{
  id: "atlas-stone-load",
  name: "Atlas Stone Load",
  domain: "strongman",
  family: "loading",
  aliases: ["stone load"],
  equipment: ["atlas stone"],
  bodyRegions: ["posterior chain", "arms", "upper back"],
  primaryExpressions: ["power"],
  secondaryExpressions: ["max-strength"],
  measurableOutputs: ["load", "reps", "height"]
},

{
  id: "atlas-stone-carry",
  name: "Atlas Stone Carry",
  domain: "strongman",
  family: "carry",
  aliases: ["stone carry"],
  equipment: ["atlas stone"],
  bodyRegions: ["arms", "core", "upper back", "legs"],
  primaryExpressions: ["work-capacity"],
  secondaryExpressions: ["max-strength"],
  measurableOutputs: ["load", "distance", "duration"]
},

{
  id: "stone-over-bar",
  name: "Stone Over Bar",
  domain: "strongman",
  family: "loading",
  aliases: ["atlas stone over bar"],
  equipment: ["atlas stone"],
  bodyRegions: ["full body"],
  primaryExpressions: ["power"],
  secondaryExpressions: ["coordination"],
  measurableOutputs: ["load", "reps", "bar-height"]
},

{
  id: "log-press",
  name: "Log Press",
  domain: "strongman",
  family: "vertical-push",
  aliases: ["log clean and press"],
  equipment: ["log"],
  bodyRegions: ["shoulders", "triceps", "upper back"],
  primaryExpressions: ["max-strength"],
  secondaryExpressions: ["power"],
  measurableOutputs: ["load", "reps"]
},

{
  id: "axle-press",
  name: "Axle Press",
  domain: "strongman",
  family: "vertical-push",
  aliases: ["axle clean and press"],
  equipment: ["axle bar"],
  bodyRegions: ["shoulders", "triceps", "grip"],
  primaryExpressions: ["max-strength"],
  secondaryExpressions: ["power"],
  measurableOutputs: ["load", "reps"]
},

{
  id: "viking-press",
  name: "Viking Press",
  domain: "strongman",
  family: "vertical-push",
  aliases: ["viking machine press"],
  equipment: ["viking press"],
  bodyRegions: ["shoulders", "triceps"],
  primaryExpressions: ["strength-endurance"],
  secondaryExpressions: ["hypertrophy"],
  measurableOutputs: ["load", "reps"]
},

{
  id: "circus-dumbbell",
  name: "Circus Dumbbell",
  domain: "strongman",
  family: "vertical-push",
  aliases: ["circus db press"],
  equipment: ["circus dumbbell"],
  bodyRegions: ["shoulders", "triceps", "core"],
  primaryExpressions: ["power"],
  secondaryExpressions: ["motor-control"],
  measurableOutputs: ["load", "reps"]
},

{
  id: "frame-carry",
  name: "Frame Carry",
  domain: "strongman",
  family: "carry",
  aliases: ["frame walk"],
  equipment: ["frame"],
  bodyRegions: ["grip", "traps", "core"],
  primaryExpressions: ["work-capacity"],
  secondaryExpressions: ["max-strength"],
  measurableOutputs: ["load", "distance", "time"]
},

{
  id: "sled-pull",
  name: "Sled Pull",
  domain: "strongman",
  family: "drag",
  aliases: ["rope sled pull"],
  equipment: ["sled", "rope"],
  bodyRegions: ["back", "arms", "legs"],
  primaryExpressions: ["work-capacity"],
  secondaryExpressions: ["max-strength"],
  measurableOutputs: ["load", "distance", "duration"]
},

{
  id: "truck-pull",
  name: "Truck Pull",
  domain: "strongman",
  family: "drag",
  aliases: ["vehicle pull"],
  equipment: ["harness", "rope", "vehicle"],
  bodyRegions: ["full body"],
  primaryExpressions: ["work-capacity"],
  secondaryExpressions: ["max-strength"],
  measurableOutputs: ["distance", "duration"]
},

{
  id: "wheelbarrow-race",
  name: "Wheelbarrow Race",
  domain: "strongman",
  family: "carry",
  aliases: ["wheelbarrow push"],
  equipment: ["wheelbarrow"],
  bodyRegions: ["grip", "traps", "legs", "core"],
  primaryExpressions: ["work-capacity"],
  secondaryExpressions: ["power"],
  measurableOutputs: ["distance", "duration"]
},

{
  id: "keg-load",
  name: "Keg Load",
  domain: "strongman",
  family: "loading",
  aliases: ["beer keg load"],
  equipment: ["keg"],
  bodyRegions: ["full body"],
  primaryExpressions: ["power"],
  secondaryExpressions: ["coordination"],
  measurableOutputs: ["load", "reps", "height"]
},

{
  id: "keg-carry",
  name: "Keg Carry",
  domain: "strongman",
  family: "carry",
  aliases: ["bear hug keg carry"],
  equipment: ["keg"],
  bodyRegions: ["arms", "core", "legs"],
  primaryExpressions: ["work-capacity"],
  secondaryExpressions: ["tissue-tolerance"],
  measurableOutputs: ["load", "distance", "duration"]
},

{
  id: "husafell-carry",
  name: "Husafell Carry",
  domain: "strongman",
  family: "carry",
  aliases: ["husafell stone carry"],
  equipment: ["husafell stone", "sandbag"],
  bodyRegions: ["core", "arms", "upper back", "legs"],
  primaryExpressions: ["work-capacity"],
  secondaryExpressions: ["max-strength"],
  measurableOutputs: ["load", "distance", "duration"]
},

{
  id: "conan-wheel",
  name: "Conan Wheel",
  domain: "strongman",
  family: "carry",
  aliases: ["conan's wheel"],
  equipment: ["conan wheel"],
  bodyRegions: ["core", "obliques", "legs"],
  primaryExpressions: ["work-capacity"],
  secondaryExpressions: ["tissue-tolerance"],
  measurableOutputs: ["distance", "duration"]
}

,

// Endurance Athlete Expansion

{
  id: "tempo-run",
  name: "Tempo Run",
  domain: "endurance",
  family: "running",
  aliases: ["threshold run", "comfortably hard run"],
  equipment: ["road", "track", "trail", "treadmill"],
  bodyRegions: ["heart", "lungs", "legs"],
  primaryExpressions: ["lactate-threshold"],
  secondaryExpressions: ["aerobic-capacity"],
  measurableOutputs: ["duration", "distance", "pace", "heart-rate"]
},

{
  id: "interval-run",
  name: "Interval Run",
  domain: "endurance",
  family: "running",
  aliases: ["repeats", "intervals"],
  equipment: ["track", "road", "treadmill"],
  bodyRegions: ["heart", "lungs", "legs"],
  primaryExpressions: ["vo2max"],
  secondaryExpressions: ["speed-endurance"],
  measurableOutputs: ["distance", "time", "rest", "pace"]
},

{
  id: "hill-repeat",
  name: "Hill Repeat",
  domain: "endurance",
  family: "running",
  aliases: ["hill reps", "hill intervals"],
  equipment: ["hill"],
  bodyRegions: ["glutes", "hamstrings", "calves"],
  primaryExpressions: ["vo2max"],
  secondaryExpressions: ["strength-endurance"],
  measurableOutputs: ["distance", "time", "reps"]
},

{
  id: "stride",
  name: "Stride",
  domain: "endurance",
  family: "running",
  aliases: ["strides"],
  equipment: ["track", "grass", "road"],
  bodyRegions: ["legs", "feet"],
  primaryExpressions: ["running-economy"],
  secondaryExpressions: ["speed"],
  measurableOutputs: ["distance", "time", "reps"]
},

{
  id: "trail-run",
  name: "Trail Run",
  domain: "endurance",
  family: "locomotion",
  aliases: ["off road run"],
  equipment: ["trail"],
  bodyRegions: ["heart", "lungs", "legs", "feet"],
  primaryExpressions: ["aerobic-capacity"],
  secondaryExpressions: ["tissue-tolerance"],
  measurableOutputs: ["distance", "duration", "elevation-gain"]
},

{
  id: "long-run",
  name: "Long Run",
  domain: "endurance",
  family: "locomotion",
  aliases: ["weekly long run"],
  equipment: ["road", "trail"],
  bodyRegions: ["heart", "lungs", "legs"],
  primaryExpressions: ["aerobic-capacity"],
  secondaryExpressions: ["fatigue-resistance"],
  measurableOutputs: ["distance", "duration", "heart-rate"]
},

{
  id: "ruck",
  name: "Ruck",
  domain: "endurance",
  family: "locomotion",
  aliases: ["ruck march", "weighted hike"],
  equipment: ["rucksack", "backpack"],
  bodyRegions: ["feet", "legs", "core"],
  primaryExpressions: ["work-capacity"],
  secondaryExpressions: ["tissue-tolerance"],
  measurableOutputs: ["distance", "duration", "load", "elevation-gain"]
},

{
  id: "hike",
  name: "Hike",
  domain: "endurance",
  family: "locomotion",
  aliases: ["mountain hike", "trek"],
  equipment: ["trail"],
  bodyRegions: ["feet", "legs", "heart"],
  primaryExpressions: ["aerobic-capacity"],
  secondaryExpressions: ["tissue-tolerance"],
  measurableOutputs: ["distance", "duration", "elevation-gain"]
},

{
  id: "stair-climb",
  name: "Stair Climb",
  domain: "endurance",
  family: "locomotion",
  aliases: ["stairs", "step climbing"],
  equipment: ["stairs", "stepmill"],
  bodyRegions: ["quads", "glutes", "calves"],
  primaryExpressions: ["work-capacity"],
  secondaryExpressions: ["aerobic-capacity"],
  measurableOutputs: ["floors", "duration", "heart-rate"]
},

{
  id: "cycling",
  name: "Cycling",
  domain: "endurance",
  family: "cycling",
  aliases: ["bike ride", "ride"],
  equipment: ["bike", "indoor trainer"],
  bodyRegions: ["quads", "glutes", "heart"],
  primaryExpressions: ["aerobic-capacity"],
  secondaryExpressions: ["fatigue-resistance"],
  measurableOutputs: ["distance", "duration", "power", "heart-rate"]
},

{
  id: "tempo-ride",
  name: "Tempo Ride",
  domain: "endurance",
  family: "cycling",
  aliases: ["sweet spot ride"],
  equipment: ["bike", "indoor trainer"],
  bodyRegions: ["quads", "glutes"],
  primaryExpressions: ["lactate-threshold"],
  secondaryExpressions: ["aerobic-capacity"],
  measurableOutputs: ["duration", "power", "heart-rate"]
},

{
  id: "vo2-bike-interval",
  name: "VO2 Bike Interval",
  domain: "endurance",
  family: "cycling",
  aliases: ["bike intervals"],
  equipment: ["bike", "indoor trainer"],
  bodyRegions: ["heart", "lungs", "legs"],
  primaryExpressions: ["vo2max"],
  secondaryExpressions: ["power"],
  measurableOutputs: ["power", "duration", "rest"]
},

{
  id: "swim",
  name: "Swim",
  domain: "endurance",
  family: "swimming",
  aliases: ["freestyle swim"],
  equipment: ["pool", "open water"],
  bodyRegions: ["lats", "shoulders", "heart"],
  primaryExpressions: ["aerobic-capacity"],
  secondaryExpressions: ["technique"],
  measurableOutputs: ["distance", "duration", "pace"]
},

{
  id: "open-water-swim",
  name: "Open Water Swim",
  domain: "endurance",
  family: "swimming",
  aliases: ["ows"],
  equipment: ["lake", "sea", "river"],
  bodyRegions: ["lats", "shoulders", "heart"],
  primaryExpressions: ["aerobic-capacity"],
  secondaryExpressions: ["tissue-tolerance"],
  measurableOutputs: ["distance", "duration", "pace"]
}

,

// Plyometric & Athletic Development

{
  id: "countermovement-jump",
  name: "Countermovement Jump",
  domain: "athletic-development",
  family: "jump",
  aliases: ["cmj", "vertical jump"],
  equipment: ["bodyweight"],
  bodyRegions: ["quads", "glutes", "calves"],
  primaryExpressions: ["power"],
  secondaryExpressions: ["coordination"],
  measurableOutputs: ["jump-height", "reps", "rsi"]
},

{
  id: "squat-jump",
  name: "Squat Jump",
  domain: "athletic-development",
  family: "jump",
  aliases: ["static jump"],
  equipment: ["bodyweight"],
  bodyRegions: ["quads", "glutes"],
  primaryExpressions: ["concentric-power"],
  secondaryExpressions: ["power"],
  measurableOutputs: ["jump-height", "reps"]
},

{
  id: "depth-jump",
  name: "Depth Jump",
  domain: "athletic-development",
  family: "jump",
  aliases: ["shock jump"],
  equipment: ["box"],
  bodyRegions: ["calves", "achilles", "feet"],
  primaryExpressions: ["reactive-strength"],
  secondaryExpressions: ["elasticity"],
  measurableOutputs: ["jump-height", "contact-time", "rsi"]
},

{
  id: "drop-landing",
  name: "Drop Landing",
  domain: "athletic-development",
  family: "landing",
  aliases: ["stick landing"],
  equipment: ["box"],
  bodyRegions: ["ankles", "knees", "hips"],
  primaryExpressions: ["deceleration"],
  secondaryExpressions: ["motor-control"],
  measurableOutputs: ["landing-quality", "height"]
},

{
  id: "snap-down",
  name: "Snap Down",
  domain: "athletic-development",
  family: "landing",
  aliases: ["athletic snap down"],
  equipment: ["bodyweight"],
  bodyRegions: ["hips", "knees", "ankles"],
  primaryExpressions: ["deceleration"],
  secondaryExpressions: ["coordination"],
  measurableOutputs: ["reps", "quality"]
},

{
  id: "repeated-hurdle-hop",
  name: "Repeated Hurdle Hop",
  domain: "athletic-development",
  family: "hop",
  aliases: ["hurdle hop"],
  equipment: ["mini hurdles"],
  bodyRegions: ["calves", "achilles"],
  primaryExpressions: ["reactive-strength"],
  secondaryExpressions: ["elasticity"],
  measurableOutputs: ["contacts", "height"]
},

{
  id: "single-leg-hop",
  name: "Single Leg Hop",
  domain: "athletic-development",
  family: "hop",
  aliases: ["single leg jump"],
  equipment: ["bodyweight"],
  bodyRegions: ["foot", "ankle", "calf"],
  primaryExpressions: ["elasticity"],
  secondaryExpressions: ["tissue-tolerance"],
  measurableOutputs: ["distance", "contacts"]
},

{
  id: "triple-hop",
  name: "Triple Hop",
  domain: "athletic-development",
  family: "bound",
  aliases: ["three hop test"],
  equipment: ["bodyweight"],
  bodyRegions: ["glutes", "hamstrings", "calves"],
  primaryExpressions: ["horizontal-power"],
  secondaryExpressions: ["elasticity"],
  measurableOutputs: ["distance"]
},

{
  id: "bound",
  name: "Bound",
  domain: "athletic-development",
  family: "bound",
  aliases: ["running bound"],
  equipment: ["bodyweight"],
  bodyRegions: ["hips", "hamstrings", "calves"],
  primaryExpressions: ["elasticity"],
  secondaryExpressions: ["horizontal-power"],
  measurableOutputs: ["distance", "contacts"]
},

{
  id: "alternate-bound",
  name: "Alternate Bound",
  domain: "athletic-development",
  family: "bound",
  aliases: ["alternating bound"],
  equipment: ["bodyweight"],
  bodyRegions: ["hips", "glutes", "calves"],
  primaryExpressions: ["elasticity"],
  secondaryExpressions: ["coordination"],
  measurableOutputs: ["distance", "contacts"]
},

{
  id: "lateral-bound-series",
  name: "Lateral Bound Series",
  domain: "athletic-development",
  family: "lateral-power",
  aliases: ["skater series"],
  equipment: ["bodyweight"],
  bodyRegions: ["glute med", "adductors", "ankles"],
  primaryExpressions: ["lateral-power"],
  secondaryExpressions: ["deceleration"],
  measurableOutputs: ["distance", "reps"]
},

{
  id: "box-jump",
  name: "Box Jump",
  domain: "athletic-development",
  family: "jump",
  aliases: ["jump to box"],
  equipment: ["box"],
  bodyRegions: ["glutes", "quads", "calves"],
  primaryExpressions: ["power"],
  secondaryExpressions: ["coordination"],
  measurableOutputs: ["height", "reps"]
},

{
  id: "depth-drop",
  name: "Depth Drop",
  domain: "athletic-development",
  family: "landing",
  aliases: ["drop off box"],
  equipment: ["box"],
  bodyRegions: ["ankles", "knees", "hips"],
  primaryExpressions: ["deceleration"],
  secondaryExpressions: ["tissue-tolerance"],
  measurableOutputs: ["height", "landing-quality"]
},

{
  id: "seated-box-jump",
  name: "Seated Box Jump",
  domain: "athletic-development",
  family: "jump",
  aliases: ["dead start jump"],
  equipment: ["box", "bench"],
  bodyRegions: ["glutes", "quads"],
  primaryExpressions: ["concentric-power"],
  secondaryExpressions: ["power"],
  measurableOutputs: ["height", "reps"]
},

{
  id: "approach-jump",
  name: "Approach Jump",
  domain: "athletic-development",
  family: "jump",
  aliases: ["running vertical jump"],
  equipment: ["bodyweight"],
  bodyRegions: ["glutes", "calves", "hamstrings"],
  primaryExpressions: ["power"],
  secondaryExpressions: ["coordination"],
  measurableOutputs: ["jump-height", "reach-height"]
},

{
  id: "ankling",
  name: "Ankling",
  domain: "athletic-development",
  family: "running-drill",
  aliases: ["ankle dribble"],
  equipment: ["bodyweight"],
  bodyRegions: ["feet", "ankles", "calves"],
  primaryExpressions: ["running-economy"],
  secondaryExpressions: ["elasticity"],
  measurableOutputs: ["distance", "quality"]
},

{
  id: "a-skip",
  name: "A Skip",
  domain: "athletic-development",
  family: "running-drill",
  aliases: ["a-skip drill"],
  equipment: ["bodyweight"],
  bodyRegions: ["hips", "feet", "core"],
  primaryExpressions: ["coordination"],
  secondaryExpressions: ["running-economy"],
  measurableOutputs: ["distance", "quality"]
},

{
  id: "b-skip",
  name: "B Skip",
  domain: "athletic-development",
  family: "running-drill",
  aliases: ["b-skip drill"],
  equipment: ["bodyweight"],
  bodyRegions: ["hips", "hamstrings", "feet"],
  primaryExpressions: ["coordination"],
  secondaryExpressions: ["running-economy"],
  measurableOutputs: ["distance", "quality"]
}

];