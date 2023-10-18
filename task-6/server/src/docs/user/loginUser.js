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
                        example: {
                            "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyM2RkYzcyY2JkYzM1YmFhMGIxZWY0IiwidXNlcm5hbWUiOiJqb2huX2RvZSJ9LCJpYXQiOjE2OTc2MjU5MDQsImV4cCI6MTY5NzcxMjMwNH0.lfPSsIFjfpdWoa6TJQlxM_s66FPJpxBksM9q3LKiVb4",
                            "message": "Login successful"
                        }
                    }
                }
            },
            400: {
                description: "Invalid Password",
                content: {
                    'application/json': {
                    },
                }
            },
            404: {
                description: "User not found",
                content: {
                    'application/json': {
                    },
                }
            }
        }
    }
}