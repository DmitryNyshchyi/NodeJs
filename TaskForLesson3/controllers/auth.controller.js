const {
    NOT_CORRECT_EMAIL_PASSWORD_ERROR,
    USER_NOT_FOUND_ERROR,
    NOT_CORRECT_PASSWORD_ERROR,
    NOT_CORRECT_REPEAT_PASSWORD_ERROR,
    USER_EXIST_ERROR,
    CREATED_SUCCESS
} = require('../../configs/messages.enum');
const {
    CONFLICT, CREATED, BAD_REQUEST, NOT_FOUND
} = require('../../configs/statusCodes.enum');
const {
    getUsers, setUsers, getUserByEmail, getUserByEmailInArray
} = require('../services/user.service');

module.exports = {
    postAuth: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(BAD_REQUEST).end(NOT_CORRECT_EMAIL_PASSWORD_ERROR);
                return;
            }

            const user = await getUserByEmail(email);

            if (!user) {
                res.status(NOT_FOUND).end(USER_NOT_FOUND_ERROR);
                return;
            }

            if (user.password !== password) {
                res.status(BAD_REQUEST).end(NOT_CORRECT_PASSWORD_ERROR);
                return;
            }

            res.render('greeting', { title: `Hi, ${user.email}` });
        } catch (err) {
            console.error(err);
        }
    },

    postSignup: async (req, res) => {
        try {
            const { email, password, repeatPassword } = req.body;

            if (!email || !password || !repeatPassword) {
                res.status(BAD_REQUEST).end(NOT_CORRECT_EMAIL_PASSWORD_ERROR);
                return;
            }

            if (email && password && repeatPassword && password !== repeatPassword) {
                res.status(BAD_REQUEST).end(NOT_CORRECT_REPEAT_PASSWORD_ERROR);
                return;
            }

            const users = await getUsers();
            const user = getUserByEmailInArray(email, users);

            if (user) {
                res.status(CONFLICT).end(USER_EXIST_ERROR);
                return;
            }

            await users.push({ email, password });
            await setUsers(users);

            res.status(CREATED).end(CREATED_SUCCESS);
        } catch (err) {
            console.error(err);
        }
    }
};
