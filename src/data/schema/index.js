import { expressionSchema } from "./expressionSchema.js";
import { movementSchema } from "./movementSchema.js";
import { modifierSchema } from "./modifierSchema.js";
import { variantSchema } from "./variantSchema.js";
import { programSchema } from "./programSchema.js";
import { blockSchema } from "./blockSchema.js";

export {
  expressionSchema,
  movementSchema,
  modifierSchema,
  variantSchema,
  programSchema,
  blockSchema
};

export const dataSchemas = {
  expression: expressionSchema,
  movement: movementSchema,
  modifier: modifierSchema,
  variant: variantSchema,
  program: programSchema,
  block: blockSchema
};
