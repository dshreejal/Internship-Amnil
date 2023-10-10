const express = require('express');
const router = express.Router();

const authController = require('../modules/Auth/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/google-signin', authController.googleSignin);
module.exports = router;