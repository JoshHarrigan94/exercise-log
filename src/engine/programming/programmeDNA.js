const PROGRAMME_DNA = {
  "five-three-one": {
    id: "five-three-one",
    name: "5/3/1 style",
    progressionModel: "slow-wave-strength",
    primaryIntent: "build long-term maximal strength with submaximal repeatability",
    coreSignals: [
      "main lift emphasis",
      "top set or AMRAP exposure",
      "assistance volume",
      "slow progression"
    ],
    preferredAdjustments: [
      "increase training max slowly",
      "hold assistance volume stable",
      "avoid aggressive jumps after one good day"
    ],
    riskFlags: [
      "high RPE too often",
      "missed top set",
      "assistance volume overwhelming main lift recovery"
    ]
  },

  "madcow": {
    id: "madcow",
    name: "Madcow style",
    progressionModel: "linear-ramping-strength",
    primaryIntent: "build strength through repeated ramping exposure",
    coreSignals: [
      "5x5 structure",
      "ramping sets",
      "weekly progression",
      "compound lift focus"
    ],
    preferredAdjustments: [
      "add small load if all prescribed work is completed",
      "repeat week if missed",
      "avoid adding extra volume unnecessarily"
    ],
    riskFlags: [
      "repeated missed final sets",
      "load jumps too aggressive",
      "accumulated fatigue across compound lifts"
    ]
  },

  "sbd-powerlifting": {
    id: "sbd-powerlifting",
    name: "SBD / powerlifting style",
    progressionModel: "specific-strength",
    primaryIntent: "improve squat, bench and deadlift performance through specific exposure",
    coreSignals: [
      "squat bench deadlift specificity",
      "load progression",
      "top sets and back-off work",
      "competition movement priority"
    ],
    preferredAdjustments: [
      "progress the competition lift if execution is strong",
      "adjust back-off volume before changing main lift intensity",
      "preserve movement specificity"
    ],
    riskFlags: [
      "high RPE across multiple main lifts",
      "missed reps on competition movement",
      "large technique deviation under load"
    ]
  },

  "triphasic": {
    id: "triphasic",
    name: "Triphasic style",
    progressionModel: "phase-based-power",
    primaryIntent: "develop force expression through eccentric, isometric and concentric phases",
    coreSignals: [
      "eccentric emphasis",
      "isometric emphasis",
      "concentric power",
      "explosive transfer"
    ],
    preferredAdjustments: [
      "progress phase exposure before adding volume",
      "prioritise intent and quality",
      "keep fatigue low enough for power expression"
    ],
    riskFlags: [
      "slow reps where explosive intent is needed",
      "excessive soreness",
      "loss of stiffness or position"
    ]
  },

  "bodybuilding": {
    id: "bodybuilding",
    name: "Bodybuilding / hypertrophy style",
    progressionModel: "volume-proximity-hypertrophy",
    primaryIntent: "drive muscle growth through repeatable volume close to failure",
    coreSignals: [
      "moderate to high volume",
      "stable exercise selection",
      "proximity to failure",
      "muscle group exposure"
    ],
    preferredAdjustments: [
      "add reps before load where appropriate",
      "increase volume only if recovery is stable",
      "keep execution quality high"
    ],
    riskFlags: [
      "too many RPE 9+ exposures",
      "volume increasing while performance drops",
      "poor movement standardisation"
    ]
  },

  "thenx-calisthenics": {
    id: "thenx-calisthenics",
    name: "THENX / calisthenics style",
    progressionModel: "skill-volume-calisthenics",
    primaryIntent: "build bodyweight strength, control and skill through repeatable progressions",
    coreSignals: [
      "pull-up dip push-up patterns",
      "skill progression",
      "bodyweight volume",
      "density and clean reps"
    ],
    preferredAdjustments: [
      "increase total clean reps",
      "progress leverage only when form is stable",
      "use density before maximal difficulty"
    ],
    riskFlags: [
      "technical failure before target",
      "loss of range or scapular position",
      "too much intensity without skill quality"
    ]
  },

  "crossfit": {
    id: "crossfit",
    name: "CrossFit / mixed modal style",
    progressionModel: "mixed-modal-capacity",
    primaryIntent: "develop broad work capacity across strength, conditioning and skills",
    coreSignals: [
      "metcon structure",
      "AMRAP or EMOM",
      "mixed modal work",
      "density and work capacity"
    ],
    preferredAdjustments: [
      "improve density before increasing complexity",
      "track repeat workout benchmarks",
      "manage interference from strength work"
    ],
    riskFlags: [
      "high fatigue across multiple domains",
      "intensity too high too often",
      "skill quality breaking down under fatigue"
    ]
  },

  "tactical": {
    id: "tactical",
    name: "Tactical / hybrid style",
    progressionModel: "hybrid-readiness",
    primaryIntent: "build durable strength, endurance and work capacity for broad readiness",
    coreSignals: [
      "hybrid strength and conditioning",
      "loaded carries or rucks",
      "bodyweight capacity",
      "repeatable readiness"
    ],
    preferredAdjustments: [
      "balance strength and conditioning progression",
      "avoid over-specialising too early",
      "use fatigue and recovery trends to guide load"
    ],
    riskFlags: [
      "conditioning volume suppressing strength",
      "joint or tendon irritation",
      "too many hard days clustered together"
    ]
  },

  "plyometric-speed": {
    id: "plyometric-speed",
    name: "Plyometric / speed development style",
    progressionModel: "quality-power-exposure",
    primaryIntent: "develop reactive power, stiffness and explosive output",
    coreSignals: [
      "jumps",
      "bounds",
      "pogos",
      "sprint or reactive work",
      "contact quality"
    ],
    preferredAdjustments: [
      "progress contacts gradually",
      "prioritise quality over fatigue",
      "increase intensity only when contacts are crisp"
    ],
    riskFlags: [
      "sloppy contacts",
      "loss of stiffness",
      "rapid jump in contacts",
      "tendon irritation"
    ]
  },

  "rehab-return-to-run": {
    id: "rehab-return-to-run",
    name: "Rehab / return-to-run style",
    progressionModel: "tissue-capacity",
    primaryIntent: "restore capacity gradually while managing symptom response",
    coreSignals: [
      "isometrics",
      "eccentrics",
      "graded plyometrics",
      "return to run exposure",
      "symptom-aware progression"
    ],
    preferredAdjustments: [
      "progress one variable at a time",
      "repeat successful exposures",
      "avoid large spikes in load or contacts"
    ],
    riskFlags: [
      "symptom flare",
      "rapid volume spike",
      "painful compensation",
      "skipping foundational exposure"
    ]
  }
};

export function getProgrammeDNA(programmeId) {
  return PROGRAMME_DNA[programmeId] || null;
}

export function getAllProgrammeDNA() {
  return Object.values(PROGRAMME_DNA);
}

export function getProgrammeProgressionModel(programmeId) {
  return getProgrammeDNA(programmeId)?.progressionModel || "general";
}