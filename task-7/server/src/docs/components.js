const userComponent = require('./user/userComponent');
const productComponent = require('./product/productComponent');
const orderComponent = require('./order/orderComponent');

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
            ...productComponent,
            ...orderComponent,
        }
    }
};