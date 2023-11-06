module.exports = {
    post: {
        tags: ['User'],
        description: 'Register User',
        summary: 'Register User',
        operationId: 'registerUser',

        requestBody: {
            content: {
                'multipart/form-data': {
                    schema: {
                        $ref: '#/components/schemas/RegisterUser'
                    }
                }
            }
        },

        responses: {
            201: {
                description: "User registered successfully",
                content: {
                    'application/json': {
                        example: {
                            "newUser": {
                                "name": "Gagan",
                                "username": "gagan",
                                "address": "Ktm",
                                "orders": [],
                                "image": "http://localhost:8000/images/1697625338105-user.jpg",
                                "_id": "652fb4faa51fd32d3b85c7b1",
                                "createdAt": "2023-10-18T10:35:38.179Z",
                                "updatedAt": "2023-10-18T10:35:38.179Z",
                                "__v": 0
                            },
                            "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyZmI0ZmFhNTFmZDMyZDNiODVjN2IxIiwidXNlcm5hbWUiOiJnYWdhbiJ9LCJpYXQiOjE2OTc2MjUzMzgsImV4cCI6MTY5NzcxMTczOH0.LYTbrNHwwavw0wRRWx1Pd3Zt6-yRcRSwuY1lS92beX4"
                        }

                    }
                }
            }
        }
    }
}