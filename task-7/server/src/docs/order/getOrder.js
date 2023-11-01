module.exports = {
    get: {
        tags: ['Order'],
        description: 'Get one order',
        summary: 'Get one order',
        operationId: 'getOneOrder',

        security: [
            {
                Bearer: []
            }
        ],

        parameters: [
            {
                name: 'id',
                in: 'path',
                type: 'string',
                required: true,
                description: 'Order id'
            }
        ],

        requestBody: {
        },

        responses: {
            200: {
                description: 'Order fetched successfully',
                content: {
                    'application/json': {
                        example: {
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
                            "createdAt": "2023-09-28T13:45:52.076Z",
                            "updatedAt": "2023-09-28T13:45:52.076Z",
                            "__v": 0
                        }
                    }
                }
            }
        }

    }
}