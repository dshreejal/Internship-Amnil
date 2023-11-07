const logger = require("../helpers/logger");

const loggerMiddleware = (req, res, next) => {
    logger.info(`Request Initiated : ${req.method} ${req.originalUrl} | Request Body : ${JSON.stringify(req.body)} | Query Params:  ${JSON.stringify(req.query)} |`);
    next();
};


module.exports = loggerMiddleware;