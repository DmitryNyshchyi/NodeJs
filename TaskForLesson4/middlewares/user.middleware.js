const ErrorHandler = require('../errors/ErrorHandler');
const { User } = require('../dataBase');
const { NOT_FOUND, CONFLICT } = require('../../configs/statusCodes.enum');
const { USER_NOT_FOUND_ERROR, USER_EXIST_ERROR } = require('../../configs/messages.enum');

module.exports = {
    isEmailExist: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await User.findOne({ email: email.trim() });

            if (userByEmail) {
                throw new ErrorHandler(CONFLICT, USER_EXIST_ERROR);
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

            const user = await User.findById(user_id || userIdThroughBody);

            if (!user) {
                throw new ErrorHandler(NOT_FOUND, USER_NOT_FOUND_ERROR);
            }

            req.locals = { user };

            next();
        } catch (err) {
            next(err);
        }
    },
};
