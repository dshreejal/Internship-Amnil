const getOrders = require('./getOrders')
const getOrder = require('./getOrder')
const addToCart = require('./addToCart')
const viewCart = require('./viewCart')
const checkOut = require('./checkOut')
const aggregatedOrder = require('./aggregatedOrder')

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
    '/orders/statistics/byDate': {
        ...aggregatedOrder
    }
}