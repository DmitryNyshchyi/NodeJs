const ErrorHandler = require('../errors/ErrorHandler');
const { User } = require('../dataBase');
const { statusCodes, messages } = require('../../configs');
const { userValidator } = require('../validators');

module.exports = {
    isEmailExist: (req, res, next) => {
        try {
            const { user } = req.locals;

            if (user) {
                throw new ErrorHandler(statusCodes.CONFLICT, messages.USER_EXIST_ERROR);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserByIdExist: (req, res, next) => {
        try {
            const { user } = req.locals;

            if (!user) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, messages.USER_NOT_FOUND_ERROR);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isValidUserData: (req, res, next) => {
        try {
            const { error, value } = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isValidLoginUserData: (req, res, next) => {
        try {
            const { error, value } = userValidator.loginUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (roleArr = []) => (req, res, next) => {
        try {
            const { role } = req.user;

            if (!roleArr.length) {
                return next();
            }

            if (roleArr.indexOf(role) === -1) {
                throw new ErrorHandler(statusCodes.FORBIDDEN, messages.FORBIDDEN_ERROR);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    getUserByDynamicParam: ({
        paramName, searchIn = 'body', dbField = paramName, selectArgs = ''
    }) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const user = await User.findOne({ [dbField]: value }).select(selectArgs);

            req.locals = { ...req.locals, user };

            next();
        } catch (e) {
            next(e);
        }
    }
};
