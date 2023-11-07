const pool = require('../../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../../helpers/logger');
const HttpStatus = require('http-status');
const apiResponse = require('../../helpers/apiResponse');


exports.getUsers = async (req, res, next) => {
    try {
        const pageNumber = parseInt(req.query.pageNumber) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const offset = (pageNumber - 1) * pageSize;

        const result = await pool.query('SELECT * FROM users ORDER BY id OFFSET $1 ROWS FETCH NEXT $2 ROWS ONLY', [offset, pageSize]);

        if (result.rowCount === 0) {
            // apiResponse(res, statusCode, success, data, message, error)   
            return apiResponse(res, HttpStatus.NOT_FOUND, false, null, 'No Users Found', null)
        }

        const users = result.rows;

        const totalUsers = await pool.query('SELECT COUNT(*) FROM users');
        const totalCount = parseInt(totalUsers.rows[0].count);

        const nextPage = pageNumber * pageSize < totalCount ? pageNumber + 1 : null;
        const previousPage = pageNumber > 1 ? pageNumber - 1 : null;

        users.forEach(user => {
            delete user.password;
        });

        const response = {
            users,
            totalCount,
            currentPage: pageNumber,
            nextPage,
            previousPage,
        }

        // apiResponse(res, statusCode, success, data, message, error)
        return apiResponse(res, HttpStatus.OK, true, response, 'Users Fetched Successfully', null);

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

        // apiResponse(res, statusCode, success, data, message, error)   
        return apiResponse(res, HttpStatus.OK, true, user.rows[0], 'User Fetched Successfully', null);
    } catch (error) {
        logger.error(error.message);
        next(error);
    }
}

exports.addUser = async (req, res, next) => {
    try {
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
        }

        const newUser = await pool.query('INSERT INTO users (name, username, email, password, address) VALUES ($1, $2, $3, $4, $5) RETURNING *', [user.name, user.username, user.email, user.password, user.address]);

        const payload = {
            user: {
                id: newUser.rows[0].id,
                username: newUser.rows[0].username,
                email: newUser.rows[0].email ? newUser.rows[0].email : null
            }
        }

        const authToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });


        // apiResponse(res, statusCode, success, data, message, error)
        return apiResponse(res, HttpStatus.CREATED, true, { user: newUser.rows[0], authToken }, 'User Created Successfully', null);
    } catch (error) {
        logger.error(error.message);
        next(error);
    }
}

exports.loginUser = async (req, res, next) => {
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

exports.updateUser = async (req, res, next) => {
    try {
        const user = await pool.query('SELECT * FROM users WHERE id=$1', [req.params.id]);

        if (user.rowCount === 0) {
            //apiResponse(res, statusCode, success, data, message, error);
            return apiResponse(res, HttpStatus.NOT_FOUND, false, null, 'User Not Found', null)
        }


        const updateUser = {
            ...user.rows[0],
            name: req.body.name || user.rows[0].name,
            address: req.body.address || user.rows[0].address,
        }


        const result = await pool.query('UPDATE users SET name=$1, address=$2 WHERE id=$3 RETURNING *', [updateUser.name, updateUser.address, req.params.id]);

        const updatedUser = result.rows[0];

        //apiResponse(res, statusCode, success, data, message, error);
        return apiResponse(res, HttpStatus.OK, true, updatedUser, 'User Updated Successfully', null);
    } catch (error) {
        logger.error(error.message);
        next(error);
    }
}

exports.deleteUser = async (req, res, next) => {
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

