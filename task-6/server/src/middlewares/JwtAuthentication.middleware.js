const jwt = require('jsonwebtoken');

const JwtAuthenticationMiddleware = (req, res, next) => {
    console.log("hello");
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
        console.log(decoded);
        req.userId = decoded._id;
        next();
    } catch (error) {
        res.status(401).send('Invalid token');
    }
}

module.exports = JwtAuthenticationMiddleware;