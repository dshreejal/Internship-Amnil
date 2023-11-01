module.exports = {
    get: {
        tags: ['Order'],
        description: "View Users Cart",
        summary: "View Users Cart",
        operationId: 'viewCart',
        parameters: [
            {
                name: "id",
                in: "path",
                type: "string",
                required: true,
                description: "User Id"
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
                description: "Cart fetched successfully",
                content: {
                    'application/json': {
                        example: {
                            "_id": "652fcbebd5e270f924f7691c",
                            "user_id": "652fb4faa51fd32d3b85c7b1",
                            "products": [
                                {
                                    "product": {
                                        "_id": "652fc254e0b8096b266c0af4",
                                        "name": "Eraser",
                                        "price": 10,
                                        "description": "New Eraser",
                                        "quantity": 5,
                                        "product_type": "Statioanry",
                                        "image": "1697628756980-logo2.png",
                                        "store": "651d4a6926ffff739e17e31b",
                                        "createdAt": "2023-10-18T11:32:37.002Z",
                                        "updatedAt": "2023-10-18T11:45:38.201Z",
                                        "__v": 0
                                    },
                                    "quantity": 5,
                                    "price": 50,
                                    "_id": "652fcbebd5e270f924f7691d"
                                }
                            ],
                            "total_price": 50,
                            "createdAt": "2023-10-18T12:13:31.645Z",
                            "updatedAt": "2023-10-18T12:13:31.645Z",
                            "__v": 0
                        }
                    }
                }
            }
        }
    }
}