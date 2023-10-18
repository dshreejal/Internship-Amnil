module.exports = {
    get: {
        tags: ['Order'],
        description: "Get orders",
        summary: "Get orders",

        security: [
            {
                Bearer: []
            }
        ],

        requestBody: {
        },

        responses: {
            200: {
                description: 'Orders obtained successfully',
                content: {
                    'application/json': {
                        example: {
                            orders: [
                                {
                                    "_id": "65158390b4190ad06c3f7911",
                                    "user": {
                                        "_id": "65157d96a209f15b7d1553f2",
                                        "name": "Ram",
                                        "address": "UK",
                                        "orders": [
                                            "65158390b4190ad06c3f7911"
                                        ],
                                        "createdAt": "2023-09-28T13:20:22.567Z",
                                        "updatedAt": "2023-09-28T13:45:52.081Z",
                                        "__v": 0
                                    },
                                    "products": [
                                        {
                                            "product": null,
                                            "quantity": 3,
                                            "price": 2999.9700000000003,
                                            "_id": "65158356b4190ad06c3f7900"
                                        }
                                    ],
                                    "total_price": 2999.9700000000003,
                                    "createdAt": "2023-09-28T13:45:52.076Z"
                                }
                            ]
                        }
                    }
                }
            }
        }
    }
}