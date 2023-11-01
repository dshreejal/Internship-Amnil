module.exports = {
    get: {
        tags: ['Product'],
        description: 'Get top 10 searched products',
        summary: 'Get top 10 searched products',
        operationId: 'getTop10SearchedProducts',

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
                description: "Top 10 Searched Products obtained successfully",
                content: {
                    'application/json': {
                        example: {
                            data: [
                                {
                                    "search_keyword": "phone",
                                    "product_id": 2,
                                    "product_name": "Iphone 15",
                                    "total_search": "3"
                                },
                                {
                                    "search_keyword": "pencil",
                                    "product_id": 1,
                                    "product_name": "Pencil",
                                    "total_search": "2"
                                }
                            ]
                        }
                    }
                }
            }
        }
    }
}