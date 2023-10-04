const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
        quantity: { type: Number },
        price: { type: Number }
    }],
    total_price: { type: Number, required: true }
}, {
    timestamps: true
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;