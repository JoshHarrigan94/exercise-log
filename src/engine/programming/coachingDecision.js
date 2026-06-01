import { getRuleSetForProgrammeMatch } from "./ruleSelector.js";

function countSeverity(deviations = [], severity) {
  return deviations.filter(item => item.severity === severity).length;
}

function hasDeviation(deviations = [], typeIncludes) {
  return deviations.some(item => item.type?.includes(typeIncludes));
}

function getBaseDecision(sessionAnalysis = {}) {
  const deviations = sessionAnalysis.deviations || [];
  const compliance = sessionAnalysis.compliance || {};

  const warnings = countSeverity(deviations, "warning");
  const positives = countSeverity(deviations, "positive");

  if (compliance.completionRate >= 95 && warnings === 0) {
    return {
      decision: positives > 0 ? "progress" : "hold_or_progress",
      confidence: positives > 0 ? 78 : 68,
      reason: "Planned work was completed with no major warning deviations."
    };
  }

  if (compliance.completionRate >= 80 && warnings <= 2) {
    return {
      decision: "hold",
      confidence: 70,
      reason: "Most planned work was completed, but there were minor deviations."
    };
  }

  if (compliance.completionRate < 80 || warnings > 2) {
    return {
      decision: "repeat_or_regress",
      confidence: 76,
      reason: "Planned work was missed, reduced, or harder than expected."
    };
  }

  return {
    decision: "hold",
    confidence: 60,
    reason: "More data is needed before changing the block."
  };
}

function refineDecisionByProgramme(base, sessionAnalysis = {}, programmeMatch = {}) {
  const deviations = sessionAnalysis.deviations || [];
  const programmeId = programmeMatch?.id;

  if (!programmeId) return base;

  if (
    ["five-three-one", "madcow", "sbd-powerlifting"].includes(programmeId) &&
    (hasDeviation(deviations, "load_below") || hasDeviation(deviations, "missed"))
  ) {
    return {
      ...base,
      decision: "repeat",
      confidence: Math.max(base.confidence, 76),
      reason: "Strength-biased programming should usually repeat or stabilise after missed load or missed work."
    };
  }

  if (
    programmeId === "bodybuilding" &&
    hasDeviation(deviations, "rpe_above")
  ) {
    return {
      ...base,
      decision: "hold",
      confidence: Math.max(base.confidence, 72),
      reason: "Hypertrophy work can progress through volume, but repeated high RPE suggests holding before adding more."
    };
  }

  if (
    programmeId === "thenx-calisthenics" &&
    hasDeviation(deviations, "reps_below")
  ) {
    return {
      ...base,
      decision: "hold_or_simplify",
      confidence: Math.max(base.confidence, 72),
      reason: "Calisthenics progression should protect clean reps and technical quality before increasing difficulty."
    };
  }

  if (
    programmeId === "plyometric-speed" &&
    (hasDeviation(deviations, "missed") || hasDeviation(deviations, "rpe_above"))
  ) {
    return {
      ...base,
      decision: "hold_or_reduce_contacts",
      confidence: Math.max(base.confidence, 74),
      reason: "Plyometric work should progress only when contacts are crisp and fatigue stays low."
    };
  }

  if (
    programmeId === "rehab-return-to-run" &&
    (hasDeviation(deviations, "missed") || hasDeviation(deviations, "load_above"))
  ) {
    return {
      ...base,
      decision: "hold",
      confidence: Math.max(base.confidence, 76),
      reason: "Rehab progressions should avoid spikes and repeat successful exposures before advancing."
    };
  }

  return base;
}

function composeDecisionMessage(decision, ruleSet) {
  const rules = ruleSet?.rules;

  if (!rules) {
    return "Use planned-versus-actual trends to decide whether to progress, repeat, or reduce.";
  }

  if (decision.decision.includes("progress")) {
    return `Progress if: ${rules.progressIf.join("; ")}.`;
  }

  if (decision.decision.includes("regress") || decision.decision.includes("reduce")) {
    return `Regress if: ${rules.regressIf.join("; ")}.`;
  }

  return `Hold if: ${rules.holdIf.join("; ")}.`;
}

export function makeCoachingDecision({
  sessionAnalysis,
  programmeMatch
}) {
  const base = getBaseDecision(sessionAnalysis);
  const refined = refineDecisionByProgramme(base, sessionAnalysis, programmeMatch);
  const ruleSet = getRuleSetForProgrammeMatch(programmeMatch);

  return {
    ...refined,
    programmeId: programmeMatch?.id || null,
    programmeName: programmeMatch?.name || "General training",
    model: ruleSet.model,
    guidance: composeDecisionMessage(refined, ruleSet),
    rules: ruleSet.rules
  };
}