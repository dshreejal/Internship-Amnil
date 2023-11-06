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

        requestBody: {},

        responses: {
            200: {
                description: 'User deleted successfully',
                content: {
                    'application/json': {
                    },
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