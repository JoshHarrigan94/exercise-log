import { exerciseBases } from "../data/exerciseBases.js";
import { exerciseVariants } from "../data/exerciseVariants.js";
import { movementFamilies } from "../data/movementFamilies.js";
import { expressionTypes } from "../data/expressionTypes.js";
import { store } from "../state/store.js";
import { getMethodCompatibility } from "./methodCompatibility.js";
import { movementRelationships } from "../data/movementRelationships.js";
import {
  getBaseMovementById,
  getVariantById,
  getMovementFamilyById,
  getVariantsForBase,
  resolveMovementVariant
} from "../data/movementIndex.js";

function formatFamilyName(familyId) {
  return (
    getMovementFamilyById(familyId)?.name ||
    familyId ||
    "General"
  );
}

function formatExpressionName(expressionId) {
  return (
    expressionTypes.find(expression => expression.id === expressionId)?.name ||
    expressionId
  );
}

function resolveBaseMovement(base) {
  const variants = getVariantsForBase(base.id);

  return {
    ...base,
    familyData: getMovementFamilyById(base.family),
    familyName: formatFamilyName(base.family),
    primaryExpressionNames: (base.primaryExpressions || []).map(formatExpressionName),
    secondaryExpressionNames: (base.secondaryExpressions || []).map(formatExpressionName),
    variantCount: variants.length,
    variants,
    relationships: movementRelationships[base.id] || {
  regressions: [],
  progressions: [],
  alternatives: []
},

regressionCount: movementRelationships[base.id]?.regressions?.length || 0,
progressionCount: movementRelationships[base.id]?.progressions?.length || 0,
alternativeCount: movementRelationships[base.id]?.alternatives?.length || 0
  };
}

export function getAllBaseMovements() {
  return exerciseBases.map(resolveBaseMovement);
}

export function getResolvedVariant(variantId) {
  const variant = getVariantById(variantId);

  if (!variant) return null;

  return resolveMovementVariant(variantId);
}

export function getCompatibleMethodsForBaseMovement(baseMovementId) {
  const base = getBaseMovementById(baseMovementId);

  if (!base) {
    return {
      recommended: [],
      possible: [],
      limited: []
    };
  }

  return getMethodCompatibility(base);
}

export function getCompatibleMethodsForVariant(variantId) {
  const fallback = {
    recommended: [],
    possible: [],
    limited: []
  };

  if (!variantId) return fallback;

  const variant = getVariantById(variantId);

  if (!variant) {
    return fallback;
  }

  const baseMovementId =
    variant.baseMovementId ||
    variant.baseId ||
    variant.base;

  const base = getBaseMovementById(baseMovementId);

  if (!base) {
    return fallback;
  }

  return getMethodCompatibility(base, variant);
}

export function getAllVariants() {
  return exerciseVariants.map(variant =>
    resolveMovementVariant(variant.id)
  ).filter(Boolean);
}

export function getMovementAtlas() {
  return movementFamilies.map(family => {
    const bases = exerciseBases
      .filter(base => base.family === family.id)
      .map(resolveBaseMovement);

    const variantCount = bases.reduce(
      (total, base) => total + base.variantCount,
      0
    );

    const expressions = Array.from(
      new Set(
        bases.flatMap(base => [
          ...(base.primaryExpressions || []),
          ...(base.secondaryExpressions || [])
        ])
      )
    );

    return {
      ...family,
      bases,
      baseCount: bases.length,
      variantCount,
      expressionNames: expressions.map(formatExpressionName)
    };
  }).filter(family =>
    family.baseCount > 0
  );
}

export function getBaseMovementsByFamily(familyId) {
  return exerciseBases
    .filter(base => base.family === familyId)
    .map(resolveBaseMovement);
}

export function getResolvedBaseMovement(baseMovementId) {
  const base = getBaseMovementById(baseMovementId);

  if (!base) return null;

  return resolveBaseMovement(base);
}

export function getVariantsForBaseMovement(baseMovementId) {
  return getVariantsForBase(baseMovementId)
    .map(variant => resolveMovementVariant(variant.id))
    .filter(Boolean);
}

export function getExerciseById(id) {
  if (!id) return null;

  const customExercise = store.data.customExercises.find(
    exercise => exercise.id === id
  );

  if (customExercise) {
    return {
      ...customExercise,
      source: "custom"
    };
  }

  const variant = getVariantById(id);

  if (variant) {
    const resolved = resolveMovementVariant(id);

    return {
      ...resolved,
      id,
      name: resolved?.name || variant.name || "Unknown Movement",
      pattern: resolved?.family?.name || "Generated Movement",
      defaultMethod: variant.defaultMethod || "standard-sets",
      source: "atlas"
    };
  }

  const base = getBaseMovementById(id);

  if (base) {
    return {
      id: base.id,
      name: base.name,
      base,
      family: base.family,
      pattern: formatFamilyName(base.family),
      defaultMethod: "standard-sets",
      source: "base"
    };
  }

  return {
    id,
    name: "Unknown Movement",
    pattern: "Legacy / Missing",
    defaultMethod: "standard-sets",
    source: "legacy"
  };
}

export function getAllExercises() {
  const generatedExercises = exerciseVariants.map(variant => {
    const resolved = resolveMovementVariant(variant.id);

    return {
      id: variant.id,
      name: resolved?.name || variant.name || "Unknown Movement",
      pattern: resolved?.family?.name || "Generated Movement",
      defaultMethod: variant.defaultMethod || "standard-sets",
      source: "atlas"
    };
  });

  const customExercises = store.data.customExercises.map(exercise => ({
    ...exercise,
    source: "custom",
    pattern: exercise.pattern || exercise.category || "Custom",
    defaultMethod: exercise.defaultMethod || "standard-sets"
  }));

  return [
    ...generatedExercises,
    ...customExercises
  ];
}