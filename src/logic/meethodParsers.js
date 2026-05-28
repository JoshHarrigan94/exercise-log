import { getMethodSchema } from "./methodSchemas.js";

export function parseMethodData(methodId, rawData = {}) {
  const schema = getMethodSchema(methodId);

  const cleaned = cleanObject(rawData);

  const parsed = {
    methodId,
    schemaLabel: schema.label,
    raw: cleaned,
    normalized: normalizeData(methodId, cleaned),
    summary: createMethodSummary(methodId, cleaned)
  };

  return parsed;
}

function cleanObject(data = {}) {
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => {
      return value !== undefined && value !== null && String(value).trim() !== "";
    })
  );
}

function normalizeData(methodId, data) {
  switch (methodId) {
    case "standard-sets":
      return normalizeStandardSets(data);

    case "top-set":
      return normalizeTopSet(data);

    case "top-set-backoff":
      return normalizeTopSetBackoff(data);

    case "ladder":
      return normalizeLadder(data);

    case "top-set-ladder":
      return normalizeTopSetLadder(data);

    case "rest-pause":
      return normalizeRestPause(data);

    case "cluster":
      return normalizeCluster(data);

    case "isometric":
      return normalizeIsometric(data);

    case "intervals":
      return normalizeIntervals(data);

    case "plyometric":
      return normalizePlyometric(data);

    default:
      return data;
  }
}

function normalizeStandardSets(data) {
  const sets = toNumber(data.sets);
  const reps = toNumber(data.reps);

  return {
    load: data.load || "",
    sets,
    reps,
    totalReps: safeMultiply(sets, reps)
  };
}

function normalizeTopSet(data) {
  return {
    load: data.load || "",
    reps: toNumber(data.reps),
    totalReps: toNumber(data.reps)
  };
}

function normalizeTopSetBackoff(data) {
  const topReps = toNumber(data.topReps);
  const backoffSets = toNumber(data.backoffSets);
  const backoffReps = toNumber(data.backoffReps);

  return {
    topLoad: data.topLoad || "",
    topReps,
    backoffLoad: data.backoffLoad || "",
    backoffSets,
    backoffReps,
    totalReps: topReps + safeMultiply(backoffSets, backoffReps)
  };
}

function normalizeLadder(data) {
  const rungs = parseNumberSequence(data.ladder);
  const rounds = toNumber(data.rounds) || 1;

  return {
    ladder: data.ladder || "",
    rungs,
    rounds,
    peakRung: rungs.length ? Math.max(...rungs) : 0,
    totalReps: sum(rungs) * rounds
  };
}

function normalizeTopSetLadder(data) {
  const topReps = toNumber(data.topReps);
  const rungs = parseNumberSequence(data.ladder);
  const rounds = toNumber(data.rounds) || 1;

  return {
    topLoad: data.topLoad || "",
    topReps,
    ladder: data.ladder || "",
    rungs,
    rounds,
    peakRung: rungs.length ? Math.max(...rungs) : 0,
    totalReps: topReps + sum(rungs) * rounds
  };
}

function normalizeRestPause(data) {
  const segments = parseNumberSequence(data.segments);

  return {
    load: data.load || "",
    segments,
    rest: data.rest || "",
    totalReps: sum(segments),
    miniSets: segments.length
  };
}

function normalizeCluster(data) {
  const clusterReps = toNumber(data.clusterReps);
  const clusters = toNumber(data.clusters);

  return {
    load: data.load || "",
    clusterReps,
    clusters,
    rest: data.rest || "",
    totalReps: safeMultiply(clusterReps, clusters)
  };
}

function normalizeIsometric(data) {
  const sets = toNumber(data.sets) || 1;
  const duration = toNumber(data.duration);

  return {
    position: data.position || "",
    duration,
    sets,
    load: data.load || "",
    totalHoldSeconds: safeMultiply(sets, duration)
  };
}

function normalizeIntervals(data) {
  const rounds = toNumber(data.rounds);

  return {
    work: data.work || "",
    rest: data.rest || "",
    rounds,
    load: data.load || ""
  };
}

function normalizePlyometric(data) {
  const sets = toNumber(data.sets);
  const reps = toNumber(data.reps);

  return {
    sets,
    reps,
    intent: data.intent || "",
    landingStress: data.landingStress || "",
    totalContacts: safeMultiply(sets, reps)
  };
}

export function createMethodSummary(methodId, data = {}) {
  const normalized = normalizeData(methodId, data);

  switch (methodId) {
    case "standard-sets":
      return `${normalized.sets || "-"} × ${normalized.reps || "-"} @ ${normalized.load || "load not set"}`;

    case "top-set":
      return `${normalized.load || "load not set"} × ${normalized.reps || "-"}`;

    case "top-set-backoff":
      return `${normalized.topLoad || "top load not set"} × ${normalized.topReps || "-"} + ${normalized.backoffSets || "-"} × ${normalized.backoffReps || "-"} @ ${normalized.backoffLoad || "back-off load not set"}`;

    case "ladder":
      return `${normalized.ladder || "ladder not set"} × ${normalized.rounds || 1} rounds`;

    case "top-set-ladder":
      return `${normalized.topLoad || "top load not set"} × ${normalized.topReps || "-"} + ladder ${normalized.ladder || "not set"} × ${normalized.rounds || 1}`;

    case "rest-pause":
      return `${normalized.load || "load not set"} · ${normalized.segments.join("+") || "segments not set"} · ${normalized.rest || "rest not set"}`;

    case "cluster":
      return `${normalized.load || "load not set"} · ${normalized.clusterReps || "-"} reps × ${normalized.clusters || "-"} clusters · ${normalized.rest || "rest not set"}`;

    case "isometric":
      return `${normalized.position || "position"} · ${normalized.duration || "-"}s × ${normalized.sets || 1} · ${normalized.load || "BW"}`;

    case "intervals":
      return `${normalized.work || "work"} / ${normalized.rest || "rest"} × ${normalized.rounds || "-"} · ${normalized.load || "load not set"}`;

    case "plyometric":
      return `${normalized.sets || "-"} × ${normalized.reps || "-"} · ${normalized.intent || "intent not set"} · ${normalized.landingStress || "landing stress not set"}`;

    default:
      return Object.values(data).filter(Boolean).join(" · ");
  }
}

export function parseNumberSequence(value = "") {
  return String(value)
    .split(/[-,+x×\s]+/)
    .map(item => Number(item.trim()))
    .filter(number => Number.isFinite(number) && number > 0);
}

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function sum(numbers = []) {
  return numbers.reduce((total, number) => total + number, 0);
}

function safeMultiply(a, b) {
  if (!a || !b) return 0;
  return a * b;
}
