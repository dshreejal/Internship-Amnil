const { admin } = require('../../config/admin');
const User = require("../../models/User.model");
const jwt = require('jsonwebtoken');

const authController = {};


authController.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = await admin.auth().createUser({
            email,
            password,
            displayName: username
        });
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
}

authController.login = async (req, res) => {
    try {
        const { token } = req.body;
        const idToken = await admin.auth().verifyIdToken(token);

        if (!idToken) {
            return res.status(404).json({ message: "Unable to login" });
        }

        const user = await admin.auth().getUser(idToken.uid);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const DB_User = await User.findOne({ email: user.email });

        if (!DB_User) {
            const newUser = await User.create({
                username: user.displayName,
                name: user.displayName,
                email: user.email,
                image: user.photoURL
            });

            const payload = {
                user: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email ? newUser.email : null
                }
            }
            const authToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
            return res.send(newUser, authToken);
        } else {
            const payload = {
                user: {
                    id: DB_User._id,
                    username: DB_User.username,
                    email: DB_User.email ? DB_User.email : null
                }
            }
            const authToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.send(DB_User, authToken);
        }


    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
}


authController.getUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await admin.auth().getUser(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}
module.exports = authController;