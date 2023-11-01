module.exports = {
    get: {
        tags: ['Order'],
        description: 'Get top 10 selling products',
        summary: 'Get top 10 selling products',
        operationId: 'getTop10SellingProducts',

        security: [
            {
                Bearer: []
            }
        ],

        parameters: [
            {
                name: 'startDate',
                in: 'path',
                description: 'start date',
                schema: {
                    type: 'string',
                    format: 'date'
                },
                example: '2023-10-31'
            },
            {
                name: 'endDate',
                in: 'path',
                description: 'end date',
                schema: {
                    type: 'string',
                    format: 'date'
                },
                example: '2023-11-01'
            },
        ],

        requestBody: {
        },

        responses: {
            200: {
                description: "Top 10 Selling Products obtained successfully",
                content: {
                    'application/json': {
                        example: {
                            data: [
                                {
                                    "name": "Pencil",
                                    "total_quantity": "329"
                                },
                                {
                                    "name": "Iphone 15",
                                    "total_quantity": "12"
                                }
                            ]
                        }
                    }
                }
            }
        }
    }
}