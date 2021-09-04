const router = require('express').Router();

const { authController } = require('../controllers');
const {
    auth: {
        isCorrectPassword,
        checkToken
    },
    user: {
        isExistUser,
        isEmailExist,
        isValidUserData,
        isValidLoginUserData,
        getUserByDynamicParam
    }
} = require('../middlewares');

router.post(
    '/',
    isValidLoginUserData,
    getUserByDynamicParam({ paramName: 'email', selectArgs: '+password -__v' }),
    isExistUser,
    isCorrectPassword,
    authController.postAuth
);

router.post(
    '/signup',
    isValidUserData,
    getUserByDynamicParam({ paramName: 'email' }),
    isEmailExist,
    authController.postSignup
);

router.post('/sign-out', checkToken(), authController.postSignOut);

router.post('/refresh', checkToken('refresh'), authController.refreshToken);

module.exports = router;
