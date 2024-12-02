import Joi from "joi";

export const seedSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Description is required",
  }),
  fields: Joi.array(),
});
