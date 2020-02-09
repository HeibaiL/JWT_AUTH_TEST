const Joi = require("@hapi/joi");
const registrationValidation = data => {
  let schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(30)
      .required(),
    login: Joi.string()
      .min(2)
      .max(30),
    password: Joi.string()
      .min(6)
      .max(30)
      .required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] }
      })
      .required()
  });

  return schema.validate({ ...data });
};

const loginValidation = data => {
  let schema = Joi.object({
    login: Joi.string()
      .min(2)
      .max(30),
    password: Joi.string()
      .min(6)
      .max(30)
      .required()
  });

  return schema.validate({ ...data });
};

module.exports.registrationValidation = registrationValidation;
module.exports.loginValidation = loginValidation;
