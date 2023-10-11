const { admin } = require('../config/admin')

const FirebaseAuthenticationMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).send('Access denied. No token provided');
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).send('Access denied. No token provided');
        }

        const decoded = await admin.auth().verifyIdToken(token);

        if (!decoded) {
            return res.status(401).send('Access denied. Invalid token');
        }

        const validateUser = await admin.auth().getUser(decoded.uid);


        if (!validateUser) {
            return res.status(401).send('Access denied. User not found');
        }

        req.user = validateUser.providerData[0];
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send('Invalid token');
    }
}

module.exports = FirebaseAuthenticationMiddleware;