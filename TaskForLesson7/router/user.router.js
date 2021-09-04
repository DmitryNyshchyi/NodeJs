const router = require('express').Router();

const { userController } = require('../controllers');
const {
    user: { isExistUser, getUserByDynamicParam },
} = require('../middlewares');

router.get(
    '/user/:user_id',
    getUserByDynamicParam({
        paramName: 'user_id',
        searchIn: 'params',
        dbField: '_id',
        selectArgs: '+password -__v'
    }),
    isExistUser,
    userController.getUserById
);

router.get('/', userController.getAllUsers);

module.exports = router;
