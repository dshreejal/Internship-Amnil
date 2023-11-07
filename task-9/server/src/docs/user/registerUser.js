module.exports = {
    post: {
        tags: ['User'],
        description: 'Register User',
        summary: 'Register User',
        operationId: 'registerUser',

        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/RegisterUser'
                    }
                }
            }
        },

        responses: {
            201: {
                description: "User created successfully",
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ApiResponse'
                        },
                        example: {
                            "success": true,
                            "data": {
                                "user": {
                                    "id": "7cc60f57-4d54-45a4-9763-a4cb3dd433bc",
                                    "name": "Gagan",
                                    "username": "gagan",
                                    "email": "email@email.com",
                                    "password": "$2b$10$lVXwPdjpvUifbGZPgz7yROfh5aykpRcQy0E9m0CHsJbotg2qv8RVu",
                                    "address": "Ktm",
                                    "created_at": "2023-11-06T14:52:18.249Z",
                                    "updated_at": "2023-11-06T14:52:18.249Z",
                                    "image": ""
                                },
                                "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiN2NjNjBmNTctNGQ1NC00NWE0LTk3NjMtYTRjYjNkZDQzM2JjIiwidXNlcm5hbWUiOiJnYWdhbiIsImVtYWlsIjoiZW1haWxAZW1haWwuY29tIn0sImlhdCI6MTY5OTI4MjMzOCwiZXhwIjoxNjk5MzY4NzM4fQ.HXNO7lNoCmkT3Lhww32pP-3HtTWt0iCkqc5lUnhUskw"
                            },
                            "message": "User Created Successfully",
                            "error": null
                        }
                    }
                }
            }
        }
    }
}