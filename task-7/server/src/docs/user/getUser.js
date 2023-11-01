module.exports = {
    get: {
        tags: ['User'],
        description: 'Get One User',
        summary: 'Get One User',
        operationId: 'getUser',
        parameters: [
            {
                name: 'id',
                in: 'path',
                required: true,
                description: 'Id of user to fetch',
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
                        schema: {

                        },
                        example: {
                            "_id": "6523ddc72cbdc35baa0b1ef4",
                            "name": "John Doe",
                            "username": "john_doe",
                            "password": "$2b$10$VdOmtXpafUMYZUdqc98EZuOc9qAadrCTCudZ/iw37xmt6m9Hqeyoy",
                            "address": "Ktm",
                            "orders": [],
                            "image": "http://localhost:8000/images/1696849351073-user.jpg",
                            "createdAt": "2023-10-09T11:02:31.156Z",
                            "updatedAt": "2023-10-09T11:02:31.156Z",
                            "__v": 0
                        }
                    }
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