const { sendResponse, HttpStatus } = require('../utils/apiResponse');
const data = require('../utils/seed.js');
const QuizModel = require('../models/quiz.model');


/**
 * @function sendResponse = (res, statusCode, success, data, message, error)
 * Sends an API response with the given data and HTTP status code.
 * @param {Object} res - The response object to send the data back to the client.
 * @param {Number} statusCode - The HTTP status code to send in the response.
 * @param {Boolean} success - Whether the API call was successful or not.
 * @param {Object} data - The data to send in the response.
 * @param {String} message - An optional message to send in the response.
 * @param {Object} error - An optional error object to send in the response.
 */


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