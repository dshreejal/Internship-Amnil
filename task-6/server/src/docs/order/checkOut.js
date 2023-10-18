module.exports = {
    post: {
        tags: ['Order'],
        description: "Checkout",
        summary: "Checkout",
        operationId: 'checkout',

        parameters: [
            {
                name: "userId",
                in: "path",
                type: "string",
                required: true,
                description: "User Id"
            },
            {
                name: "cartId",
                in: "path",
                type: "string",
                required: true,
                description: "Cart Id"
            }
        ],

        security: [
            {
                Bearer: []
            }
        ],

        requestBody: {
        },

        responses: {
            200: {
                description: "Order placed successfully",
                content: {
                    'application/json': {
                        example: {
                            "user": "652fb4faa51fd32d3b85c7b1",
                            "products": [
                                {
                                    "product": "652fc254e0b8096b266c0af4",
                                    "quantity": 10,
                                    "price": 10000,
                                    "_id": "652fce998f5b8c91fb6a5dcf"
                                }
                            ],
                            "total_price": 10000,
                            "_id": "652fcebd8f5b8c91fb6a5dd6",
                            "createdAt": "2023-10-18T12:25:33.194Z",
                            "updatedAt": "2023-10-18T12:25:33.194Z",
                            "__v": 0
                        }
                    }
                }
            }
        }

    }
}