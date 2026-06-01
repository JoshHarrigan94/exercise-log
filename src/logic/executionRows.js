function hasStructuredSets(item = {}) {
  return Array.isArray(item.sets) && item.sets.length > 0;
}

function normaliseStructuredSet(set, index) {
  return {
    id: set.id || `set-${index + 1}`,
    label: set.label || `Set ${index + 1}`,
    load: set.load || "",
    result: set.reps || set.result || "",
    rest: set.rest || "",
    rpe: set.rpe || "",
    isGrouped: false
  };
}

function buildGroupedStructuredRow(item, label) {
  const set = item.sets?.[0] || {};

  return [
    {
      id: set.id || "set-1",
      label,
      load: set.load || "",
      result: set.reps || set.result || item.target || "",
      rest: set.rest || "",
      rpe: set.rpe || "",
      isGrouped: true
    }
  ];
}

function buildLegacyRow(item) {
  return [
    {
      id: "set-1",
      label: "Set 1",
      load: "",
      result: item.target || "",
      rest: "",
      rpe: "",
      isGrouped: false
    }
  ];
}

export function getExecutionRows(item = {}) {
  const methodId = item.methodId || "standard-sets";

  if (!hasStructuredSets(item)) {
    return buildLegacyRow(item);
  }

  switch (methodId) {
    case "ladder":
    case "top-set-ladder":
      return buildGroupedStructuredRow(item, "Ladder");

    case "cluster":
      return buildGroupedStructuredRow(item, "Cluster");

    case "rest-pause":
      return buildGroupedStructuredRow(item, "Rest-pause");

    case "isometric":
      return buildGroupedStructuredRow(item, "Hold");

    case "intervals":
      return buildGroupedStructuredRow(item, "Interval");

    case "top-set":
      return buildGroupedStructuredRow(item, "Top set");

    case "top-set-backoff":
    case "standard-sets":
    default:
      return item.sets.map(normaliseStructuredSet);
  }
}