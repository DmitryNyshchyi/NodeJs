const router = require('express').Router();

const { authController } = require('../controllers');
const {
    isNotEmptyEmailAndPassword,
    isCorrectPassword,
    isNotEmptyEmailAndPasswordAndRepeatPassword,
    isCorrectRepeatPassword
} = require('../middlewares/auth.middleware');
const { isUserByIdExist, isEmailExist } = require('../middlewares/user.middleware');

router.post('/', isNotEmptyEmailAndPassword, isUserByIdExist, isCorrectPassword, authController.postAuth);
router.post(
    '/signup',
    isNotEmptyEmailAndPasswordAndRepeatPassword,
    isCorrectRepeatPassword,
    isEmailExist,
    authController.postSignup
);

module.exports = router;
