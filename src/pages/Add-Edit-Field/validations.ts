import Joi from "joi";

export const fieldSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
  hectare: Joi.number().min(0).required().messages({
    "number.base": "Hectare must be a number",
    "number.min": "Hectare cannot be negative",
  }),
  location: Joi.string().required().messages({
    "string.empty": "Location is required",
  }),
  latitude: Joi.number().required().messages({
    "number.base": "Latitude must be a number",
  }),
  longitude: Joi.number().required().messages({
    "number.base": "Longitude must be a number",
  }),
  isActive: Joi.boolean(),
  image: Joi.string().uri().messages({
    "string.uri": "Image must be a valid URL",
  }),
  ownerId: Joi.string().required().messages({
    "string.empty": "Owner ID is required",
  }),
  seedId: Joi.string().required().messages({
    "string.empty": "Seed ID is required",
  }),
});
