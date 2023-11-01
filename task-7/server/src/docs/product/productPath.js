const getProducts = require('./getProducts')
const searchProducts = require('./searchProducts')
const getProduct = require('./getProduct')
const getOutOfStock = require('./getOutOfStock')
const addProduct = require('./addProduct')
const updateProduct = require('./updateProduct')
const deleteProduct = require('./deleteProduct')
const updateQuantity = require('./updateQuantity')
const getTop10SearchedProducts = require('./getTop10Search')

module.exports = {
    '/products': {
        ...addProduct,
        ...getProducts
    },
    '/products/search': {
        ...searchProducts
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
    },
    '/products/statistics/topSearchProducts/{startDate}/{endDate}': {
        ...getTop10SearchedProducts
    }
}