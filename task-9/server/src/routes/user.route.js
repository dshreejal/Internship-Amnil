const express = require("express");
const router = express.Router();

const imageUpload = require("../helpers/imageUpload");

const { getUsers, addUser, getOneUser, updateUser, deleteUser, loginUser } = require("../modules/User/user.controller");

const JwtAuthenticationMiddleware = require("../middlewares/JwtAuthentication.middleware");

const yupValidationMiddleware = require("../middlewares/yupValidationMiddleware");

const { newUserSchema, updateUserSchema } = require("../modules/User/validators/userValidators");


//login and signup -Public routes
router.route('/login')
    .post(loginUser)

router.route('/')
    .post(imageUpload.single('image'), yupValidationMiddleware(newUserSchema), addUser)

//authentication middleware
router.use(JwtAuthenticationMiddleware)


//Protected Routes
router.route('/')
    .get(getUsers)

router.route('/:id')
    .get(getOneUser)
    .put(imageUpload.single('image'), yupValidationMiddleware(updateUserSchema), updateUser)
    .delete(deleteUser)

module.exports = router;