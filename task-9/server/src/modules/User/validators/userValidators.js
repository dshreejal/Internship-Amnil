const yup = require('yup');
const { v4: uuidv4 } = require('uuid');


const newUserSchema = yup.object({
    body: yup.object({
        name: yup.string().required('Name is required'),
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        address: yup.string().required('Address is required'),
    }),
})

const updateUserSchema = yup.object({
    body: yup.object({
        name: yup.string().optional('Name is required'),
        address: yup.string().optional('Address is required'),
    }),
});


module.exports = { newUserSchema, updateUserSchema };