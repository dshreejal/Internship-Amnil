const users = require("../data/users.json");
const fs = require("fs");
const path = require("path");

const pathToUsers = path.join(__dirname, "../data/users.json");

exports.getUsers = (req, res) => {
    const name = req.query.name;
    if (name) {
        const filteredUsers = users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
        return res.status(200).send(filteredUsers);
    }
    res.status(200).send(users);
}

exports.getOneUser = (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.status(200).send(user);
}

exports.addUser = (req, res) => {

    const user = {
        id: req.body.id,
        name: req.body.name,
        address: req.body.address
    }

    const userAlreadyPresent = users.find(user => user.name === req.body.name);
    if (userAlreadyPresent) {
        return res.status(400).send('User already present');
    }

    users.push(user);
    fs.writeFile(pathToUsers, JSON.stringify(users, null, 2), 'utf8', (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Server error');
        }
        res.status(201).send(user);
    })
}

exports.updateUser = (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send('User not found');
    }

    const updateUser = {
        id: user.id,
        name: req.body.name || user.name,
        address: req.body.address || user.address
    }
    const index = users.indexOf(user);
    users[index] = updateUser;

    fs.writeFile(pathToUsers, JSON.stringify(users, null, 2), 'utf8', (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Server error');
        }
        res.status(200).send(updateUser);
    })
}

exports.deleteUser = (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send('User not found');
    }

    const index = users.indexOf(user);
    users.splice(index, 1);

    fs.writeFile(pathToUsers, JSON.stringify(users, null, 2), 'utf8', (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Server error');
        }
        res.status(200).send('user deleted');
    })

}

