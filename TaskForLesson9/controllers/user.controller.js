const { User } = require('../dataBase');
const userUtil = require('../../utils');

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
    }
};
