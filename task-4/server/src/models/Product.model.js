const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    product_type: {
        type: String,
        required: true
    },
}, { timestamps: true });
module.exports = mongoose.model('product', userSchema);
