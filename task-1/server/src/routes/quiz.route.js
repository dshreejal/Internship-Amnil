const express = require("express");
const router = express.Router();
const { seedData, getQuiz } = require("../controllers/quiz.controller");


router.route("/")
    .post(seedData)
    .get(getQuiz)

module.exports = router;