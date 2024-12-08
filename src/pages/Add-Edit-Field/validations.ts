import Joi from "joi";

export const fieldSchema = Joi.object({
  name: Joi.string().min(3).max(250).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must not exceed 250 characters",
  }),
  hectare: Joi.number().required().messages({
    "number.base": "Hectare must be a number",
    "any.required": "Hectare is required",
  }),
  location: Joi.string().min(5).max(250).required().messages({
    "string.empty": "Location is required",
    "string.min": "Location must be at least 5 characters long",
    "string.max": "Location must not exceed 250 characters",
  }),
  latitude: Joi.number().required().messages({
    "number.base": "Latitude must be a number",
    "any.required": "Latitude is required",
  }),
  longitude: Joi.number().required().messages({
    "number.base": "Longitude must be a number",
    "any.required": "Longitude is required",
  }),
  isActive: Joi.boolean().optional().default(true).messages({
    "boolean.base": "IsActive must be a boolean value",
  }),
  ownerId: Joi.string().required().messages({
    "string.empty": "Owner ID is required",
    "any.required": "Owner ID is required",
  }),
  seedId: Joi.string().required().messages({
    "string.empty": "Seed ID is required",
    "any.required": "Seed ID is required",
  }),
});
