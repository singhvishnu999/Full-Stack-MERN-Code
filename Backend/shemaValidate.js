const Joi = require('joi')

module.exports.userSchema = Joi.object(
    {
    role:Joi.string().required(),
    name:Joi.string().required(),
    contact: Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(15),
    Cpassword: Joi.ref("password"),
})

//  = userSchema;