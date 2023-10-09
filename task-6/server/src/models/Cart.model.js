const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
        quantity: { type: Number, default: 1 },
        price: { type: Number, default: 0 }
    }],
    total_price: { type: Number, default: 0 }
}, {
    timestamps: true
});

const Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;