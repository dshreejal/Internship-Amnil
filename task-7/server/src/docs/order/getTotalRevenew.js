module.exports = {
    get: {
        tags: ['Order'],
        description: 'Get total revenew',
        summary: 'Get total revenew',
        operationId: 'getTotalRevenew',

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
                                    "total_revenew": "13603290"
                                }
                            ]
                        }
                    }
                }
            }
        }
    }
}