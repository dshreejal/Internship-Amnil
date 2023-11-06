module.exports = {
    get: {
        tags: ['User'],
        description: 'Get all user details',
        summary: 'Get all user details',
        operationId: 'getUsers',
        parameters: [
            {
                name: 'name',
                in: 'query',
                description: 'name of user to search',
            },
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
                description: "User details obtained successfully",
                content: {
                    'application/json': {
                        schema: {

                        },
                        example: {
                            "success": true,
                            "data": [
                                {
                                    "id": "7cc60f57-4d54-45a4-9763-a4cb3dd433bc",
                                    "name": "Gagan",
                                    "username": "gagan",
                                    "email": "email@email.com",
                                    "address": "Ktm",
                                    "created_at": "2023-11-06T14:52:18.249Z",
                                    "updated_at": "2023-11-06T14:52:18.249Z",
                                    "image": ""
                                },
                                {
                                    "id": "e54e039f-b7e1-4a9b-8a01-c8764fe305f6",
                                    "name": "John Doe",
                                    "username": "john_doe",
                                    "email": "email@email.com",
                                    "address": "Usa",
                                    "created_at": "2023-11-06T14:59:38.474Z",
                                    "updated_at": "2023-11-06T14:59:38.474Z",
                                    "image": ""
                                }
                            ],
                            "message": "Users Fetched Successfully",
                            "error": null
                        }
                    }
                },

            }
        }
    }
}