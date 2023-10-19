const userPath = require('./user/userPath')
const authPath = require('./auth/authPath')
const productPath = require('./product/productPath')
const orderPath = require('./order/orderPath')
const storePath = require('./store/storePath')

module.exports = {
    paths: {
        ...userPath,
        ...authPath,
        ...productPath,
        ...orderPath,
        ...storePath
    }
}