const router = require('express').Router();

const { userController } = require('../controllers');

router.get('/user/:user_id', userController.getUserById);
router.get('/', userController.getAllUsers);

module.exports = router;
