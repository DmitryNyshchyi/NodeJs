const router = require('express').Router();

const { userController } = require('../controllers');
const { isUserByIdExist } = require('../middlewares/user.middleware');

router.get('/user/:user_id', isUserByIdExist, userController.getUserById);
router.get('/', userController.getAllUsers);

module.exports = router;
