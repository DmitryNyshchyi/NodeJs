const ErrorHandler = require('../errors/ErrorHandler');
const { User } = require('../dataBase');
const { statusCodes, messages } = require('../../configs');
const { userValidator } = require('../validators');

module.exports = {
    isEmailExist: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await User.findOne({ email });

            if (userByEmail) {
                throw new ErrorHandler(statusCodes.CONFLICT, messages.USER_EXIST_ERROR);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserByIdExist: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const { user_id: userIdThroughBody } = req.body;

            const user = await User.findById(user_id || userIdThroughBody).select('+password');

            if (!user) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, messages.USER_NOT_FOUND_ERROR);
            }

            req.locals = { ...req.locals, user };

            next();
        } catch (err) {
            next(err);
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
    }
};
