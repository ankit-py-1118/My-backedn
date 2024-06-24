const Joi = require("joi");

var passwordRegex = /^[0-9A-Za-z]{6,16}$/;

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required().regex(RegExp(passwordRegex)).max(25).min(5),
	name: Joi.string().min(1)
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required().regex(RegExp(passwordRegex)).max(25).min(5),
});

module.exports = {
  authSchema,
  loginSchema,
};
