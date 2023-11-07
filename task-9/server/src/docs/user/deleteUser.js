module.exports = {
    delete: {
        tags: ['User'],
        description: 'Delete user',
        summary: 'Delete user',
        operationId: 'deleteUser',

        parameters: [
            {
                name: 'id',
                in: 'path',
                required: true,
                description: 'User id',
                type: 'string'
            }
        ],

        security: [
            {
                Bearer: []
            }
        ],


        responses: {
            200: {
                description: 'User deleted successfully',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ApiResponse'
                        },
                        example: {
                            "success": true,
                            "data": null,
                            "message": "User Deleted Successfully",
                            "error": null
                        }
                    },
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
                },
            }
        }
    }
}