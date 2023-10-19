module.exports = {
    get: {
        tags: ['Store'],
        description: "Get all stores",
        summary: "Get all stores",
        operationId: 'getStores',
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
        responses: {
            '200': {
                description: "All stores fetched successfully",
                content: {
                    'application/json': {
                        example: {
                            stores: [
                                {
                                    "location": {
                                        "type": "Point",
                                        "coordinates": [
                                            27.763965,
                                            85.360984
                                        ]
                                    },
                                    "_id": "651d4a6926ffff739e17e31b",
                                    "name": "Store 1",
                                    "type": "Stationary",
                                    "products": [
                                        {
                                            "_id": "651d87191395a66f9adf21fb",
                                            "name": "Apple Iphone",
                                            "price": 1000
                                        },
                                        {
                                            "_id": "652fc254e0b8096b266c0af4",
                                            "name": "Eraser",
                                            "price": 1000
                                        }
                                    ],
                                    "user": "651d3fc0ae6f21b8375cae91",
                                    "image": "http://localhost:8000/images/1696418409479-store.jpg",
                                    "createdAt": "2023-10-04T11:20:09.501Z",
                                    "updatedAt": "2023-10-18T11:32:37.007Z",
                                    "__v": 0
                                },
                                {
                                    "location": {
                                        "type": "Point",
                                        "coordinates": [
                                            27.767526,
                                            85.355626
                                        ]
                                    },
                                    "_id": "651d4ee0780a3e1e7a77c070",
                                    "name": "Store 3",
                                    "type": "Electronics",
                                    "products": [
                                        {
                                            "_id": "651d87bb2706efbefebe7d34",
                                            "name": "Apple",
                                            "price": 1000
                                        }
                                    ],
                                    "user": "65157d9da209f15b7d1553f5",
                                    "image": "http://localhost:8000/images/1696419552527-store.jpg",
                                    "createdAt": "2023-10-04T11:39:12.548Z",
                                    "updatedAt": "2023-10-04T15:41:47.543Z",
                                    "__v": 0
                                }
                            ]
                        }
                    }
                }
            }
        }
    }
}