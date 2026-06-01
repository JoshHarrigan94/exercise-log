function parseTarget(target = "") {
  const value = String(target || "").trim();

  return {
    raw: value,
    load: extractLoad(value),
    reps: extractReps(value),
    rest: extractRest(value)
  };
}

function extractLoad(value) {
  const match = value.match(/(?:BW|\+?\d+(?:\.\d+)?\s?kg|\+?\d+(?:\.\d+)?)/i);
  return match ? match[0].replace(/\s/g, "") : "";
}

function extractRest(value) {
  const match = value.match(/(?:rest\s*)?(\d+)(?:s|sec|seconds|m|min|minutes)/i);
  return match ? match[0].replace(/^rest\s*/i, "") : "";
}

function extractReps(value) {
  const withoutRest = value.replace(/(?:rest\s*)?\d+(?:s|sec|seconds|m|min|minutes)/gi, "");
  const withoutLoad = withoutRest.replace(/(?:BW|\+?\d+(?:\.\d+)?\s?kg)/gi, "");
  const match = withoutLoad.match(/(\d+(?:[-+x×]\d+)*)/);

  return match ? match[1] : "";
}

function buildStandardRows(item) {
  const parsed = parseTarget(item.target);

  const setMatch = String(item.target || "").match(/(\d+)\s?[x×]\s?(\d+)/i);

  if (setMatch) {
    const sets = Number(setMatch[1]);
    const reps = setMatch[2];

    return Array.from({ length: sets }, (_, index) => ({
      id: `${item.id || item.exerciseId}-${index + 1}`,
      label: `Set ${index + 1}`,
      load: parsed.load,
      result: reps,
      rest: parsed.rest,
      rpe: "",
      isGrouped: false
    }));
  }

  return [
    {
      id: `${item.id || item.exerciseId}-1`,
      label: "Set 1",
      load: parsed.load,
      result: parsed.reps,
      rest: parsed.rest,
      rpe: "",
      isGrouped: false
    }
  ];
}

function buildGroupedRow(item, label) {
  const parsed = parseTarget(item.target);

  return [
    {
      id: `${item.id || item.exerciseId}-1`,
      label,
      load: parsed.load,
      result: parsed.reps || parsed.raw,
      rest: parsed.rest,
      rpe: "",
      isGrouped: true
    }
  ];
}

export function getExecutionRows(item) {
  switch (item.methodId) {
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
      return buildStandardRows(item);

    case "standard-sets":
    default:
      return buildStandardRows(item);
  }
}