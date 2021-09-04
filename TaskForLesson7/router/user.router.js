const router = require('express').Router();

const { userController } = require('../controllers');
const { isUserByIdExist, getUserByDynamicParam } = require('../middlewares/user.middleware');

router.get(
    '/user/:user_id',
    getUserByDynamicParam({
        paramName: 'user_id',
        searchIn: 'params',
        dbField: '_id',
        selectArgs: '+password -__v'
    }),
    isUserByIdExist,
    userController.getUserById
);

router.get('/', userController.getAllUsers);

module.exports = router;
