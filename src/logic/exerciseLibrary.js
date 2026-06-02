import { exerciseBases } from "../data/exerciseBases.js";
import { exerciseVariants } from "../data/exerciseVariants.js";
import { movementFamilies } from "../data/movementFamilies.js";
import { expressionTypes } from "../data/expressionTypes.js";
import { store } from "../state/store.js";
import { getMethodCompatibility } from "./methodCompatibility.js";
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
    variants
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
  const variant = getVariantById(variantId);

  if (!variant) {
    return {
      recommended: [],
      possible: [],
      limited: []
    };
  }

  const base = getBaseMovementById(variant.baseMovementId);

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
  const customExercise = store.data.customExercises.find(
    exercise => exercise.id === id
  );

  if (customExercise) {
    return customExercise;
  }

  const variant = getVariantById(id);

  if (variant) {
    return resolveMovementVariant(id);
  }

  const base = getBaseMovementById(id);

  if (base) {
    return {
      id: base.id,
      name: base.name,
      base,
      family: base.family,
      pattern: formatFamilyName(base.family),
      defaultMethod: "standard-sets"
    };
  }

  return null;
}

export function getAllExercises() {
  const generatedExercises = exerciseVariants.map(variant => {
    const resolved = resolveMovementVariant(variant.id);

    return {
      id: variant.id,
      name: variant.name,
      pattern: resolved?.family?.name || "Generated Movement",
      defaultMethod: "standard-sets",
      source: "atlas"
    };
  });

  const customExercises = store.data.customExercises.map(exercise => ({
    ...exercise,
    source: "custom"
  }));

  return [
    ...generatedExercises,
    ...customExercises
  ];
}