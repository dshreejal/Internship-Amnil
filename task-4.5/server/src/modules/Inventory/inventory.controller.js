const Inventory = require("../../models/Inventory.model");

const inventoryController = {}

const data = [
    {
        item: 'journal',
        qty: 25,
        size: { h: 14, w: 21, uom: 'cm' },
        status: 'A',
        tags: ['blank', 'red'],
        dim_cm: [14, 21]
    },
    {
        item: 'notebook',
        qty: 50,
        size: { h: 8.5, w: 11, uom: 'in' },
        status: 'A',
        tags: ['red', 'blank'],
        dim_cm: [14, 89]
    },
    {
        item: 'paper',
        qty: 100,
        size: { h: 8.5, w: 11, uom: 'in' },
        status: 'D',
        tags: ['red', 'blank', 'plain'],
        dim_cm: [14, 21]
    },
    {
        item: 'planner',
        qty: 75,
        size: { h: 22.85, w: 30, uom: 'cm' },
        status: 'D',
        tags: ['blank', 'red'],
        dim_cm: [9, 2]
    },
    {
        item: 'postcard',
        qty: 45,
        size: { h: 10, w: 15.25, uom: 'cm' },
        status: 'A',
        tags: ['blue'],
        dim_cm: [11, 21]
    }
];


inventoryController.addOneInventory = async (req, res) => {

    const { item, qty, tags, size, status } = req.body;

    const newInventory = await Inventory.insertOne({
        item,
        qty,
        tags,
        size,
        status
    });

    if (newInventory) {
        return res.status(200).json({ message: 'New inventory added successfully!' });
    } else {
        return res.status(400).json({ message: 'Error adding new inventory' });
    }
}

inventoryController.addManyInventory = async (req, res) => {
    const newInventory = await Inventory.insertMany(data);

    if (newInventory) {
        return res.status(200).json({ inventory: newInventory, message: 'New inventory added successfully!' });
    } else {
        return res.status(400).json({ message: 'Error adding new inventory' });
    }
}

inventoryController.getAllInventory = async (req, res) => {

    const { status, pageNum, pageSize } = req.query;

    let page = 1;
    let limit = 10;

    if (pageNum) {
        page = parseInt(pageNum);
    }

    if (pageSize) {
        limit = parseInt(pageSize);
    }

    const filterOptions = {};

    if (status) {
        filterOptions.status = status;
    } else {
        filterOptions.status = { $in: ['A', 'D'] }
    };

    filterOptions['size.h'] = { $lt: 15 };

    filterOptions.tags = { $in: ['red', 'blank'] };


    const allInventory = await Inventory.find(filterOptions).limit(limit).skip((page - 1) * limit);
    const total = await Inventory.countDocuments(filterOptions);
    if (allInventory) {
        return res.status(200).json({ inventory: allInventory, message: 'All inventory fetched successfully!', pageNum: page, pageSize: limit, total });
    } else {
        return res.status(400).json({ message: 'Error fetching inventory' });
    }
}


inventoryController.aggregateInventory = async (req, res) => {

    const aggregateQuery = [
        {
            $match: {
                status: 'A'
            }
        },
        {
            $group: {
                _id: "$item",
                totalQty: { $sum: "$qty" }
            }
        }
    ];

    const aggregateInventory = await Inventory.aggregate(aggregateQuery);

    if (aggregateInventory) {
        return res.status(200).json({ inventory: aggregateInventory, message: 'All inventory fetched successfully!' });
    } else {
        return res.status(400).json({ message: 'Error fetching inventory' });
    }



}

module.exports = inventoryController;