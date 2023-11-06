const pool = require('../../config/db');
const { getImageUrl } = require("../../helpers/getImageUrl");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../../helpers/logger');
const HttpStatus = require('http-status');
const apiResponse = require('../../helpers/apiResponse');


exports.getUsers = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        if (result.rowCount === 0) {
            // apiResponse(res, statusCode, success, data, message, error)   
            return apiResponse(res, HttpStatus.NOT_FOUND, false, null, 'No users found', null)
        }
        users = result.rows;
        for (const user of users) {
            user.image = getImageUrl(req, user.image);
            delete user.password;
        }
        res.status(200).send(users);
        // apiResponse(res, statusCode, success, data, message, error)   
        return apiResponse(res, HttpStatus.OK, true, users, 'Users Fetched Successfully', null);
    } catch (error) {
        logger.error(error.message);
        next(error);
    }
}

exports.getOneUser = async (req, res, next) => {
    try {
        const user = await pool.query('SELECT * from users WHERE id=$1', [req.params.id]);
        if (user.rowCount === 0) {
            // apiResponse(res, statusCode, success, data, message, error)   
            return apiResponse(res, HttpStatus.NOT_FOUND, false, null, 'User Not Found', null)
        }
        delete user.rows[0].password;

        user.rows[0].image = getImageUrl(req, user.rows[0].image);

        // apiResponse(res, statusCode, success, data, message, error)   
        return apiResponse(res, HttpStatus.OK, true, user.rows[0], 'User Fetched Successfully', null);
    } catch (error) {
        logger.error(error.message);
        next(error);
    }
}

exports.addUser = async (req, res) => {
    try {
        const file = req.file.filename;

        if (!file) {
            // apiResponse(res, statusCode, success, data, message, error)   
            return apiResponse(res, HttpStatus.BAD_REQUEST, false, null, 'Please upload an image', null);
        }

        const usernameCheck = await pool.query('SELECT * FROM users WHERE username=$1', [req.body.username]);
        if (usernameCheck.rowCount !== 0) {
            // apiResponse(res, statusCode, success, data, message, error)   
            return apiResponse(res, HttpStatus.BAD_REQUEST, false, null, 'User already exists', null);
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

        // apiResponse(res, statusCode, success, data, message, error)
        return apiResponse(res, HttpStatus.CREATED, true, { user: newUser.rows[0], authToken }, 'User Created Successfully', null);
    } catch (error) {
        logger.error(error.message);
        next(error);
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await pool.query('SELECT * FROM users WHERE username=$1', [username]);

        if (user.rowCount === 0) {
            //apiResponse(res, statusCode, success, data, message, error);
            return apiResponse(res, HttpStatus.NOT_FOUND, false, null, 'User Not Found', null)
        }

        const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);

        if (!isPasswordValid) {
            //apiResponse(res, statusCode, success, data, message, error);
            return apiResponse(res, HttpStatus.BAD_REQUEST, false, null, 'Invalid Password', null)
        }

        const payload = {
            user: {
                id: user.rows[0].id,
                username: user.rows[0].username,
                email: user.rows[0].email ? user.rows[0].email : null
            }
        }

        const authToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        //apiResponse(res, statusCode, success, data, message, error);
        return apiResponse(res, HttpStatus.OK, true, { authToken }, 'Login Successful', null);
    } catch (error) {
        logger.error(error.message);
        next(error);
    }

}

exports.updateUser = async (req, res) => {
    try {
        const user = await pool.query('SELECT * FROM users WHERE id=$1', [req.params.id]);

        if (user.rowCount === 0) {
            //apiResponse(res, statusCode, success, data, message, error);
            return apiResponse(res, HttpStatus.NOT_FOUND, false, null, 'User Not Found', null)
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

        //apiResponse(res, statusCode, success, data, message, error);
        return apiResponse(res, HttpStatus.OK, true, updatedUser, 'User Updated Successfully', null);
    } catch (error) {
        logger.error(error.message);
        next(error);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await pool.query('SELECT * FROM users WHERE id=$1', [req.params.id]);
        if (user.rowCount === 0) {
            //apiResponse(res, statusCode, success, data, message, error);
            return apiResponse(res, HttpStatus.NOT_FOUND, false, null, 'User Not Found', null)
        }

        await pool.query('DELETE FROM users WHERE id=$1', [req.params.id]);

        //apiResponse(res, statusCode, success, data, message, error);
        return apiResponse(res, HttpStatus.OK, true, null, 'User Deleted Successfully', null);
    } catch (error) {
        error.logger(error.message);
        next(error);
    }
}

