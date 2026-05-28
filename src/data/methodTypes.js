export const methodTypes = [
  {
    id: "standard-sets",
    name: "Standard Sets",
    description: "Traditional sets and reps.",
    fields: ["sets", "reps", "load", "rpe", "notes"]
  },
  {
    id: "top-set",
    name: "Top Set",
    description: "One main high-intensity performance set.",
    fields: ["load", "reps", "rpe", "pain", "notes"]
  },
  {
    id: "top-set-backoff",
    name: "Top Set + Back-Off",
    description: "A heavy top set followed by lighter volume work.",
    fields: ["topSet", "backOffSets", "rpe", "pain", "notes"]
  },
  {
    id: "ladder",
    name: "Ladder",
    description: "Ascending or wave-based reps such as 1-2-3-4-5.",
    fields: ["rungs", "rounds", "totalReps", "rpe", "pain", "notes"]
  },
  {
    id: "top-set-ladder",
    name: "Top Set + Ladder",
    description: "Heavy top set followed by technical ladder volume.",
    fields: ["topSet", "ladder", "rpe", "pain", "notes"]
  },
  {
    id: "rest-pause",
    name: "Rest-Pause",
    description: "One hard set followed by short-rest mini-sets.",
    fields: ["segments", "restSeconds", "totalReps", "rpe", "pain", "notes"]
  },
  {
    id: "cluster",
    name: "Cluster",
    description: "Multiple mini-sets with short controlled rest.",
    fields: ["segments", "restSeconds", "load", "totalReps", "rpe", "pain", "notes"]
  },
  {
    id: "isometric",
    name: "Isometric",
    description: "Timed positional strength or rehab hold.",
    fields: ["position", "load", "durationSeconds", "sets", "pain", "notes"]
  },
  {
    id: "intervals",
    name: "Intervals",
    description: "Time or round-based conditioning work.",
    fields: ["load", "work", "rest", "rounds", "rpe", "notes"]
  },
  {
    id: "plyometric",
    name: "Plyometric",
    description: "Jump, bound, or explosive intent work.",
    fields: ["exercise", "sets", "reps", "intent", "landingStress", "pain", "notes"]
  }
];
