import { getProgrammeDNA } from "./programmeDNA.js";

const MODEL_RULES = {
  "slow-wave-strength": {
    progressIf: [
      "completed planned sets",
      "top set matched or exceeded",
      "RPE not above plan by more than 0.5"
    ],
    holdIf: [
      "minor RPE drift",
      "small assistance deviation",
      "first exposure in block"
    ],
    regressIf: [
      "missed top set",
      "multiple missed sets",
      "RPE repeatedly above plan"
    ]
  },

  "linear-ramping-strength": {
    progressIf: [
      "all ramping work completed",
      "final set matched plan",
      "no major load reduction"
    ],
    holdIf: [
      "one minor rep miss",
      "RPE slightly high",
      "execution modified but completed"
    ],
    regressIf: [
      "missed final set",
      "load reduced",
      "repeated failure across exposures"
    ]
  },

  "specific-strength": {
    progressIf: [
      "competition lift matched plan",
      "back-off volume completed",
      "RPE controlled"
    ],
    holdIf: [
      "main lift completed but back-off reduced",
      "minor fatigue signal",
      "technique concern"
    ],
    regressIf: [
      "main lift missed",
      "multiple heavy sets missed",
      "RPE overshoot on main lift"
    ]
  },

  "phase-based-power": {
    progressIf: [
      "positions held",
      "explosive intent preserved",
      "no major fatigue signal"
    ],
    holdIf: [
      "quality acceptable but not sharp",
      "minor volume reduction",
      "early phase adaptation"
    ],
    regressIf: [
      "speed or position degraded",
      "excessive soreness",
      "missed phase exposure"
    ]
  },

  "volume-proximity-hypertrophy": {
    progressIf: [
      "volume completed",
      "target reps achieved",
      "RPE within planned range"
    ],
    holdIf: [
      "volume completed but RPE high",
      "minor rep drop",
      "pump/fatigue high"
    ],
    regressIf: [
      "large volume miss",
      "repeated performance drop",
      "too many high effort sets"
    ]
  },

  "skill-volume-calisthenics": {
    progressIf: [
      "clean reps completed",
      "range and position maintained",
      "density target achieved"
    ],
    holdIf: [
      "volume achieved with slight technique drift",
      "difficulty appropriate but not mastered",
      "fatigue affected later sets"
    ],
    regressIf: [
      "technical failure early",
      "range degraded",
      "difficulty too high"
    ]
  },

  "mixed-modal-capacity": {
    progressIf: [
      "work completed at planned density",
      "movement quality maintained",
      "fatigue controlled"
    ],
    holdIf: [
      "time or density slightly missed",
      "minor fatigue spillover",
      "skills degraded late"
    ],
    regressIf: [
      "large density drop",
      "movement quality broke down",
      "fatigue excessive"
    ]
  },

  "hybrid-readiness": {
    progressIf: [
      "strength and conditioning work completed",
      "no major recovery signal",
      "capacity stable"
    ],
    holdIf: [
      "one domain exceeded plan while another dropped",
      "minor recovery concern",
      "fatigue accumulation"
    ],
    regressIf: [
      "multiple domains under plan",
      "readiness poor",
      "joint or tendon signal"
    ]
  },

  "quality-power-exposure": {
    progressIf: [
      "contacts completed cleanly",
      "reactive quality maintained",
      "no tendon response"
    ],
    holdIf: [
      "contacts completed but quality average",
      "minor stiffness loss",
      "first exposure to intensity"
    ],
    regressIf: [
      "contact quality poor",
      "rapid fatigue",
      "tendon irritation signal"
    ]
  },

  "tissue-capacity": {
    progressIf: [
      "exposure completed",
      "no symptom response",
      "quality stable"
    ],
    holdIf: [
      "minor symptom response",
      "new exposure tolerated",
      "unclear recovery"
    ],
    regressIf: [
      "symptom flare",
      "load spike not tolerated",
      "movement compensation"
    ]
  },

  general: {
    progressIf: [
      "planned work completed",
      "RPE controlled",
      "no major deviation"
    ],
    holdIf: [
      "minor deviation",
      "unclear trend",
      "new exercise exposure"
    ],
    regressIf: [
      "missed work",
      "large deviation",
      "repeated high effort"
    ]
  }
};

export function getRuleSetForProgramme(programmeId) {
  const dna = getProgrammeDNA(programmeId);
  const model = dna?.progressionModel || "general";

  return {
    programmeId,
    model,
    rules: MODEL_RULES[model] || MODEL_RULES.general
  };
}

export function getRuleSetForProgrammeMatch(programmeMatch) {
  return getRuleSetForProgramme(programmeMatch?.id);
}

export function getAllProgressionRuleModels() {
  return MODEL_RULES;
}