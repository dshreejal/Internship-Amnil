const HttpStatus = require('http-status');

/**
 * Sends an API response with the given data and HTTP status code.
 * @param {Object} res - The response object to send the data back to the client.
 * @param {Number} statusCode - The HTTP status code to send in the response.
 * @param {Boolean} success - Whether the API call was successful or not.
 * @param {Object} data - The data to send in the response.
 * @param {String} message - An optional message to send in the response.
 * @param {Object} error - An optional error object to send in the response.
 */
exports.sendResponse = (res, statusCode, success, data, message, error) => {
    const responseData = {
        success: success,
        data: data,
        message: message,
        error: error
    };
    res.status(statusCode).json(responseData);
};

exports.HttpStatus = HttpStatus;