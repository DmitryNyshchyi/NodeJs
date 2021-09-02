const { User } = require('../dataBase');
const { userNormalizator } = require('../../utils');
const { passwordService } = require('../services');
const { statusCodes } = require('../../configs');

module.exports = {
    postAuth: (req, res, next) => {
        try {
            const { locals: { user } } = req;

            res.render('greeting', { title: `Hi, ${user.email}` });
        } catch (err) {
            next(err);
        }
    },

    postSignup: async (req, res, next) => {
        try {
            const { password } = req.body;
            const hashPassword = await passwordService.hash(password);
            const user = await User.create({ ...req.body, password: hashPassword });
            const normalizedUser = userNormalizator(user);

            res.status(statusCodes.CREATED).json(normalizedUser);
        } catch (err) {
            next(err);
        }
    }
};
