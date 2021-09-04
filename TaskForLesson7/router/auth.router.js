const router = require('express').Router();

const { authController } = require('../controllers');
const {
    auth: { isCorrectPassword },
    user: {
        isUserByIdExist,
        isEmailExist,
        isValidUserData,
        isValidLoginUserData,
        getUserByDynamicParam
    }
} = require('../middlewares');

router.post(
    '/',
    isValidLoginUserData,
    getUserByDynamicParam({ paramName: 'user_id', dbField: '_id', selectArgs: '+password -__v' }),
    isUserByIdExist,
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

module.exports = router;
