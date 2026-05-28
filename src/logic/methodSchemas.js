export const methodSchemas = {
  "standard-sets": {
    label: "Standard Sets",
    fields: ["load", "reps", "sets"],
    summaryOrder: ["sets", "reps", "load"]
  },

  "top-set": {
    label: "Top Set",
    fields: ["load", "reps"],
    summaryOrder: ["load", "reps"]
  },

  "top-set-backoff": {
    label: "Top Set + Back-Off",
    fields: ["topLoad", "topReps", "backoffLoad", "backoffSets", "backoffReps"],
    summaryOrder: ["topLoad", "topReps", "backoffSets", "backoffReps", "backoffLoad"]
  },

  "ladder": {
    label: "Ladder",
    fields: ["ladder", "rounds"],
    summaryOrder: ["ladder", "rounds"]
  },

  "top-set-ladder": {
    label: "Top Set + Ladder",
    fields: ["topLoad", "topReps", "ladder", "rounds"],
    summaryOrder: ["topLoad", "topReps", "ladder", "rounds"]
  },

  "rest-pause": {
    label: "Rest-Pause",
    fields: ["load", "segments", "rest"],
    summaryOrder: ["load", "segments", "rest"]
  },

  "cluster": {
    label: "Cluster",
    fields: ["load", "clusterReps", "clusters", "rest"],
    summaryOrder: ["load", "clusterReps", "clusters", "rest"]
  },

  "isometric": {
    label: "Isometric",
    fields: ["position", "duration", "sets", "load"],
    summaryOrder: ["position", "duration", "sets", "load"]
  },

  "intervals": {
    label: "Intervals",
    fields: ["work", "rest", "rounds", "load"],
    summaryOrder: ["work", "rest", "rounds", "load"]
  },

  "plyometric": {
    label: "Plyometric",
    fields: ["sets", "reps", "intent", "landingStress"],
    summaryOrder: ["sets", "reps", "intent", "landingStress"]
  }
};

export function getMethodSchema(methodId) {
  return methodSchemas[methodId] || methodSchemas["standard-sets"];
}
