const express = require('express');
const router = express.Router();

const inventoryController = require('../modules/Inventory/inventory.controller');

router.route('/add-one').post(inventoryController.addOneInventory);
router.route('/add-many').post(inventoryController.addManyInventory);

router.route('/').get(inventoryController.getAllInventory);

router.route('/aggregate').get(inventoryController.aggregateInventory);

module.exports = router;