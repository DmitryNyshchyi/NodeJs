const { userNormalizator } = require('../../utils');
const { passwordService, jwtService } = require('../services');
const ErrorHandler = require('../../TaskForLesson4/errors/ErrorHandler');
const {
    statusCodes,
    constants,
    messages,
} = require('../../configs');
const { OAuth, ActionToken } = require('../dataBase');
const { userValidator } = require('../validators');

module.exports = {
    isCorrectPassword: async (req, res, next) => {
        try {
            const { locals: { user }, body: { password } } = req;

            // await user.validatePassword(password); // TODO FMI validatePassword
            await passwordService.compare(password, user.password);

            req.locals = { ...req.locals, user: await userNormalizator(user)() };

            next();
        } catch (e) {
            next(e);
        }
    },

    checkToken: (tokenType = 'access') => async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(statusCodes.UNAUTHORIZED, messages.NO_TOKEN_ERROR);
            }

            await jwtService.verifyToken(token, tokenType);

            const tokenDB = await OAuth.findOne({ [`${tokenType}_token`]: token });

            if (!tokenDB) {
                throw new ErrorHandler(statusCodes.UNAUTHORIZED, messages.INVALID_TOKEN_ERROR);
            }

            req.locals = { ...req.locals, currentUser: tokenDB.user };

            next();
        } catch (e) {
            next(e);
        }
    },

    checkActionToken: (tokenType = 'access') => async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(statusCodes.UNAUTHORIZED, messages.NO_TOKEN_ERROR);
            }

            await jwtService.verifyActionToken(tokenType, token);

            const tokenDB = await ActionToken.findOne({ token });

            if (!tokenDB) {
                throw new ErrorHandler(statusCodes.UNAUTHORIZED, messages.INVALID_TOKEN_ERROR);
            }

            req.locals = { ...req.locals, currentUser: tokenDB.user };

            next();
        } catch (e) {
            next(e);
        }
    },

    validatePassword: (req, res, next) => {
        try {
            const { error, value } = userValidator.passwordValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },
};
