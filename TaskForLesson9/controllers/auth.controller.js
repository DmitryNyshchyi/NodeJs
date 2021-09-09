const { User, OAuth, ActionToken } = require('../dataBase');
const { passwordService, jwtService, emailService } = require('../services');
const {
    statusCodes, constants, messages, emailActions, actionTypes, config
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
            const user = await User.createWithHashPassword(req.body, true);

            res.status(statusCodes.CREATED).json(user);
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
            const { locals: { user } } = req;

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.updateOne({ refresh_token: token }, { ...tokenPair });

            res.json({ ...tokenPair, user });
        } catch (e) {
            next(e);
        }
    },

    sendEmailForgotPassword: async (req, res, next) => {
        try {
            const { locals: { user } } = req;

            const actionToken = jwtService.generateActionToken(actionTypes.FORGOT_PASSWORD);

            await ActionToken.create({ token: actionToken, user: user._id });
            await emailService.sendMail(
                user.email,
                emailActions.FORGOT_PASSWORD,
                {
                    userName: user.name || user.fullName,
                    resetPasswordLink: `${config.FRONTEND_URL}/forgot?token=${actionToken}`
                }
            );

            res.json('Email was sent.');
        } catch (e) {
            next(e);
        }
    },

    setUserNewPassword: async (req, res, next) => {
        try {
            const { locals: { user }, body } = req;
            const token = req.get(constants.AUTHORIZATION);

            const hashedPassword = await passwordService.hash(body.password);

            await User.findByIdAndUpdate(user._id, { password: hashedPassword });
            await ActionToken.deleteOne({ token });
            await OAuth.deleteMany({ user: user._id });

            res.json(messages.OK_SUCCESS);
        } catch (e) {
            next(e);
        }
    },
};
