const router = require('express').Router();

const { authController } = require('../controllers');
const {
    auth: {
        isCorrectPassword,
        checkToken
    },
    file: {
        checkUserAvatar
    },
    user: {
        isExistUser,
        isEmailExist,
        isValidUserData,
        isValidLoginUserData,
        getUserByDynamicParam
    }
} = require('../middlewares');
const { checkActionToken, validatePassword } = require('../middlewares/auth.middleware');
const { actionTypes } = require('../../configs');

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
    checkUserAvatar,
    getUserByDynamicParam({ paramName: 'email' }),
    isEmailExist,
    authController.postSignup
);

router.post('/sign-out', checkToken(), authController.postSignOut);

router.post('/refresh', checkToken('refresh'), authController.refreshToken);

router.post(
    '/password/forgot',
    getUserByDynamicParam({ paramName: 'email' }),
    isExistUser,
    authController.sendEmailForgotPassword
);

router.post(
    '/password/forgot/set',
    validatePassword,
    checkActionToken(actionTypes.FORGOT_PASSWORD),
    authController.setUserNewPassword
);

module.exports = router;
