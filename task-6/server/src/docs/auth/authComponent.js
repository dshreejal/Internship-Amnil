module.exports = {
    FirebaseRegister: {
        type: 'object',
        properties: {
            email: {
                type: 'string',
                description: 'User email',
                required: true
            },
            username: {
                type: 'string',
                description: 'User name',
                required: true
            },
            password: {
                type: 'string',
                description: 'User password',
                required: true
            }
        }
    },
    FirebaseLogin: {
        type: 'object',
        properties: {
            token: {
                type: 'string',
                description: 'Firebase token',
                required: true
            }
        }
    }
}