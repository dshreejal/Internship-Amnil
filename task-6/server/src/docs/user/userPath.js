const getUsers = require('./getUsers')
const getUser = require('./getUser')
const registerUser = require('./registerUser')
const loginUser = require('./loginUser')
const updateUser = require('./updateUser')
const deleteUser = require('./deleteUser')


module.exports = {
    '/users': {
        ...registerUser,
        ...getUsers,
    },
    '/users/login': {
        ...loginUser
    },
    '/users/{id}': {
        ...getUser,
        ...updateUser,
        ...deleteUser
    },
}