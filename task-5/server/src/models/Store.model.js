const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ['Grocery', 'Electronics', 'Stationary', 'Clothing', 'Other']
    },
    location: {
        type: {
            type: String,
            defaukt: 'Point',
        },
        coordinates: {
            type: [Number],
            required: true,
            index: '2dsphere'
        }
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;