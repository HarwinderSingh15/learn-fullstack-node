const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const signupSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(15).required(),
  password: Joi.string().min(8).max(12).required(),
  email: Joi.string().email().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  location: Joi.object().keys({
    address: Joi.string().required(),
    lat: Joi.number().required(),
    lng: Joi.number().required(),
  }),
  dob: Joi.string().required(),
});

exports.validateSignup = validator(signupSchema);