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
  hobbies: Joi.array().items(Joi.string()),
  dob: Joi.date().greater(new Date("1970-01-01")).required(),
  acceptTos: Joi.boolean().truthy(1).valid(true).required(),
  user_role: Joi.number().equal(1, 2, 3, 4).required(),
  nri: Joi.boolean().required(),
  nri_country: Joi.string().when("nri", {
    is: true,
    then: Joi.string().required(),
    otherwise: Joi.string().optional(),
  }),
});

const updateUserSchema = Joi.object().keys({
  first_name: Joi.string(),
  last_name: Joi.string(),
  location: Joi.object().keys({
    address: Joi.string(),
    lat: Joi.number(),
    lng: Joi.number(),
  }),
  hobbies: Joi.array().items(Joi.string()),
  dob: Joi.date().greater(new Date("1970-01-01")).required(),
});

exports.validateSignup = validator(signupSchema);
exports.validateUpdateUser = validator(updateUserSchema);
