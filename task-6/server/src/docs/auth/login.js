module.exports = {
    post: {
        tags: ['Auth'],
        description: 'Login using firebase Google/Email-Password',
        summary: 'Login using firebase Google/Email-Password',
        operationId: 'login',
        parameters: [],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/FirebaseLogin'
                    }
                }
            },
            required: true
        },
        responses: {
            '200': {
                description: 'User logged in successfully',
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
            '500': {
                description: 'Internal Server Error'
            }
        }
    },
}