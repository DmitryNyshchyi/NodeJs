const router = require('express').Router();

const { authController } = require('../controllers');
const {
    auth: { isCorrectPassword },
    user: {
        isUserByIdExist, isEmailExist, isValidUserData, isValidLoginUserData
    }
} = require('../middlewares');

router.post('/', isValidLoginUserData, isUserByIdExist, isCorrectPassword, authController.postAuth);
router.post('/signup', isValidUserData, isEmailExist, authController.postSignup);

module.exports = router;
