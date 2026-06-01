function asText(value) {
  return String(value || "").trim();
}

function extractLoad(target) {
  const text = asText(target);
  const match = text.match(/(?:BW|\+?\d+(?:\.\d+)?\s?kg)/i);
  return match ? match[0].replace(/\s/g, "") : "";
}

function extractRest(target) {
  const text = asText(target);
  const match = text.match(/(?:rest\s*)?(\d+)\s?(?:s|sec|seconds|m|min|minutes)/i);
  return match ? match[0].replace(/^rest\s*/i, "") : "";
}

function cleanResult(target) {
  return asText(target)
    .replace(/(?:BW|\+?\d+(?:\.\d+)?\s?kg)/gi, "")
    .replace(/(?:rest\s*)?\d+\s?(?:s|sec|seconds|m|min|minutes)/gi, "")
    .replace(/[·,]/g, " ")
    .trim();
}

function extractSetsAndReps(target) {
  const text = asText(target);
  const match = text.match(/(\d+)\s?[x×]\s?(\d+)/i);

  if (!match) return null;

  return {
    sets: Number(match[1]),
    reps: match[2]
  };
}

function buildStandardRows(item) {
  const target = asText(item.target);
  const load = extractLoad(target);
  const rest = extractRest(target);
  const setsAndReps = extractSetsAndReps(target);

  if (setsAndReps && setsAndReps.sets > 0 && setsAndReps.sets <= 20) {
    return Array.from({ length: setsAndReps.sets }, (_, index) => ({
      id: `row-${index + 1}`,
      label: `Set ${index + 1}`,
      load,
      result: setsAndReps.reps,
      rest,
      rpe: "",
      isGrouped: false
    }));
  }

  return [
    {
      id: "row-1",
      label: "Set 1",
      load,
      result: cleanResult(target),
      rest,
      rpe: "",
      isGrouped: false
    }
  ];
}

function buildGroupedRow(item, label) {
  const target = asText(item.target);

  return [
    {
      id: "row-1",
      label,
      load: extractLoad(target),
      result: cleanResult(target),
      rest: extractRest(target),
      rpe: "",
      isGrouped: true
    }
  ];
}

export function getExecutionRows(item = {}) {
  const methodId = item.methodId || "standard-sets";

  switch (methodId) {
    case "ladder":
    case "top-set-ladder":
      return buildGroupedRow(item, "Ladder");

    case "cluster":
      return buildGroupedRow(item, "Cluster");

    case "rest-pause":
      return buildGroupedRow(item, "Rest-pause");

    case "isometric":
      return buildGroupedRow(item, "Hold");

    case "intervals":
      return buildGroupedRow(item, "Interval");

    case "top-set":
      return buildGroupedRow(item, "Top set");

    case "top-set-backoff":
    case "standard-sets":
    default:
      return buildStandardRows(item);
  }
}