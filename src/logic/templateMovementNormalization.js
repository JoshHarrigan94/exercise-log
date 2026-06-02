import {
  resolveMovementExpression
} from "./movementExpressionResolver.js";

import {
  getMovementCatalogueItemById
} from "./movementSearchCatalogue.js";

export function normalisePlannedMovement(rawMovement = {}) {
  const catalogueItem =
    rawMovement.movementCatalogueId
      ? getMovementCatalogueItemById(rawMovement.movementCatalogueId)
      : null;

  const expressionInput =
    rawMovement.movementExpression ||
    catalogueItem?.expression ||
    {
      patternId: rawMovement.patternId,
      modifierIds: rawMovement.modifierIds || [],
      methodId: rawMovement.methodId || rawMovement.method || "",
      customName:
        rawMovement.exerciseName ||
        rawMovement.name ||
        rawMovement.label ||
        ""
    };

  const movementExpression =
    resolveMovementExpression(expressionInput);

  return {
    ...rawMovement,

    // Backwards compatibility
    exerciseId:
      rawMovement.exerciseId ||
      rawMovement.movementCatalogueId ||
      movementExpression.id,

    exerciseName:
      rawMovement.exerciseName ||
      rawMovement.name ||
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
        rawMovement.methodId ||
        rawMovement.method ||
        movementExpression.methodId ||
        "",

      outputIds: movementExpression.outputIds,
      diagnosticSignals: movementExpression.diagnosticSignals,
      expressionBias: movementExpression.expressionBias
    },

    targets: {
      ...(rawMovement.targets || {}),

      load:
        rawMovement.load ??
        rawMovement.targets?.load ??
        "",

      sets:
        rawMovement.sets ??
        rawMovement.targets?.sets ??
        "",

      reps:
        rawMovement.reps ??
        rawMovement.targets?.reps ??
        "",

      rpe:
        rawMovement.rpe ??
        rawMovement.targets?.rpe ??
        "",

      duration:
        rawMovement.duration ??
        rawMovement.targets?.duration ??
        "",

      distance:
        rawMovement.distance ??
        rawMovement.targets?.distance ??
        "",

      rest:
        rawMovement.rest ??
        rawMovement.targets?.rest ??
        "",

      notes:
        rawMovement.notes ??
        rawMovement.targets?.notes ??
        ""
    }
  };
}

export function normaliseWorkoutMovements(workout = {}) {
  return {
    ...workout,
    exercises: (workout.exercises || []).map(normalisePlannedMovement)
  };
}

export function normaliseTemplateWeek(week = {}) {
  return {
    ...week,
    workouts: (week.workouts || []).map(normaliseWorkoutMovements)
  };
}

export function normaliseTemplate(template = {}) {
  return {
    ...template,
    weeks: (template.weeks || []).map(normaliseTemplateWeek)
  };
}

export function normaliseTemplates(templates = []) {
  return templates.map(normaliseTemplate);
}

export function getMovementExpressionFromPlannedMovement(movement = {}) {
  if (movement.movementExpression) {
    return movement.movementExpression;
  }

  return normalisePlannedMovement(movement).movementExpression;
}