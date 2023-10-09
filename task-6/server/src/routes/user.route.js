const express = require("express");
const router = express.Router();

const imageUpload = require("../helpers/imageUpload");

const { getUsers, addUser, getOneUser, updateUser, deleteUser, loginUser } = require("../modules/User/user.controller");
const JwtAuthenticationMiddleware = require("../middlewares/JwtAuthentication.middleware");
const BasicAuthenticationMiddleware = require("../middlewares/BasicAuthentication.middleware");


//login and signup -Public routes
router.route('/login')
    .post(loginUser)

router.route('/')
    .post(imageUpload.single('image'), addUser)

//authentication middleware
router.use(JwtAuthenticationMiddleware)
// router.use(BasicAuthenticationMiddleware)

//Protected Routes
router.route('/')
    .get(getUsers)

router.route('/:id')
    .get(getOneUser)
    .put(imageUpload.single('image'), updateUser)
    .delete(deleteUser)

module.exports = router;