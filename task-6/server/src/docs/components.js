const userComponent = require('./user/userComponent');
const productComponent = require('./product/productComponent');

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
            ...productComponent
        }
    }
};