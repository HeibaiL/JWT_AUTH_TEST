const Joi = require("@hapi/joi");
const registrationValidation=(data)=>{
    const { name, login, password, email } = data;
    let schema = Joi.object({
        name: Joi.string()
    .min(6)
    .max(30)
    .required(),
  login: Joi.string()
    .min(2)
    .max(30),
  password: Joi.string()
    .min(6)
    .max(30)
    .required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] }
  })
});

return schema.validate({ name,login,password,email});
}
module.exports.registrationValidation = registrationValidation;