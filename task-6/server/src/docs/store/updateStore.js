module.exports = {
    put: {
        tags: ['Store'],
        description: "Update store",
        summary: "Update store",
        operationId: 'updateStore',

        parameters: [
            {
                name: "id",
                in: "path",
                type: "string",
                required: true,
                description: "Store id"
            }
        ],

        security: [
            {
                Bearer: []
            }
        ],

        requestBody: {
            content: {
                'multipart/form-data': {
                    schema: {
                        $ref: '#/components/schemas/UpdateStore'
                    }
                }
            }
        },

        responses: {
            201: {
                description: 'Store updated successfully',
                content: {
                    'application/json': {
                        example: {
                            "name": "Store 4  ",
                            "type": "Electronics",
                            "location": {
                                "type": "Point",
                                "coordinates": [
                                    27.767526,
                                    85.355626
                                ]
                            },
                            "products": [],
                            "user": "652fb4faa51fd32d3b85c7b1",
                            "image": "http://localhost:8000/images/1697690996315-store.jpg",
                            "_id": "6530b5743410d741299fa71e",
                            "createdAt": "2023-10-19T04:49:56.347Z",
                            "updatedAt": "2023-10-19T04:49:56.347Z",
                            "__v": 0
                        }
                    },
                }
            },
            400: {
                description: "Invalid type"
            },
            404: {
                description: "Store not found"
            }
        }
    }
}