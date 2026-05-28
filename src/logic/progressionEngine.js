export function getProgressionRecommendation(log) {
  const rpe = Number(log.rpe || 0);
  const pain = Number(log.pain || 0);
  const methodId = log.methodId;
  const data = log.data || {};

  if (pain >= 4) {
    return {
      status: "reduce",
      label: "Pain flag",
      message: "Pain was high. Reduce load or volume next time and use a lower-risk variation.",
      action: "Reduce exposure"
    };
  }

  if (pain >= 2) {
    return {
      status: "hold",
      label: "Monitor pain",
      message: "Pain was present but manageable. Hold progression and repeat cleanly before adding stress.",
      action: "Hold"
    };
  }

  if (rpe >= 9.5) {
    return {
      status: "hold",
      label: "High fatigue",
      message: "Effort was very high. Repeat this target before increasing load or volume.",
      action: "Repeat"
    };
  }

  if (rpe > 0 && rpe <= 8) {
    return {
      status: "progress",
      label: "Progress ready",
      message: getProgressMessage(methodId, data),
      action: "Progress"
    };
  }

  return {
    status: "neutral",
    label: "Logged",
    message: "Session logged. Add RPE and pain scores for better progression decisions.",
    action: "Review"
  };
}

function getProgressMessage(methodId, data) {
  switch (methodId) {
    case "top-set":
      return "Top set looked controlled. Add a small load jump or aim for one extra rep next time.";

    case "top-set-ladder":
      return "Strength exposure was clean. Progress either the top set or the ladder, not both at once.";

    case "ladder":
      return "Ladder work was controlled. Add one rung, one round, or improve tempo before adding intensity.";

    case "rest-pause":
      return "Rest-pause work was manageable. Add one rep to the first segment before increasing total density.";

    case "cluster":
      return "Cluster quality was good. Add load only if every mini-set stayed crisp.";

    case "isometric":
      return "Isometric exposure was controlled. Add 5 seconds or small load next time.";

    case "intervals":
      return "Conditioning was manageable. Add rounds first, then density, then load.";

    default:
      return "Work was controlled. Add a small amount of volume or load next time.";
  }
}
