module.exports = {
    GetNearbyStores: {
        type: 'object',
        properties: {
            longitude: {
                type: 'number',
                description: 'Longitude of the store'
            },
            latitude: {
                type: 'number',
                description: 'Latitude of the store'
            },
            distance: {
                type: 'number',
                description: 'Distance from the store'
            },
        }
    },
    AddStore: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                description: 'Store name',
                required: true
            },
            type: {
                type: 'string',
                description: 'Store type',
                enum: ['Grocery', 'Electronics', 'Stationary', 'Clothing', 'Other'],
                required: true
            },
            longitude: {
                type: 'number',
                description: 'Store longitude',
                required: true
            },
            latitude: {
                type: 'number',
                description: 'Store latitude',
                required: true
            },
            userId: {
                type: 'string',
                description: 'User id',
                required: true
            },
            image: {
                type: 'string',
                description: 'Store image',
                required: true
            }
        }
    },
    UpdateStore: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                description: 'Store name',
            },
            type: {
                type: 'string',
                description: 'Store type',
                enum: ['Grocery', 'Electronics', 'Stationary', 'Clothing', 'Other'],
            },
            longitude: {
                type: 'number',
                description: 'Store longitude',
            },
            latitude: {
                type: 'number',
                description: 'Store latitude',
            },
            image: {
                type: 'string',
                description: 'Store image',
            }
        }
    }
}