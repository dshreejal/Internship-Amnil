const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const JwtAuthenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).send('Access denied. No token provided');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send('Access denied. No token provided');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.user) {
            return res.status(401).send('Access denied. No token provided');
        }

        const validateUser = await User.findById(decoded.user._id);

        if (!validateUser) {
            return res.status(401).send('Access denied.');
        }

        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).send('Invalid token');
    }
}

module.exports = JwtAuthenticationMiddleware;