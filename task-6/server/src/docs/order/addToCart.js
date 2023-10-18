module.exports = {
    post: {
        tags: ['Order'],
        description: 'Add to cart',
        summary: 'Add to cart',
        operationId: 'addToCart',

        security: [
            {
                Bearer: []
            }
        ],

        parameters: [
        ],

        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/AddToCart'
                    }
                }
            }
        },

        responses: {
            200: {
                description: 'Added to cart successfully',
                content: {
                    'application/json': {
                        example: {
                            "user_id": "652fb4faa51fd32d3b85c7b1",
                            "products": [
                                {
                                    "product": "652fc254e0b8096b266c0af4",
                                    "quantity": 5,
                                    "price": 50,
                                    "_id": "652fcbebd5e270f924f7691d"
                                }
                            ],
                            "total_price": 50,
                            "_id": "652fcbebd5e270f924f7691c",
                            "createdAt": "2023-10-18T12:13:31.645Z",
                            "updatedAt": "2023-10-18T12:13:31.645Z",
                            "__v": 0
                        }
                    }
                }
            },
            400: {
                description: "Product quantity is not available"
            },
            404: {
                description: "Product not found"
            }
        }
    }
}