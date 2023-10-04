const User = require("../../models/User.model");


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
    const file = req.file.filename;

    const user = {
        name: req.body.name,
        address: req.body.address,
        image: file
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

