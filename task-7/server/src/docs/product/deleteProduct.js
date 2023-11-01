module.exports = {
    delete: {
        tags: ['Product'],
        description: "Delete Product",
        summary: "Delete Product",
        operationId: 'deleteProduct',


        parameters: [
            {
                name: 'id',
                in: 'path',
                required: true,
                description: 'Product id',
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
                description: 'Product deleted successfully',
                content: {
                    'application/json': {
                    },
                }
            },
            404: {
                description: "Product not found",
                content: {
                    'application/json': {
                    },
                }
            }
        }
    }
}