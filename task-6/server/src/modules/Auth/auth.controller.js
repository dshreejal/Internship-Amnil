const { admin } = require('../../config/admin');

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
        const { email, password } = req.body;
        const user = await admin.auth().getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const token = await admin.auth().createCustomToken(user.uid);
        res.json({ token });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
}

authController.googleSignin = async (req, res) => {
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
        res.send(user);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
}
module.exports = authController;