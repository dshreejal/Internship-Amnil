const getProducts = require('./getProducts')
const getProduct = require('./getProduct')
const getOutOfStock = require('./getOutOfStock')
const addProduct = require('./addProduct')
const updateProduct = require('./updateProduct')
const deleteProduct = require('./deleteProduct')
const updateQuantity = require('./updateQuantity')

module.exports = {
    '/products': {
        ...addProduct,
        ...getProducts
    },
    '/products/{id}': {
        ...getProduct,
        ...updateProduct,
        ...deleteProduct
    },
    '/products/get/out-of-stock': {
        ...getOutOfStock
    },
    '/products/update-quantity/{id}': {
        ...updateQuantity
    }
}