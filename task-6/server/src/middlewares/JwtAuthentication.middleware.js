const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const JwtAuthenticationMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).send('Access denied. No token provided');
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).send('Access denied. No token provided');
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.user) {
            return res.status(401).send('Access denied. Invalid token');
        }
        const validateUser = await User.findById(decoded.user.id);

        if (!validateUser) {
            return res.status(401).send('Access denied. User not found');
        }

        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).send('Invalid token');
    }
}

module.exports = JwtAuthenticationMiddleware;