const express = require('express');
const router = express.Router();

const authController = require('../modules/Auth/auth.controller');
const FirebaseAuthenticationMiddleware = require('../middlewares/FirebaseAuthentication.middleware')

router.post('/register', authController.register);
router.post('/login', authController.login);


//firebase authentication middleware
router.use(FirebaseAuthenticationMiddleware);


//private route
router.get('/:userId', authController.getUser);
module.exports = router;