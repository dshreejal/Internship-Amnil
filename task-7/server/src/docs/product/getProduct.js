module.exports = {
    get: {
        tags: ['Product'],
        description: 'Get One Product',
        summary: 'Get One Product',
        operationId: 'getOneProduct',

        parameters: [
            {
                name: 'id',
                in: 'path',
                description: 'id of product',
                required: true
            }
        ],

        requestBody: {
        },

        responses: {
            200: {
                description: "Product obtained successfully",
                content: {
                    'application/json': {
                        example: {
                            "_id": "651d87191395a66f9adf21fb",
                            "name": "Apple Iphone",
                            "price": 1000,
                            "description": "Apple ID",
                            "quantity": 50,
                            "product_type": "Smartphone",
                            "image": "http://localhost:8000/images/1696433945095-logo2.png",
                            "store": "651d4a6926ffff739e17e31b",
                            "createdAt": "2023-10-04T15:39:05.114Z",
                            "updatedAt": "2023-10-04T15:39:05.114Z",
                            "__v": 0
                        }
                    }
                }
            },
            404: {
                description: "Product not found",
                content: {
                    'application/json': {
                    },
                }
            }
        }
    }
}