const { User, ActionToken, OAuth } = require('../dataBase');
const userUtil = require('../../utils');
const {
    userRoles, config, actionTypes, emailActions, messages
} = require('../../configs');
const { passwordService, jwtService, emailService } = require('../services');

module.exports = {
    getUserById: async (req, res, next) => {
        try {
            const normalizedUser = await userUtil.userNormalizator(req.locals.user)();

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find({});

            res.render('users', { title: 'Users', users });
        } catch (e) {
            next(e);
        }
    },

    createSuperAdmin: async (req, res, next) => {
        try {
            const superAdmin = await User.findOne({ role: userRoles.SUPER_ADMIN });

            if (!superAdmin) {
                const password = await passwordService.hash(config.SUPER_ADMIN_PASSWORD);

                const admin = await User.create({
                    name: userRoles.SUPER_ADMIN,
                    email: config.SUPER_ADMIN_EMAIL,
                    password,
                    role: userRoles.SUPER_ADMIN,
                });

                const normalizedAdmin = await userUtil.userNormalizator(admin)();

                res.json(normalizedAdmin);
            }
        } catch (e) {
            next(e);
        }
    },

    createNewAdmin: async (req, res, next) => {
        try {
            const { locals: { user }, body: { email } } = req;

            const actionToken = jwtService.generateActionToken(actionTypes.CREATE_NEW_ADMIN);
            const password = await passwordService.hash(email);

            const admin = await User.create({
                name: email,
                email,
                password,
                role: userRoles.ADMIN,
            });

            await ActionToken.create({ token: actionToken, user: admin._id });
            await emailService.sendMail(
                email,
                emailActions.CREATE_NEW_ADMIN,
                {
                    userName: user.name || user.fullName,
                    resetPasswordLink: `${config.FRONTEND_URL}/create_new_admin?token=${actionToken}`
                }
            );

            res.json('Email was sent.');
        } catch (e) {
            next(e);
        }
    },

    confirmNewAdmin: async (req, res, next) => {
        try {
            const { locals: { user, token }, body: { password } } = req;

            const hashedPassword = await passwordService.hash(password);

            await User.findByIdAndUpdate(user._id, { password: hashedPassword });
            await ActionToken.deleteOne({ token });
            await OAuth.deleteMany({ user: user._id });

            res.json(messages.OK_SUCCESS);
        } catch (e) {
            next(e);
        }
    }
};
