const router = require('express').Router();

const { userController } = require('../controllers');
const {
    auth: {
        checkActionToken, checkToken, validatePassword
    },
    user: {
        isExistUser, getUserByDynamicParam, checkUserRole
    },
} = require('../middlewares');
const { userRoles, actionTypes } = require('../../configs');

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

router.post('/user/create_super_admin', userController.createSuperAdmin);

router.post(
    '/user/create_new_admin',
    checkToken(),
    checkUserRole([userRoles.SUPER_ADMIN]),
    userController.createNewAdmin
);

router.post(
    '/user/create_new_admin/confirm',
    validatePassword,
    checkActionToken(actionTypes.CREATE_NEW_ADMIN),
    checkUserRole([userRoles.ADMIN]),
    userController.confirmNewAdmin
);

module.exports = router;
