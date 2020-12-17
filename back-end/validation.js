const Joi = require('@hapi/joi')

const registerValidation = (data) => {
    const validationSchema = Joi.object({
        firstName: Joi.string().min(1).required(),
        lastName: Joi.string().min(1).required(),
        phone: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),
        //birthday: Joi.string.min(9),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        //typeOfUser: Joi.string().valid("renter, owner").required()
    }).options({allowUnknown: true})
    return validationSchema.validate(data)
}

const loginValidation = (data) => {
    const validationSchema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return validationSchema.validate(data)
}
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation