const { userNormalizator } = require('../../utils');
const { passwordService } = require('../services');

module.exports = {
    isCorrectPassword: async (req, res, next) => {
        try {
            const { password } = req.body;
            const { locals: { user } } = req;

            await passwordService.compare(password, user.password);

            const normalizedUser = userNormalizator(user);

            req.locals = { ...req.locals, user: normalizedUser };

            next();
        } catch (e) {
            next(e);
        }
    },
};
