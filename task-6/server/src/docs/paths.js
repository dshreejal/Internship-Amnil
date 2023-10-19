const userPath = require('./user/userPath')
const productPath = require('./product/productPath')
const orderPath = require('./order/orderPath')
const storePath = require('./store/storePath')

module.exports = {
    paths: {
        ...userPath,
        ...productPath,
        ...orderPath,
        ...storePath
    }
}