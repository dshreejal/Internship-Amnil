const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order'
    }],
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'store'
    },
    image: {
        type: String,
        required: true
    },
}, { timestamps: true });
module.exports = mongoose.model('user', userSchema);
