import Joi from "joi";

export const signUpSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
  lastName: Joi.string().required().messages({
    "string.empty": "Last name is required",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Invalid email",
    }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must have at least 6 characters",
  }),
  repeatPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "string.empty": "Repeat password is required",
    "any.only": "The passwords do not match",
  }),
  birthDate: Joi.date().iso().required().messages({
    "date.base": "Birth date must be a valid date",
    "any.required": "Birth date is required",
  }),
  dni: Joi.number().integer().required().messages({
    "number.base": "DNI must be a number",
    "number.integer": "DNI must be an integer",
    "any.required": "DNI is required",
  }),
});
