module.exports = {
    delete: {
        tags: ['Store'],
        description: "Delete store",
        summary: "Delete store",
        operationId: 'deleteStore',

        parameters: [
            {
                name: 'id',
                in: 'path',
                required: true,
                description: 'Store id',
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
                description: 'Store deleted successfully',
                content: {
                    'application/json': {
                    },
                }
            },
            404: {
                description: "Store not found",
                content: {
                    'application/json': {
                    },
                }
            }
        }
    }
}