const userComponent = require('./user/userComponent');

module.exports = {
    components: {
        securitySchemes: {
            Bearer: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        },
        schemas: {
            ApiResponse: {
                type: "object",
                properties: {
                    success: {
                        type: "boolean"
                    },
                    data: {
                        type: "object"
                    },
                    message: {
                        type: "string"
                    },
                    error: {
                        type: "object"
                    }
                }
            },
            ErrorResponse: {
                type: "object",
                properties: {
                    success: {
                        type: "boolean",
                        example: false
                    },
                    data: {
                        type: "object",
                        example: null
                    },
                    message: {
                        type: "string"
                    },
                    error: {
                        type: "object"
                    }
                }
            },
            ...userComponent,
        }
    }
};