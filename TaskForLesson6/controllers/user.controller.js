const { User } = require('../dataBase');

module.exports = {
    getUserById: (req, res, next) => {
        try {
            const { locals: { user } } = req;
            res.render('user', { title: 'User', email: user.email });
        } catch (err) {
            next(err);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find({});

            res.render('users', { title: 'Users', users });
        } catch (err) {
            next(err);
        }
    }
};
