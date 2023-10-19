const register = require('./register');
const login = require('./login');
const getUser = require('./getUser');

module.exports = {
    '/auth/{userId}': {
        ...getUser
    },

    '/auth/register': {
        ...register
    },
    '/auth/login': {
        ...login
    }
}