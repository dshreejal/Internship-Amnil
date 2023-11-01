module.exports = {
    get: {
        tags: ['Order'],
        description: "Get order details by date",
        summary: "Get order details by date",
        operationId: 'aggregatedOrder',

        security: [
            {
                Bearer: []
            }
        ],

        parameters: [
            {
                name: 'date',
                in: 'path',
                description: 'date to fetch details of',
                schema: {
                    type: 'string',
                },
                example: '2023-10-31',
                required: false
            },
        ],

        requestBody: {
        },

        responses: {
            200: {
                description: "Order details fetched successfully",
                content: {
                    'application/json': {
                        example: {
                            "order": [
                                {
                                    "month": "10",
                                    "day": "31",
                                    "year": "2023",
                                    "total_orders": "10",
                                    "total_price": "13403240",
                                    "no_of_products": "335"
                                },
                                {
                                    "month": "11",
                                    "day": "1",
                                    "year": "2023",
                                    "total_orders": "1",
                                    "total_price": "200050",
                                    "no_of_products": "6"
                                }
                            ],
                            "message": "All orders fetched successfully!"
                        }
                    }
                }
            }
        }

    }
}