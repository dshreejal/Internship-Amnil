const getOrders = require('./getOrders')
const getOrder = require('./getOrder')
const addToCart = require('./addToCart')
const viewCart = require('./viewCart')
const checkOut = require('./checkOut')
const aggregatedOrder = require('./aggregatedOrder')
const getTop10Products = require('./getTop10Products')
const getTotalRevenew = require('./getTotalRevenew')

module.exports = {
    '/orders': {
        ...getOrders
    },
    '/orders/{id}': {
        ...getOrder
    },
    '/orders/add-to-cart': {
        ...addToCart
    },
    '/orders/view-cart/{id}': {
        ...viewCart
    },
    '/orders/checkout/{userId}/{cartId}': {
        ...checkOut
    },
    '/orders/statistics/byDate/{date}': {
        ...aggregatedOrder
    },
    '/orders/statistics/topSoldProducts/{startDate}/{endDate}': {
        ...getTop10Products
    },
    '/orders/statistics/totalRevenew/{startDate}/{endDate}': {
        ...getTotalRevenew
    }
}