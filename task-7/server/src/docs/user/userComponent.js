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
            image: {
                type: 'string',
                required: true
            }
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
            username: {
                type: 'string',
            },
            password: {
                type: 'string',
            },
            address: {
                type: 'string',
            },
            image: {
                type: 'string',
            }
        }
    },
}