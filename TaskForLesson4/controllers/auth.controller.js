const { CREATED } = require('../../configs/statusCodes.enum');
const { User } = require('../dataBase');

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
            const { email, password } = req.body;

            const user = await User.create({ email, password });

            res.status(CREATED).json(user);
        } catch (err) {
            next(err);
        }
    }
};
