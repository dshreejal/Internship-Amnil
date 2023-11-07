module.exports = {
    RegisterUser: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                required: true
            },
            username: {
                type: 'string',
                required: true
            },
            password: {
                type: 'string',
                required: true
            },
            address: {
                type: 'string',
                required: true
            },
        },
        example: {
            "name": "John Doe",
            "username": "john_doe",
            "password": "123456",
            "address": "USA"
        }
    },
    LoginUser: {
        type: 'object',
        properties: {
            username: {
                type: 'string',
                required: true
            },
            password: {
                type: 'string',
                required: true
            }
        },
        example: {
            "username": "john_doe",
            "password": "123456"
        }
    },
    UpdateUser: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
            },
            address: {
                type: 'string',
            },
        },
        example: {
            "name": "Updated User",
            "address": "Updated Address"
        }
    },
}