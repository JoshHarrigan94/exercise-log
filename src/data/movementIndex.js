import { movementFamilies } from "./movementFamilies.js";
import { expressionTypes } from "./expressionTypes.js";
import { modifierTypes } from "./modifierTypes.js";
import { exerciseBases } from "./exerciseBases.js";
import { exerciseVariants } from "./exerciseVariants.js";

export function getMovementFamilyById(id) {
  return movementFamilies.find(family => family.id === id) || null;
}

export function getExpressionById(id) {
  return expressionTypes.find(expression => expression.id === id) || null;
}

export function getModifierById(id) {
  return modifierTypes.find(modifier => modifier.id === id) || null;
}

export function getBaseMovementById(id) {
  return exerciseBases.find(base => base.id === id) || null;
}

export function getVariantById(id) {
  return exerciseVariants.find(variant => variant.id === id) || null;
}

export function getVariantsForBase(baseMovementId) {
  return exerciseVariants.filter(
    variant => variant.baseMovementId === baseMovementId || variant.base === baseMovementId
  );
}

export function getBaseMovementForVariant(variantId) {
  const variant = getVariantById(variantId);
  if (!variant) return null;

  return getBaseMovementById(
    variant.baseMovementId || variant.base
  );
}

export function resolveMovementVariant(variantId) {
  const variant = getVariantById(variantId);

  if (!variant) return null;

  const base = getBaseMovementById(
    variant.baseMovementId || variant.base
  );

  const family = base
    ? getMovementFamilyById(base.family)
    : null;

  const modifiers = (variant.modifiers || [])
    .map(getModifierById)
    .filter(Boolean);

  const baseExpressions = [
    ...(base?.primaryExpressions || []),
    ...(base?.secondaryExpressions || [])
  ];

  const variantExpressions = variant.expressions || [];

  const expressionIds = Array.from(
    new Set([
      ...baseExpressions,
      ...variantExpressions,
      ...Object.keys(variant.expressionAdjustments || {})
    ])
  );

  const expressions = expressionIds
    .map(getExpressionById)
    .filter(Boolean);

  const measurableOutputs = Array.from(
    new Set([
      ...(base?.measurableOutputs || []),
      ...(variant.measurableOutputs || []),
      ...(variant.measurableOutputOverrides || []),
      ...modifiers.flatMap(modifier =>
        modifier.effects?.outputAdjustments || []
      )
    ])
  );

  return {
    id: variant.id,
    name: variant.name,
    variant,
    base,
    family,
    modifiers,
    expressions,
    measurableOutputs
  };
}

export function searchMovementVariants(query = "") {
  const term = query.toLowerCase().trim();

  if (!term) return exerciseVariants;

  return exerciseVariants.filter(variant => {
    const base = getBaseMovementById(
      variant.baseMovementId || variant.base
    );

    return [
      variant.name,
      variant.id,
      base?.name,
      base?.family,
      ...(variant.modifiers || []),
      ...(variant.expressions || [])
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(term);
  });
}

export function getVariantsByExpression(expressionId) {
  return exerciseVariants.filter(variant => {
    const resolved = resolveMovementVariant(variant.id);

    return resolved?.expressions.some(
      expression => expression.id === expressionId
    );
  });
}

export function getVariantsByFamily(familyId) {
  return exerciseVariants.filter(variant => {
    const resolved = resolveMovementVariant(variant.id);

    return resolved?.family?.id === familyId;
  });
}
