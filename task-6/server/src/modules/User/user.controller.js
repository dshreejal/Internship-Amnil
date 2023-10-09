const User = require("../../models/User.model");
const { getImageUrl } = require("../../helpers/getImageUrl");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.getUsers = async (req, res) => {
    const name = req.query.name;
    const filterOptions = {};

    if (name) {
        filterOptions.name = { $regex: name, $options: "i" };
    }
    const users = await User.find(filterOptions).populate({
        path: 'orders',
        select: ' total_price',
    });
    users.forEach((user) => {
        user.image = getImageUrl(req, user.image);
    });
    res.status(200).send(users);
}

exports.getOneUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).send('User not found');
    }
    user.image = getImageUrl(req, user.image);
    res.status(200).send(user);
}

exports.addUser = async (req, res) => {
    const file = req.file.filename;

    const userAlreadyPresent = await User.findOne({ username: req.body.username });
    if (userAlreadyPresent) {
        return res.status(400).send('User already present');
    }

    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, salt);

    const user = {
        name: req.body.name,
        username: req.body.username,
        password: securePassword,
        address: req.body.address,
        image: file
    }

    const newUser = await User.create(user);

    const payload = {
        user: {
            id: newUser._id,
            username: newUser.username
        }
    }

    const authToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    newUser.image = getImageUrl(req, newUser.image);
    res.status(201).send({ newUser, authToken });
}

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(404).send('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).send('Invalid password');
    }

    const payload = {
        user: {
            id: user._id,
            username: user.username
        }
    }

    const authToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).send({ authToken, message: "Login successful" });

}

exports.updateUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).send('User not found');
    }

    let file;
    if (req.file) {
        file = req.file.filename;
    }

    const updateUser = {
        name: req.body.name || user.name,
        address: req.body.address || user.address,
        image: file || user.image
    }


    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateUser, { new: true });
    updatedUser.image = getImageUrl(req, updatedUser.image);

    res.status(200).send(updatedUser);
}

exports.deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).send('User not found');
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).send('user deleted');
}

