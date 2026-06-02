import { movementPatterns } from "../data/movementPatterns.js";
import { movementModifiers } from "../data/movementModifiers.js";
import {
  outputTypes,
  getOutputTypeById,
  getOutputTypesForPattern
} from "../data/outputTypes.js";

function unique(values) {
  return Array.from(
    new Set(
      values.filter(Boolean)
    )
  );
}

function titleCase(value = "") {
  return String(value || "")
    .split("-")
    .map(word =>
      word.charAt(0).toUpperCase() +
      word.slice(1)
    )
    .join(" ");
}

export function getMovementPatternById(patternId) {
  return movementPatterns.find(pattern =>
    pattern.id === patternId
  );
}

export function getMovementModifierById(modifierId) {
  return movementModifiers.find(modifier =>
    modifier.id === modifierId
  );
}

export function modifierAppliesToPattern(modifier, patternId) {
  if (!modifier || !patternId) return false;

  return (
    modifier.compatiblePatterns.includes("*") ||
    modifier.compatiblePatterns.includes(patternId)
  );
}

export function getCompatibleModifiersForPattern(patternId) {
  return movementModifiers.filter(modifier =>
    modifierAppliesToPattern(modifier, patternId)
  );
}

function getResolvedModifiers(modifierIds = [], patternId) {
  return modifierIds
    .map(getMovementModifierById)
    .filter(modifier =>
      modifier && modifierAppliesToPattern(modifier, patternId)
    );
}

function buildDisplayName(pattern, modifiers = []) {
  if (!pattern) return "Unknown Movement";

  const modifierNames = modifiers.map(modifier =>
    modifier.name
  );

  return [
    ...modifierNames,
    pattern.name
  ].join(" ");
}

function buildSearchTerms(pattern, modifiers = []) {
  return unique([
    pattern?.id,
    pattern?.name,
    ...(pattern?.aliases || []),
    ...(pattern?.bodyRegions || []),
    ...(pattern?.diagnosticRoles || []),
    ...modifiers.flatMap(modifier => [
      modifier.id,
      modifier.name,
      modifier.category,
      ...(modifier.effects?.diagnosticSignals || [])
    ])
  ]).map(term =>
    String(term).toLowerCase()
  );
}

function buildOutputs(pattern, modifiers = []) {
  const patternOutputs =
    pattern?.defaultOutputs || [];

  const modifierOutputs =
    modifiers.flatMap(modifier =>
      modifier.effects?.outputs || []
    );

  return unique([
    ...patternOutputs,
    ...modifierOutputs
  ]).map(outputId =>
    getOutputTypeById(outputId) || {
      id: outputId,
      name: titleCase(outputId),
      category: "custom",
      unit: "",
      diagnosticUse: []
    }
  );
}

function buildDiagnosticSignals(pattern, modifiers = []) {
  return unique([
    ...(pattern?.diagnosticRoles || []),
    ...modifiers.flatMap(modifier =>
      modifier.effects?.diagnosticSignals || []
    )
  ]);
}

function inferExpressionBias(pattern, modifiers = [], outputs = []) {
  const signals = buildDiagnosticSignals(pattern, modifiers);
  const outputIds = outputs.map(output => output.id);

  const bias = [];

  if (
    signals.includes("force-production") ||
    signals.includes("max-force") ||
    outputIds.includes("load")
  ) {
    bias.push("strength");
  }

  if (
    signals.includes("rate-of-force-development") ||
    signals.includes("power") ||
    outputIds.includes("velocity") ||
    outputIds.includes("jump-height")
  ) {
    bias.push("power");
  }

  if (
    signals.includes("elasticity") ||
    signals.includes("stiffness") ||
    signals.includes("reactive-strength") ||
    outputIds.includes("rsi") ||
    outputIds.includes("contact-time")
  ) {
    bias.push("elasticity");
  }

  if (
    signals.includes("tendon-capacity") ||
    signals.includes("tissue-tolerance") ||
    outputIds.includes("pain-response")
  ) {
    bias.push("resilience");
  }

  if (
    signals.includes("motor-control") ||
    signals.includes("positional-strength") ||
    signals.includes("trunk-control") ||
    outputIds.includes("quality")
  ) {
    bias.push("control");
  }

  if (
    outputIds.includes("duration") ||
    outputIds.includes("distance") ||
    outputIds.includes("heart-rate") ||
    outputIds.includes("pace")
  ) {
    bias.push("work-capacity");
  }

  return unique(bias);
}

export function resolveMovementExpression({
  patternId,
  modifierIds = [],
  methodId = "",
  customName = ""
} = {}) {
  const pattern = getMovementPatternById(patternId);

  if (!pattern) {
    return {
      id: customName || "unknown-movement-expression",
      displayName: customName || "Unknown Movement",
      pattern: null,
      modifiers: [],
      methodId,
      outputs: [],
      outputIds: [],
      diagnosticSignals: [],
      expressionBias: [],
      searchTerms: []
    };
  }

  const modifiers =
    getResolvedModifiers(modifierIds, pattern.id);

  const outputs =
    buildOutputs(pattern, modifiers);

  const diagnosticSignals =
    buildDiagnosticSignals(pattern, modifiers);

  const displayName =
    customName ||
    buildDisplayName(pattern, modifiers);

  const id = [
    pattern.id,
    ...modifiers.map(modifier => modifier.id),
    methodId
  ].filter(Boolean).join("__");

  return {
    id,
    displayName,

    pattern,
    patternId: pattern.id,

    modifiers,
    modifierIds: modifiers.map(modifier => modifier.id),

    methodId,

    outputs,
    outputIds: outputs.map(output => output.id),

    diagnosticSignals,
    expressionBias: inferExpressionBias(
      pattern,
      modifiers,
      outputs
    ),

    searchTerms: buildSearchTerms(
      pattern,
      modifiers
    )
  };
}

export function resolveMovementExpressionLabel(expression = {}) {
  if (expression.displayName) {
    return expression.displayName;
  }

  return resolveMovementExpression(expression).displayName;
}

export function getDefaultMovementExpressionForPattern(patternId) {
  return resolveMovementExpression({
    patternId,
    modifierIds: []
  });
}

export function getPatternOutputOptions(patternId) {
  return getOutputTypesForPattern(patternId);
}

export function getAllMovementPatterns() {
  return movementPatterns;
}

export function getAllMovementModifiers() {
  return movementModifiers;
}

export function getAllOutputTypes() {
  return outputTypes;
}