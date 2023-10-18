module.exports = {
    get: {
        tags: ['Order'],
        description: "Get order details by date",
        summary: "Get order details by date",
        operationId: 'aggregatedOrder',

        security: [
            {
                Bearer: []
            }
        ],

        requestBody: {
        },

        responses: {
            200: {
                description: "Order details fetched successfully",
                content: {
                    'application/json': {
                        example: {
                            "order": [
                                {
                                    "_id": {
                                        "month": 9,
                                        "day": 28,
                                        "year": 2023
                                    },
                                    "totalOrders": 1,
                                    "totalPrice": 2999.9700000000003
                                },
                                {
                                    "_id": {
                                        "month": 10,
                                        "day": 18,
                                        "year": 2023
                                    },
                                    "totalOrders": 1,
                                    "totalPrice": 10000
                                }
                            ],
                            "message": "All orders fetched successfully!"
                        }
                    }
                }
            }
        }

    }
}