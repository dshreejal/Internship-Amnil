const userComponent = require('./user/userComponent');
const authComponent = require('./auth/authComponent');
const productComponent = require('./product/productComponent');
const orderComponent = require('./order/orderComponent');
const storeComponent = require('./store/storeComponent');

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
            ...authComponent,
            ...productComponent,
            ...orderComponent,
            ...storeComponent

        }
    }
};