const express = require("express");
const router = express.Router();

const imageUpload = require("../helpers/imageUpload");

const { getUsers, addUser, getOneUser, updateUser, deleteUser, loginUser } = require("../modules/User/user.controller");

const JwtAuthenticationMiddleware = require("../middlewares/JwtAuthentication.middleware");

const yupValidationMiddleware = require("../middlewares/yupValidationMiddleware");

const { newUserSchema, updateUserSchema, idValidationSchema, getUsersSchema } = require("../modules/User/validators/userValidators");


//login and signup -Public routes
router.route('/login')
    .post(loginUser)

router.route('/')
    .post(imageUpload.single('image'), yupValidationMiddleware(newUserSchema), addUser)

//authentication middleware
router.use(JwtAuthenticationMiddleware)


//Protected Routes
router.route('/')
    .get(yupValidationMiddleware(getUsersSchema), getUsers)

router.route('/:id')
    .get(yupValidationMiddleware(idValidationSchema), getOneUser)
    .put(imageUpload.single('image'), yupValidationMiddleware(updateUserSchema), updateUser)
    .delete(yupValidationMiddleware(idValidationSchema), deleteUser)

module.exports = router;