const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    item: String,
    qty: Number,
    size: {
        h: Number,
        w: Number,
        uom: String
    },
    status: String,
    tags: [String],
    dim_cm: [Number]
});

const Inventory = mongoose.model('inventory', inventorySchema);

module.exports = Inventory;