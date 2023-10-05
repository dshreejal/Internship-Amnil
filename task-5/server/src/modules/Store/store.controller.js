const Store = require('../../models/Store.model');
const Product = require('../../models/Product.model');
const { getImageUrl } = require("../../helpers/getImageUrl");

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
        user: req.body.userId,
        image: file
    }

    const storeAlreadyPresent = await Store.findOne({ name: req.body.name });
    if (storeAlreadyPresent) {
        return res.status(409).send('Store already exists');
    }

    const store = await Store.create(newStore);
    store.image = getImageUrl(req, store.image);

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

    stores.forEach((store) => {
        store.image = getImageUrl(req, store.image);
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
                distance: 1,
                image: 1
            }
        }

    ]);

    stores.forEach((store) => {
        store.image = getImageUrl(req, store.image);
    });

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
        image: file || store.image
    }, { new: true });

    updatedStore.image = getImageUrl(req, updatedStore.image);

    res.status(200).send(updatedStore);
}

exports.deleteStore = async (req, res) => {
    const storeId = req.params.storeId;
    const store = await Store.findById(storeId);
    if (!store) {
        return res.status(404).send('Store not found');
    }

    const productExists = await Product.findOne({ store: storeId });

    if (productExists) {
        return res.status(400).send('Cannot delete store with products');
    }

    await Store.findByIdAndDelete(storeId);
    return res.status(200).send('Store deleted');
}