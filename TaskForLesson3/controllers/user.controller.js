const { NOT_FOUND } = require('../../configs/statusCodes.enum');
const { USER_NOT_FOUND_ERROR } = require('../../configs/messages.enum');
const { getUserByEmail, getUsers } = require('../services/user.service');

module.exports = {
    getUserById: async (req, res) => {
        try {
            const { user_id } = req.params;
            const user = await getUserByEmail(user_id);

            if (!user) {
                res.status(NOT_FOUND).end(USER_NOT_FOUND_ERROR);
                return;
            }

            res.render('user', { title: 'User', email: user.email });
        } catch (err) {
            console.error(err);
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await getUsers();

            res.render('users', { title: 'Users', users });
        } catch (err) {
            console.error(err);
        }
    }
};
