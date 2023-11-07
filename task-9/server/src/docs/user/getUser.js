module.exports = {
    get: {
        tags: ['User'],
        description: 'Get One User',
        summary: 'Get One User',
        operationId: 'getUser',
        parameters: [
            {
                name: 'id',
                in: 'path',
                required: true,
                description: 'Id of user to fetch',
            },
        ],
        security: [
            {
                Bearer: []
            }
        ],


        responses: {
            200: {
                description: "User details obtained successfully",
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ApiResponse'
                        },
                        example: {
                            "success": true,
                            "data": {
                                "id": "e54e039f-b7e1-4a9b-8a01-c8764fe305f6",
                                "name": "John Doe",
                                "username": "john_doe",
                                "email": "email@email.com",
                                "address": "Usa",
                                "created_at": "2023-11-06T14:59:38.474Z",
                                "updated_at": "2023-11-06T14:59:38.474Z",
                                "image": ""
                            },
                            "message": "User Fetched Successfully",
                            "error": null
                        }
                    }
                }
            },
            404: {
                description: "User not found",
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        },
                        example: {
                            "success": false,
                            "data": null,
                            "message": "User Not Found",
                            "error": null
                        }
                    },
                }
            }
        }
    }
}