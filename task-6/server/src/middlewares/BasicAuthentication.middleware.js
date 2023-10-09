const bcrypt = require('bcrypt');
const User = require('../models/User.model');

const BasicAuthenticationMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']

        if (!authHeader) {
            return res.status(401).send('Access denied. No token provided');
        }

        const token = authHeader.split(' ')[1];
        const credentials = Buffer.from(token, 'base64').toString('ascii').split(':');
        const [username, password] = credentials;

        if (!username || !password) {
            return res.status(401).send('Access denied. No valid details provided');
        }

        const validateUser = await User.findOne({ username: username });
        if (!validateUser) {
            return res.status(401).send('Access denied. User not valid');
        }

        const validPassword = await bcrypt.compare(password, validateUser.password);
        if (!validPassword) {
            return res.status(401).send('Access denied. Password not valid');
        }

        req.user = { id: validateUser._id, username: validateUser.username };
        next();
    } catch (error) {
        res.status(401).send('Invalid token');
    }
}

module.exports = BasicAuthenticationMiddleware;