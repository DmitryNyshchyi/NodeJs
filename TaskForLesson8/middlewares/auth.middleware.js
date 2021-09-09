const { userNormalizator } = require('../../utils');
const { passwordService, jwtService } = require('../services');
const ErrorHandler = require('../../TaskForLesson4/errors/ErrorHandler');
const {
    statusCodes,
    constants,
    messages,
    dataBaseTables
} = require('../../configs');
const { OAuth } = require('../dataBase');

module.exports = {
    isCorrectPassword: async (req, res, next) => {
        try {
            const { locals: { user }, body: { password } } = req;

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

            const tokenDB = await OAuth.findOne({ [`${tokenType}_token`]: token }).populate(dataBaseTables.USER);

            if (!tokenDB) {
                throw new ErrorHandler(statusCodes.UNAUTHORIZED, messages.INVALID_TOKEN_ERROR);
            }

            req.locals = { ...req.locals, user: tokenDB.user };

            next();
        } catch (e) {
            next(e);
        }
    },
};
