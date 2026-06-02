export function validateCustomMovement(input) {
  const errors = [];

  if (!input.name?.trim()) {
    errors.push("Movement name is required.");
  }

  if (!input.category) {
    errors.push("Closest family is required.");
  }

  if (!input.primaryExpression) {
    errors.push("Primary expression is required.");
  }

  if (!input.defaultMethod) {
    errors.push("Default method is required.");
  }

  if (!input.movementType) {
    errors.push("Movement type is required.");
  }

  if (!input.measurableOutputs?.length) {
    errors.push("Add at least one tracked output.");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function normaliseCustomMovement(input) {
  return {
    ...input,
    name: input.name.trim(),
    pattern: input.pattern?.trim() || "Custom",
    equipment: input.equipment || [],
    measurableOutputs: input.measurableOutputs || ["reps"],
    cues: input.cues || []
  };
}