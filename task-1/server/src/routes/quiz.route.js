const express = require("express");
const router = express.Router();
const { seedData } = require("../controllers/quiz.controller");


router.route("/").post(seedData);

module.exports = router;