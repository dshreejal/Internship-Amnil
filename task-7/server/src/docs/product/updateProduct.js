module.exports = {
    put: {
        tags: ['Product'],
        description: "Update Product",
        summary: "Update Product",

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
                'multipart/form-data': {
                    schema: {
                        $ref: '#/components/schemas/UpdateProduct'
                    }
                }
            }
        },

        responses: {
            200: {
                description: "Product updated successfully",
                content: {
                    'application/json': {
                        example: {
                            "name": "Eraser",
                            "price": 10,
                            "description": "New Eraser",
                            "quantity": 50,
                            "product_type": "Statioanry",
                            "image": "http://localhost:8000/images/1697628756980-logo2.png",
                            "store": "651d4a6926ffff739e17e31b",
                            "_id": "652fc254e0b8096b266c0af4",
                            "createdAt": "2023-10-18T11:32:37.002Z",
                            "updatedAt": "2023-10-18T11:32:37.002Z",
                            "__v": 0
                        }
                    }
                }
            },
            404: {
                description: "Product not found"
            }
        }
    }
}