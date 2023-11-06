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
            ...userComponent,
        }
    }
};