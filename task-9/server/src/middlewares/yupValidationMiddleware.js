const logger = require("../helpers/logger");

const yupValidationMiddleware = (schema) => async (req, res, next) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = yupValidationMiddleware;