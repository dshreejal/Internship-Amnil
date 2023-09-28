const User = require("../models/User.model");


exports.getUsers = async (req, res) => {
    const name = req.query.name;
    if (name) {
        const filteredUsers = await User.find({ name: { $regex: name, $options: 'i' } });
        return res.status(200).send(filteredUsers);
    }
    const users = await User.find();
    res.status(200).send(users);
}

exports.getOneUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.status(200).send(user);
}

exports.addUser = async (req, res) => {
    const user = {
        name: req.body.name,
        address: req.body.address
    }

    const userAlreadyPresent = await User.findOne({ name: req.body.name });
    if (userAlreadyPresent) {
        return res.status(400).send('User already present');
    }

    const newUser = await User.create(user);
    res.status(201).send(newUser);
}

exports.updateUser = async (req, res) => {
    console.log("hello");
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).send('User not found');
    }

    const updateUser = {
        name: req.body.name || user.name,
        address: req.body.address || user.address
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateUser, { new: true });

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

