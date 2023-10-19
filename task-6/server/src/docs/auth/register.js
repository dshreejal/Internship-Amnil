module.exports = {
    post: {
        tags: ['Auth'],
        description: 'Register using firebase Email-Password',
        summary: 'Register using firebase Email-Password',
        operationId: 'register',
        parameters: [],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/FirebaseRegister'
                    },
                    example: {
                        "email": "john@google.com",
                        "username": "john",
                        "password": "123456"
                    }
                }
            },
            required: true
        },
        responses: {
            '200': {
                description: 'User registered successfully',
                content: {
                    'application/json': {
                        example: {
                            "uid": "LU2BaoF3psYSKEUZljJcPJKuuky2",
                            "email": "john@google.com",
                            "emailVerified": false,
                            "displayName": "john",
                            "disabled": false,
                            "metadata": {
                                "lastSignInTime": null,
                                "creationTime": "Thu, 19 Oct 2023 05:17:52 GMT",
                                "lastRefreshTime": null
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