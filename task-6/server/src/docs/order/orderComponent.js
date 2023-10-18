module.exports = {
    AddToCart: {
        type: 'object',
        properties: {
            user: {
                type: 'string',
                description: 'User id'
            },
            products: {
                type: 'array',
                description: 'Array of products',
                items: {
                    type: 'object',
                    properties: {
                        product: {
                            type: 'string',
                            description: 'Product id'
                        },
                        quantity: {
                            type: 'integer',
                            description: 'Quantity of the product'
                        }
                    }
                }
            }
        }
    }
}