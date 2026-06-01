import { exerciseBases } from "../data/exerciseBases.js";
import { exerciseVariants } from "../data/exerciseVariants.js";

import {
  getBaseMovementById,
  getVariantById,
  resolveMovementVariant
} from "../data/movementIndex.js";

export function getAllBaseMovements() {
  return exerciseBases;
}

export function getAllVariants() {
  return exerciseVariants;
}

export function getExerciseById(id) {
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
      family: base.family
    };
  }

  return null;
}

export function getAllExercises() {
  return exerciseVariants.map(variant => ({
    id: variant.id,
    name: variant.name
  }));
}
