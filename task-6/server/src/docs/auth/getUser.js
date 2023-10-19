module.exports = {
    get: {
        tags: ['Auth'],
        description: 'Get User Details',
        summary: 'Get User Details',
        operationId: 'getUserFirebase',
        parameters: [
            {
                name: 'userId',
                in: 'path',
                required: true,
                description: 'UUid of user to fetch',
            },
        ],
        security: [
            {
                Bearer: []
            }
        ],

        requestBody: {
        },

        responses: {
            200: {
                description: "User details obtained successfully",
                content: {
                    'application/json': {
                        example: {
                            "uid": "LU2BaoF3psYSKEUZljJcPJKuuky2",
                            "email": "john@google.com",
                            "emailVerified": false,
                            "displayName": "john",
                            "disabled": false,
                            "metadata": {
                                "lastSignInTime": "Thu, 19 Oct 2023 05:23:01 GMT",
                                "creationTime": "Thu, 19 Oct 2023 05:17:52 GMT",
                                "lastRefreshTime": "Thu, 19 Oct 2023 05:23:01 GMT"
                            },
                            "tokensValidAfterTime": "Thu, 19 Oct 2023 05:17:52 GMT",
                            "providerData": [
                                {
                                    "uid": "john@google.com",
                                    "displayName": "john",
                                    "email": "john@google.com",
                                    "providerId": "password"
                                }
                            ]
                        }
                    }
                }
            },
            404: {
                description: "User not found",
            }
        }
    }
}