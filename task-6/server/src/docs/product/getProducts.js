module.exports = {
    get: {
        tags: ['Product'],
        description: 'Get products',
        summary: 'Get products',
        operationId: 'getProducts',

        parameters: [
            {
                name: 'name',
                in: 'query',
                description: 'name of product to search',
            },
            {
                name: 'description',
                in: 'query',
                description: 'description of product to search',
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
            {
                name: 'filter',
                in: 'query',
                description: 'filter products by product type',
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
                                    "_id": "651d87191395a66f9adf21fb",
                                    "name": "Apple Iphone",
                                    "price": 1000,
                                    "description": "Apple ID",
                                    "quantity": 50,
                                    "product_type": "Smartphone",
                                    "image": "http://localhost:8000/images/1696433945095-logo2.png",
                                    "store": {
                                        "location": {
                                            "type": "Point",
                                            "coordinates": [
                                                27.763965,
                                                85.360984
                                            ]
                                        },
                                        "_id": "651d4a6926ffff739e17e31b",
                                        "name": "Store 1"
                                    },
                                    "createdAt": "2023-10-04T15:39:05.114Z",
                                    "updatedAt": "2023-10-04T15:39:05.114Z",
                                    "__v": 0
                                },
                                {
                                    "_id": "651d87bb2706efbefebe7d34",
                                    "name": "Apple",
                                    "price": 1000,
                                    "description": "Fresh Apple",
                                    "quantity": 50,
                                    "product_type": "Grocery",
                                    "image": "http://localhost:8000/images/1696434107523-logo2.png",
                                    "store": {
                                        "location": {
                                            "type": "Point",
                                            "coordinates": [
                                                27.767526,
                                                85.355626
                                            ]
                                        },
                                        "_id": "651d4ee0780a3e1e7a77c070",
                                        "name": "Store 3"
                                    },
                                    "createdAt": "2023-10-04T15:41:47.538Z",
                                    "updatedAt": "2023-10-04T15:41:47.538Z",
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