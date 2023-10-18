module.exports = {
    AddProduct: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                required: true
            },
            price: {
                type: 'number',
                required: true
            },
            description: {
                type: 'string',
                required: true
            },
            quantity: {
                type: 'number',
                required: true
            },
            product_type: {
                type: 'string',
                required: true,
            },
            storeId: {
                type: 'string',
                required: true
            },
            image: {
                type: 'string',
                required: true
            }
        }
    },
    UpdateProduct: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
            },
            price: {
                type: 'number',
            },
            description: {
                type: 'string',
            },
            quantity: {
                type: 'number',
            },
            product_type: {
                type: 'string',
            },
            image: {
                type: 'string',
            }
        }
    }
}