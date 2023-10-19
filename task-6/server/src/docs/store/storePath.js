const getStores = require('./getStores');
const getNearbyStores = require('./getNearbyStores');
const addStore = require('./addStore');
const updateStore = require('./updateStore');
const deleteStore = require('./deleteStore');

module.exports = {
    '/store': {
        ...addStore,
        ...getStores,

    },
    '/store/nearby': {
        ...getNearbyStores
    },
    '/store/{id}': {
        ...updateStore,
        ...deleteStore
    }
}