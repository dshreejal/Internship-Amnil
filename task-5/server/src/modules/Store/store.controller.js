const Store = require('../../models/Store.model');

exports.createStore = async (req, res) => {
    const file = req.file.filename;

    const storeExists = await Store.findOne({ user: req.body.userId });

    if (storeExists) {
        return res.status(409).send('Store already exists');
    }

    const allowedTypes = ['Grocery', 'Electronics', 'Stationary', 'Clothing', 'Other'];
    if (!allowedTypes.includes(req.body.type)) {
        return res.status(400).send('Invalid type');
    }

    const newStore = {
        name: req.body.name,
        type: req.body.type,
        location: {
            type: 'Point',
            coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)]
        },
        products: req.body.products,
        user: req.body.userId,
        image: file
    }

    const storeAlreadyPresent = await Store.findOne({ name: req.body.name });
    if (storeAlreadyPresent) {
        return res.status(409).send('Store already exists');
    }

    const store = await Store.create(newStore);

    res.status(201).send(store);

};

exports.getStores = async (req, res) => {
    const name = req.query.name;
    const filterOptions = {};

    if (name) {
        filterOptions.name = { $regex: name, $options: "i" };
    }

    const stores = await Store.find(filterOptions).populate({
        path: 'products',
        select: 'name price'
    });

    res.status(200).send(stores);
}

exports.getNearbyStores = async (req, res) => {

    const longitude = parseFloat(req.body.longitude);
    const latitude = parseFloat(req.body.latitude);
    let distance = 1000;

    if (req.body.distance) {
        distance = req.body.distance;
    }

    const name = req.query.name || '';


    const stores = await Store.aggregate([
        {
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                },
                distanceField: 'distance',
                includeLocs: "dist.location",
                maxDistance: distance,
                spherical: true
            }
        },
        {
            $match: {
                name: { $regex: name, $options: "i" }
            }
        },
        {
            $lookup: {
                from: 'products',
                localField: 'products',
                foreignField: '_id',
                as: 'products'
            }
        },
        {
            $project: {
                name: 1,
                type: 1,
                location: 1,
                products: {
                    name: 1,
                    price: 1
                },
                user: 1,
                distance: 1
            }
        }

    ]);


    res.status(200).send(stores);
}

exports.updateStore = async (req, res) => {
    const storeId = req.params.storeId;
    const store = await Store.findById(storeId);

    if (!store) {
        return res.status(404).send('Store not found');
    }

    const allowedTypes = ['Grocery', 'Electronics', 'Stationary', 'Clothing', 'Other'];

    if (!allowedTypes.includes(req.body.type)) {
        return res.status(400).send('Invalid type');
    }


    const reqProducts = req.body.products;
    const storeProducts = store.products;

    const newProducts = [];


    reqProducts.forEach((reqProduct) => {
        if (!storeProducts.includes(reqProduct)) {
            newProducts.push(reqProduct);
        }
    });

    let file;
    if (req.file) {
        file = req.file.filename;
    }

    const updatedStore = await Store.findByIdAndUpdate(storeId, {
        name: req.body.name,
        type: req.body.type,
        location: {
            type: 'Point',
            coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)]
        },
        products: [...storeProducts, ...newProducts],
        image: file || store.image
    }, { new: true });

    res.status(200).send(updatedStore);
}