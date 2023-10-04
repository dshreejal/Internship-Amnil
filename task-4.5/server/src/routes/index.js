const express = require('express');
const router = express.Router();

const inventoryRouter = require('./inventory.route');

router.use('/inventory', inventoryRouter);


module.exports = router;