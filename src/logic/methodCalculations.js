import { parseMethodData } from "./methodParsers.js";

export function calculateMethodExposure(methodId, rawData = {}) {
  const parsed = parseMethodData(methodId, rawData);
  const normalized = parsed.normalized || {};

  return {
    methodId,
    summary: parsed.summary,
    totalReps: getTotalReps(normalized),
    totalHoldSeconds: getTotalHoldSeconds(normalized),
    totalContacts: getTotalContacts(normalized),
    peakRung: normalized.peakRung || 0,
    miniSets: normalized.miniSets || 0,
    densityLabel: getDensityLabel(methodId, normalized),
    exposureLabel: getExposureLabel(methodId, normalized)
  };
}

function getTotalReps(normalized = {}) {
  return Number(normalized.totalReps || 0);
}

function getTotalHoldSeconds(normalized = {}) {
  return Number(normalized.totalHoldSeconds || 0);
}

function getTotalContacts(normalized = {}) {
  return Number(normalized.totalContacts || 0);
}

function getDensityLabel(methodId, normalized = {}) {
  if (methodId === "rest-pause") {
    return normalized.miniSets >= 3 ? "High density" : "Moderate density";
  }

  if (methodId === "cluster") {
    return normalized.clusters >= 5 ? "High cluster exposure" : "Moderate cluster exposure";
  }

  if (methodId === "intervals") {
    return normalized.rounds >= 20 ? "High round count" : "Moderate round count";
  }

  if (methodId === "ladder" || methodId === "top-set-ladder") {
    return normalized.rounds >= 3 ? "High ladder volume" : "Moderate ladder volume";
  }

  return "Standard exposure";
}

function getExposureLabel(methodId, normalized = {}) {
  switch (methodId) {
    case "standard-sets":
      return `${normalized.totalReps || 0} reps`;

    case "top-set":
      return `${normalized.totalReps || 0} top-set reps`;

    case "top-set-backoff":
      return `${normalized.totalReps || 0} total reps`;

    case "ladder":
      return `${normalized.totalReps || 0} ladder reps`;

    case "top-set-ladder":
      return `${normalized.totalReps || 0} total reps`;

    case "rest-pause":
      return `${normalized.totalReps || 0} rest-pause reps`;

    case "cluster":
      return `${normalized.totalReps || 0} cluster reps`;

    case "isometric":
      return `${normalized.totalHoldSeconds || 0}s total hold`;

    case "intervals":
      return `${normalized.rounds || 0} rounds`;

    case "plyometric":
      return `${normalized.totalContacts || 0} contacts`;

    default:
      return "Exposure logged";
  }
}
