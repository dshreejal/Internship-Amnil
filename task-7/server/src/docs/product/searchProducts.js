module.exports = {
    get: {
        tags: ['Product'],
        description: 'Search products',
        summary: 'Search products',
        operationId: 'searchProducts',

        parameters: [
            {
                name: 'name',
                in: 'query',
                description: 'name of product to search',
                required: true
            },
            {
                name: 'sort',
                in: 'query',
                description: 'sort products by price',
                schema: {
                    type: 'string',
                    enum: ['price', '-price']
                }
            },
        ],

        requestBody: {

        },

        responses: {
            200: {
                description: "Products obtained successfully",
                content: {
                    'application/json': {
                        example: {
                            data: [
                                {
                                    "id": 1,
                                    "name": "Pencil",
                                    "price": "10",
                                    "description": "Pencil",
                                    "quantity": 136,
                                    "product_type": "Stationary",
                                    "image": "http://localhost:8000/images/1698755010590-fl.png",
                                    "created_at": "2023-10-31T12:23:30.597Z",
                                    "updated_at": "2023-11-01T04:32:40.371Z"
                                }
                            ]
                        }
                    }
                }
            }
        }
    }
}