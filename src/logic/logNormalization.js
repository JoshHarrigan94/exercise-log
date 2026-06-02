import {
  resolveMovementExpression
} from "./movementExpressionResolver.js";

import {
  getMovementCatalogueItemById
} from "./movementSearchCatalogue.js";

export function normaliseLoggedMovement(rawLog = {}) {
  const catalogueItem =
    rawLog.movementCatalogueId
      ? getMovementCatalogueItemById(rawLog.movementCatalogueId)
      : null;

  const expressionInput =
    rawLog.movementExpression ||
    catalogueItem?.expression ||
    {
      patternId: rawLog.patternId,
      modifierIds: rawLog.modifierIds || [],
      methodId: rawLog.methodId || rawLog.method || "",
      customName: rawLog.exerciseName || rawLog.name || ""
    };

  const movementExpression =
    resolveMovementExpression(expressionInput);

  return {
    ...rawLog,

    // Backwards compatibility
    exerciseId:
      rawLog.exerciseId ||
      rawLog.movementCatalogueId ||
      movementExpression.id,

    exerciseName:
      rawLog.exerciseName ||
      rawLog.name ||
      movementExpression.displayName,

    // New canonical structure
    movementExpression: {
      id: movementExpression.id,
      displayName: movementExpression.displayName,

      patternId: movementExpression.patternId,
      patternName: movementExpression.pattern?.name || "",

      modifierIds: movementExpression.modifierIds,
      modifierNames: movementExpression.modifiers.map(modifier =>
        modifier.name
      ),

      methodId:
        rawLog.methodId ||
        rawLog.method ||
        movementExpression.methodId ||
        "",

      outputIds: movementExpression.outputIds,
      diagnosticSignals: movementExpression.diagnosticSignals,
      expressionBias: movementExpression.expressionBias
    },

    outputs: {
      ...(rawLog.outputs || {}),

      load:
        rawLog.load ??
        rawLog.outputs?.load ??
        "",

      reps:
        rawLog.reps ??
        rawLog.outputs?.reps ??
        "",

      rpe:
        rawLog.rpe ??
        rawLog.outputs?.rpe ??
        "",

      duration:
        rawLog.duration ??
        rawLog.outputs?.duration ??
        "",

      distance:
        rawLog.distance ??
        rawLog.outputs?.distance ??
        "",

      notes:
        rawLog.notes ??
        rawLog.outputs?.notes ??
        ""
    }
  };
}

export function normaliseLoggedMovements(logs = []) {
  return logs.map(normaliseLoggedMovement);
}

export function getMovementExpressionFromLog(log = {}) {
  if (log.movementExpression) {
    return log.movementExpression;
  }

  return normaliseLoggedMovement(log).movementExpression;
}