const express = require("express");
const router = express.Router();

const imageUpload = require("../helpers/imageUpload");

const { getUsers, addUser, getOneUser, updateUser, deleteUser, loginUser } = require("../modules/User/user.controller");
const JwtAuthenticationMiddleware = require("../middlewares/JwtAuthentication.middleware");



router.route('/login')
    .post(loginUser)

router.route('/')
    .post(imageUpload.single('image'), addUser)

router.use(JwtAuthenticationMiddleware)

router.route('/')
    .get(getUsers)

router.route('/:id')
    .get(getOneUser)
    .put(imageUpload.single('image'), updateUser)
    .delete(deleteUser)

module.exports = router;