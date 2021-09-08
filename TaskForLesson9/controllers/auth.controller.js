const { User, OAuth } = require('../dataBase');
const { userNormalizator } = require('../../utils');
const { passwordService, jwtService, emailService } = require('../services');
const {
    statusCodes, constants, messages, emailActions
} = require('../../configs');

module.exports = {
    postAuth: async (req, res, next) => {
        try {
            const { locals: { user } } = req;

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.create({ ...tokenPair, user: user._id });

            res.json({ ...tokenPair, user });

            await emailService.sendMail('nyshchyi.dmitry@gmail.com', emailActions.WELCOME, { userName: 'Dmytro' });
        } catch (e) {
            next(e);
        }
    },

    postSignup: async (req, res, next) => {
        try {
            const { password } = req.body;
            const hashPassword = await passwordService.hash(password);
            const user = await User.create({ ...req.body, password: hashPassword });
            const normalizedUser = userNormalizator(user)();

            res.status(statusCodes.CREATED).json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    postSignOut: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            await OAuth.deleteOne({ access_token: token });

            res.status(statusCodes.NO_CONTENT).json(messages.OK_SUCCESS);

            await emailService.sendMail('nyshchyi.dmitry@gmail.com', emailActions.GOODBYE, { userName: 'Dmytro' });
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);
            const { locals: { currentUser } } = req;

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.updateOne({ refresh_token: token }, { ...tokenPair });

            res.json({ ...tokenPair, user: currentUser });
        } catch (e) {
            next(e);
        }
    },
};
