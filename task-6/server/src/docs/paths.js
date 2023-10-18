const userPath = require('./user/userPath')
const productPath = require('./product/productPath')

module.exports = {
    paths: {
        ...userPath,
        ...productPath
    }
}