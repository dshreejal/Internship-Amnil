module.exports = {
    post: {
        tags: ['User'],
        description: 'Login User',
        summary: 'Login User',
        operationId: 'loginUser',

        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/LoginUser'
                    },
                }
            }
        },

        responses: {
            200: {
                description: "User logged in successfully",
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ApiResponse'
                        },
                        example: {
                            "success": true,
                            "data": {
                                "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiOWU5NjU2MGItZTNiNC00Y2Y0LTgyNjktYTk5MTI0ZTg2OTUyIiwidXNlcm5hbWUiOiJnYWdhbiIsImVtYWlsIjoiZW1haWxAZW1haWwuY29tIn0sImlhdCI6MTY5OTM1MjUyMCwiZXhwIjoxNjk5NDM4OTIwfQ.nFznY1Bv352xlxKUno7nJqPnsFLbc2JjOgYdb36PK0M"
                            },
                            "message": "Login Successful",
                            "error": null
                        }
                    }
                }
            },
            400: {
                description: "Invalid Password",
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        },
                        example: {
                            "success": false,
                            "data": null,
                            "message": "Invalid Password",
                            "error": null
                        }
                    },
                }
            },
            404: {
                description: "User not found",
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        },
                        example: {
                            "success": false,
                            "data": null,
                            "message": "User Not Found",
                            "error": null
                        }
                    },
                }
            }
        }
    }
}