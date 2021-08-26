const router = require('express').Router();

const { authController } = require('../controllers');

router.post('/', authController.postAuth);
router.post('/signup', authController.postSignup);

module.exports = router;
