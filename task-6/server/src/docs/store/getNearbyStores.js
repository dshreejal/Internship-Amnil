module.exports = {
    get: {
        tags: ['Store'],
        description: "Get Nearby stores",
        summary: "Get Nearby stores",
        operationId: 'getNearbyStores',
        parameters: [
            {
                name: "name",
                in: "query",
                type: "string",
            }
        ],
        security: [
            {
                Bearer: []
            }
        ],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/GetNearbyStores'
                    }
                }
            }
        },
        responses: {
            '200': {
                description: "Neaby stores fetched successfully",
                content: {
                    'application/json': {
                        example: {
                            stores: [
                                {
                                    "_id": "651d4ee0780a3e1e7a77c070",
                                    "name": "Store 3",
                                    "type": "Electronics",
                                    "location": {
                                        "type": "Point",
                                        "coordinates": [
                                            27.767526,
                                            85.355626
                                        ]
                                    },
                                    "products": [
                                        {
                                            "name": "Apple",
                                            "price": 1000
                                        }
                                    ],
                                    "user": "65157d9da209f15b7d1553f5",
                                    "image": "http://localhost:8000/images/1696419552527-store.jpg",
                                    "distance": 159.0030991363792
                                },
                                {
                                    "_id": "651d4a6926ffff739e17e31b",
                                    "name": "Store 1",
                                    "type": "Stationary",
                                    "location": {
                                        "type": "Point",
                                        "coordinates": [
                                            27.763965,
                                            85.360984
                                        ]
                                    },
                                    "products": [
                                        {
                                            "name": "Apple Iphone",
                                            "price": 1000
                                        },
                                        {
                                            "name": "Eraser",
                                            "price": 1000
                                        }
                                    ],
                                    "user": "651d3fc0ae6f21b8375cae91",
                                    "image": "http://localhost:8000/images/1696418409479-store.jpg",
                                    "distance": 438.31637224720413
                                }
                            ]
                        }
                    }
                }
            }
        }
    }
}