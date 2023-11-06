module.exports = {
    put: {
        tags: ['User'],
        description: 'Update User',
        summary: 'Update User',
        operationId: 'updateUser',

        security: [
            {
                Bearer: []
            }
        ],

        requestBody: {
            content: {
                'multipart/form-data': {
                    schema: {
                        $ref: '#/components/schemas/UpdateUser'
                    }
                }
            }
        },

        responses: {
            200: {
                description: "User updated successfully",
                content: {
                    'application/json': {
                        example: {
                            "name": "Gagan",
                            "username": "gagan",
                            "address": "Ktm",
                            "orders": [],
                            "image": "http://localhost:8000/images/1697625338105-user.jpg",
                            "_id": "652fb4faa51fd32d3b85c7b1",
                            "createdAt": "2023-10-18T10:35:38.179Z",
                            "updatedAt": "2023-10-18T10:35:38.179Z",
                            "__v": 0
                        }
                    }
                }
            },
            404: {
                description: "User not found",
                content: {
                    'application/json': {
                    },
                }
            }
        }
    }
}