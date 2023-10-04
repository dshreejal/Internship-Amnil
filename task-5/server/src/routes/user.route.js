const express = require("express");
const router = express.Router();

const imageUpload = require("../helpers/imageUpload");

const { getUsers, addUser, getOneUser, updateUser, deleteUser } = require("../modules/User/user.controller");


router.route('/')
    .get(getUsers)
    .post(imageUpload.single('image'), addUser)

router.route('/:id')
    .get(getOneUser)
    .put(imageUpload.single('image'), updateUser)
    .delete(deleteUser)

module.exports = router;