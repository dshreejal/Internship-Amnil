module.exports = {
    patch: {
        tags: ['Product'],
        description: "Update Product Quantity",
        summary: "Update Product Quantity",

        security: [
            {
                Bearer: []
            }
        ],

        parameters: [
            {
                in: 'path',
                name: 'id',
                required: true,
                schema: {
                    type: 'string',
                }
            }
        ],

        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            quantity: {
                                type: 'number',
                                description: 'Product quantity'
                            }
                        }
                    }
                }
            }
        },

        responses: {
            200: {
                description: 'Product quantity updated successfully',
                content: {
                    'application/json': {
                        example: {
                            "_id": "652fc254e0b8096b266c0af4",
                            "name": "Eraser",
                            "price": 10,
                            "description": "New Eraser",
                            "quantity": 5,
                            "product_type": "Statioanry",
                            "image": "http://localhost:8000/images/1697628756980-logo2.png",
                            "store": "651d4a6926ffff739e17e31b",
                            "createdAt": "2023-10-18T11:32:37.002Z",
                            "updatedAt": "2023-10-18T11:45:38.201Z",
                            "__v": 0
                        }
                    },
                }
            }
        }
    }
}