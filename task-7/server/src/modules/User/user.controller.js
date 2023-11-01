const pool = require('../../config/db');
const { getImageUrl } = require("../../helpers/getImageUrl");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.getUsers = async (req, res) => {
    const result = await pool.query('SELECT * FROM users');
    if (result.rowCount === 0) {
        return res.status(200).send('No users found')
    }
    users = result.rows;
    for (const user of users) {
        user.image = getImageUrl(req, user.image);
        delete user.password;

        const userOrder = await pool.query('SELECT * FROM orders WHERE user_id=$1', [user.id]);

        if (userOrder.rowCount !== 0) {
            user.order = userOrder.rows;
            for (const order of user.order) {
                const orderItems = await pool.query('SELECT * FROM order_products WHERE order_id=$1', [order.id]);
                if (orderItems.rowCount !== 0) {
                    order.items = orderItems.rows;
                    for (const item of order.items) {
                        const product = await pool.query('SELECT * FROM products WHERE id=$1', [item.product_id]);
                        if (product.rowCount !== 0) {
                            item.product = product.rows[0];
                        }
                    }
                }
            }
        }
    }
    res.status(200).send(users);
}

exports.getOneUser = async (req, res) => {
    const user = await pool.query('SELECT * from users WHERE id=$1', [req.params.id]);
    if (user.rowCount === 0) {
        return res.status(404).send('User not found');
    }
    delete user.rows[0].password;

    user.rows[0].image = getImageUrl(req, user.rows[0].image);

    const userOrder = await pool.query('SELECT * FROM orders WHERE user_id=$1', [user.rows[0].id]);

    if (userOrder.rowCount !== 0) {
        user.rows[0].order = userOrder.rows;
        for (const order of user.rows[0].order) {
            const orderItems = await pool.query('SELECT * FROM order_products WHERE order_id=$1', [order.id]);
            if (orderItems.rowCount !== 0) {
                order.items = orderItems.rows;
                for (const item of order.items) {
                    const product = await pool.query('SELECT * FROM products WHERE id=$1', [item.product_id]);
                    if (product.rowCount !== 0) {
                        item.product = product.rows[0];
                    }
                }
            }
        }
    }

    res.status(200).send(user.rows[0]);
}

exports.addUser = async (req, res) => {
    const file = req.file.filename;

    const usernameCheck = await pool.query('SELECT * FROM users WHERE username=$1', [req.body.username]);
    if (usernameCheck.rowCount !== 0) {
        return res.status(400).send('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, salt);

    const user = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: securePassword,
        address: req.body.address,
        image: file
    }

    const newUser = await pool.query('INSERT INTO users (name, username, email, password, address, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [user.name, user.username, user.email, user.password, user.address, user.image]);

    const payload = {
        user: {
            id: newUser.rows[0].id,
            username: newUser.rows[0].username,
            email: newUser.rows[0].email ? newUser.rows[0].email : null
        }
    }

    const authToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    newUser.rows[0].image = getImageUrl(req, newUser.rows[0].image);
    res.status(201).send({ user: newUser.rows[0], authToken });
}

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE username=$1', [username]);

    if (user.rowCount === 0) {
        return res.status(404).send('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);

    if (!isPasswordValid) {
        return res.status(400).send('Invalid password');
    }

    const payload = {
        user: {
            id: user.rows[0].id,
            username: user.rows[0].username,
            email: user.rows[0].email ? user.rows[0].email : null
        }
    }

    const authToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).send({ authToken, message: "Login successful" });

}

exports.updateUser = async (req, res) => {
    const user = await pool.query('SELECT * FROM users WHERE id=$1', [req.params.id]);

    if (user.rowCount === 0) {
        return res.status(404).send('User not found');
    }

    let file;
    if (req.file) {
        file = req.file.filename;
    }

    const updateUser = {
        ...user.rows[0],
        name: req.body.name || user.rows[0].name,
        address: req.body.address || user.rows[0].address,
        image: file || user.rows[0].image
    }


    const result = await pool.query('UPDATE users SET name=$1, address=$2, image=$3 WHERE id=$4 RETURNING *', [updateUser.name, updateUser.address, updateUser.image, req.params.id]);

    const updatedUser = result.rows[0];
    updatedUser.image = getImageUrl(req, updatedUser.image);

    res.status(200).send(updatedUser);
}

exports.deleteUser = async (req, res) => {
    const user = await pool.query('SELECT * FROM users WHERE id=$1', [req.params.id]);
    if (user.rowCount === 0) {
        return res.status(404).send('User not found');
    }

    await pool.query('DELETE FROM users WHERE id=$1', [req.params.id]);
    res.status(200).send('user deleted');
}

