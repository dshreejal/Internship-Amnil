const express = require('express');
const router = express.Router();

const { createStore, getStores, getNearbyStores, updateStore, deleteStore } = require('../modules/Store/store.controller');

const imageUpload = require("../helpers/imageUpload");

router.route('/')
    .post(imageUpload.single('image'), createStore)
    .get(getStores)

router.route('/nearby')
    .get(getNearbyStores)

router.route('/:storeId')
    .put(imageUpload.single('image'), updateStore)

router.route('/:storeId')
    .delete(deleteStore)

module.exports = router;