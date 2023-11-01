module.exports = {
    get: {
        tags: ['User'],
        description: 'Get all user details',
        summary: 'Get all user details',
        operationId: 'getUsers',
        parameters: [
            {
                name: 'name',
                in: 'query',
                description: 'name of user to search',
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
                            data: [
                                {
                                    "_id": "65157d96a209f15b7d1553f2",
                                    "name": "Ram",
                                    "address": "UK",
                                    "orders": [
                                        {
                                            "_id": "65158390b4190ad06c3f7911",
                                            "total_price": 2999.9700000000003
                                        }
                                    ],
                                    "createdAt": "2023-09-28T13:20:22.567Z",
                                    "updatedAt": "2023-09-28T13:45:52.081Z",
                                    "__v": 0,
                                    "image": "http://localhost:8000/images/undefined"
                                },
                                {
                                    "_id": "65157d9da209f15b7d1553f5",
                                    "name": "Shyam",
                                    "address": "USA",
                                    "orders": [],
                                    "createdAt": "2023-09-28T13:20:29.907Z",
                                    "updatedAt": "2023-09-28T13:20:29.907Z",
                                    "__v": 0,
                                    "image": "http://localhost:8000/images/undefined"
                                },
                                {
                                    "_id": "651d3fc0ae6f21b8375cae91",
                                    "name": "Hari",
                                    "address": "Ktm",
                                    "orders": [],
                                    "image": "http://localhost:8000/images/1696415680393-user.jpg",
                                    "createdAt": "2023-10-04T10:34:40.410Z",
                                    "updatedAt": "2023-10-04T10:34:40.410Z",
                                    "__v": 0
                                },
                                {
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
                            ],
                        }
                    }
                },

            }
        }
    }
}