module.exports = {
    post: {
        tags: ['Store'],
        description: "Add store",
        summary: "Add store",
        operationId: 'addStore',

        parameters: [],

        security: [
            {
                Bearer: []
            }
        ],

        requestBody: {
            content: {
                'multipart/form-data': {
                    schema: {
                        $ref: '#/components/schemas/AddStore'
                    }
                }
            }
        },

        responses: {
            201: {
                description: 'Store added successfully',
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
            409: {
                description: "Store already exists"
            }
        }
    }
}