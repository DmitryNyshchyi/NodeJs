const { User } = require('../dataBase');

module.exports = {
    getUserById: (req, res, next) => {
        try {
            const { locals: { user } } = req;

            res.render('user', { title: 'User', email: user.email });
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
