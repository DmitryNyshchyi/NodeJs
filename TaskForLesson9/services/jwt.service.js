const jwt = require('jsonwebtoken');

const ErrorHandler = require('../errors/ErrorHandler');
const { statusCodes, config, messages } = require('../../configs');

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
    }
};
