const jwt = require('jsonwebtoken');

const ErrorHandler = require('../errors/ErrorHandler');
const {
    statusCodes, config, messages, actionTypes
} = require('../../configs');

module.exports = {
    generateTokenPair: () => ({
        access_token: jwt.sign({}, config.ACCESS_TOKEN_SECRET, { expiresIn: '15m' }),
        refresh_token: jwt.sign({}, config.REFRESH_TOKEN_SECRET, { expiresIn: '30d' }),
    }),

    verifyToken: (token, tokenType = 'access') => {
        try {
            const secret = config[tokenType === 'access' ? 'ACCESS_TOKEN_SECRET' : 'REFRESH_TOKEN_SECRET'];

            jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(statusCodes.UNAUTHORIZED, messages.INVALID_TOKEN_ERROR);
        }
    },

    generateActionToken: (tokenType = actionTypes.FORGOT_PASSWORD) => {
        let secretWord = '';

        switch (tokenType) {
            case actionTypes.FORGOT_PASSWORD:
                secretWord = config.FORGOT_PASSWORD_TOKEN_SECRET;
                break;
            case actionTypes.CREATE_NEW_ADMIN:
                secretWord = config.CREATE_NEW_ADMIN_TOKEN_SECRET;
                break;
            default:
                throw new ErrorHandler(statusCodes.SERVER_ERROR, messages.WRONG_TOKEN_TYPE_ERROR);
        }

        return jwt.sign({ tokenType }, secretWord, { expiresIn: '7d' });
    },

    verifyActionToken: (tokenType = config.FORGOT_PASSWORD_TOKEN_SECRET, token) => {
        try {
            let secretWord = '';

            switch (tokenType) {
                case actionTypes.FORGOT_PASSWORD:
                    secretWord = config.FORGOT_PASSWORD_TOKEN_SECRET;
                    break;
                case actionTypes.CREATE_NEW_ADMIN:
                    secretWord = config.CREATE_NEW_ADMIN_TOKEN_SECRET;
                    break;
                default:
                    throw new ErrorHandler(statusCodes.SERVER_ERROR, messages.WRONG_TOKEN_TYPE_ERROR);
            }

            jwt.verify(token, secretWord);
        } catch (e) {
            throw new ErrorHandler(statusCodes.UNAUTHORIZED, messages.INVALID_TOKEN_ERROR);
        }
    },
};
