module.exports = {
    get: {
        tags: ['Product'],
        description: 'Get out of stock products',
        summary: 'Get out of stock products',
        operationId: 'getOutOfStockProducts',

        security: [
            {
                Bearer: []
            }
        ],

        requestBody: {

        },

        responses: {
            200: {
                description: "Out of stock products obtained successfully",
                content: {
                    'application/json': {

                    }
                }
            }
        }
    }
}