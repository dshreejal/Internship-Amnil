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

        parameters: [
            {
                name: 'id',
                in: 'path',
                required: true,
                description: 'User id',
                type: 'string'
            }
        ],

        requestBody: {
            content: {
                'application/json': {
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
                        schema: {
                            $ref: '#/components/schemas/ApiResponse'
                        },
                        example: {
                            "success": true,
                            "data": {
                                "id": "410666cb-f746-4274-9300-4e57e328bad4",
                                "name": "updated name",
                                "username": "test",
                                "email": "email@email.com",
                                "password": "$2b$10$kertcifskUnI.WpxZT/z3eILm17Fh70RNGmNFK8MBWK9oksFa/FZC",
                                "address": "updated address",
                                "created_at": "2023-11-07T04:46:22.687Z",
                                "updated_at": "2023-11-07T04:48:26.048Z"
                            },
                            "message": "User Updated Successfully",
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