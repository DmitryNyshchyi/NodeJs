const Joi = require('joi');

const { userRoles, constants } = require('../../configs');

module.exports = {
    createUserValidator: Joi.object({
        name: Joi.string().trim().alphanum().min(1)
            .max(30),
        email: Joi.string().regex(constants.EMAIL_REGEXP).trim().required(),
        password: Joi.string().trim().min(6).max(30)
            .regex(constants.PASSWORD_REGEXP)
            .required(),
        repeatPassword: Joi.any().equal(Joi.ref('password')).required(),
        role: Joi.string().allow(...Object.values(userRoles)),
    }),

    loginUserValidator: Joi.object({
        email: Joi.string().regex(constants.EMAIL_REGEXP).trim().required(),
        password: Joi.string().trim().min(6).max(30)
            .regex(constants.PASSWORD_REGEXP)
            .required(),
    }),

    passwordValidator: Joi.object({
        password: Joi.string().trim().min(6).max(30)
            .regex(constants.PASSWORD_REGEXP)
            .required(),
    }),
};
