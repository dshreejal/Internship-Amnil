const { sendResponse, HttpStatus } = require('../utils/apiResponse');
const data = require('../utils/seed.js');
const QuizModel = require('../models/quiz.model');

//funciton to seed data to the database for easier testing in development environment. 
//TODO: remove this function in production and replace with CRUD operation.
exports.seedData = async (req, res) => {
    try {
        const quizData = await QuizModel.find();
        if (quizData.length > 0) {
            return sendResponse(res, HttpStatus.OK, true, [], "Data already seeded", null);
        }
        await QuizModel.insertMany(data);
        sendResponse(res, HttpStatus.CREATED, true, data, "Data seeded successfully", null);

    } catch (error) {
        console.log("Some error occured", error.message);
    }
}


//function to get all the quiz data from the database.
exports.getQuiz = async (req, res) => {
    try {
        const quizData = await QuizModel.find();
        if (quizData.length === 0) {
            return sendResponse(res, HttpStatus.NOT_FOUND, false, [], "No data found", null);
        }
        sendResponse(res, HttpStatus.OK, true, quizData, "Data fetched successfully", null);
    } catch (error) {
        console.log("Some error occured", error.message);
    }
}