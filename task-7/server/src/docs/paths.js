const userPath = require('./user/userPath')
const productPath = require('./product/productPath')
const orderPath = require('./order/orderPath')

module.exports = {
    paths: {
        ...userPath,
        ...productPath,
        ...orderPath,
    }
}