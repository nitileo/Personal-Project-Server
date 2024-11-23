const Joi = require("joi");
const createError = require("../utils/create-error");

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: false })
    .required()
    .messages({ "string.empty": "Email is required" }),
  password: Joi.string()
    .required()
    .pattern(/^[0-9a-zA-Z]{6,}$/)
    .messages({
      "string.empty": "Password is required!!",
      "string.pattern":
        "Password must contain a-z A-Z  0-9 and must be 6 at least characters",
    }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "string.empty": "Confirm Password Incorrect",
    "any.only": "Password and confirm Password id not match",
  }),
  firstName: Joi.string()
    .required()
    .messages({ "string.empty": "Firstname is required" }),
  lastName: Joi.string()
    .required()
    .messages({ "string.empty": "Lastname is required" }),
  phone: Joi.string()
    .required()
    .messages({ "string.empty": "Phone number is required" }),
});

const loginSchema = Joi.object({
  email: Joi.string().required().trim().email(),
  password: Joi.string().required(),
});

const validateSchema = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);
  if (error) {
    return createError(400, error.details[0].message);
  }
  req.input = value;
  next();
};

exports.registerValidator = validateSchema(registerSchema);
exports.loginValidator = validateSchema(loginSchema);
