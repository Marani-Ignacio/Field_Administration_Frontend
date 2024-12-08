import Joi from "joi";

export const seedSchema = Joi.object({
  name: Joi.string().min(3).max(250).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must not exceed 250 characters",
  }),
  description: Joi.string().allow("").optional().messages({
    "string.base": "Description must be a string",
  }),
  fields: Joi.array().items(Joi.string()).optional().messages({
    "array.base": "Fields must be an array",
    "string.base": "Each field must be a string",
  }),
});
