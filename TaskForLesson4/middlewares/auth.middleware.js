const ErrorHandler = require('../errors/ErrorHandler');
const { BAD_REQUEST } = require('../../configs/statusCodes.enum');
const {
    NOT_CORRECT_EMAIL_PASSWORD_ERROR,
    NOT_CORRECT_PASSWORD_ERROR,
    NOT_CORRECT_REPEAT_PASSWORD_ERROR
} = require('../../configs/messages.enum');

module.exports = {
    isNotEmptyEmailAndPassword: (req, res, next) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                throw new ErrorHandler(BAD_REQUEST, NOT_CORRECT_EMAIL_PASSWORD_ERROR);
            }

            next();
        } catch (err) {
            next(err);
        }
    },

    isNotEmptyEmailAndPasswordAndRepeatPassword: (req, res, next) => {
        try {
            const { email, password, repeatPassword } = req.body;

            if (!email || !password || !repeatPassword) {
                throw new ErrorHandler(BAD_REQUEST, NOT_CORRECT_EMAIL_PASSWORD_ERROR);
            }

            next();
        } catch (err) {
            next(err);
        }
    },

    isCorrectPassword: (req, res, next) => {
        try {
            const { password } = req.body;
            const { locals: { user } } = req;

            if (user.password !== password) {
                throw new ErrorHandler(BAD_REQUEST, NOT_CORRECT_PASSWORD_ERROR);
            }

            next();
        } catch (err) {
            next(err);
        }
    },

    isCorrectRepeatPassword: (req, res, next) => {
        try {
            const { email, password, repeatPassword } = req.body;

            if (email && password && repeatPassword && password !== repeatPassword) {
                throw new ErrorHandler(BAD_REQUEST, NOT_CORRECT_REPEAT_PASSWORD_ERROR);
            }

            next();
        } catch (err) {
            next(err);
        }
    },
};
