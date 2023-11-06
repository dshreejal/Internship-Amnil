const yup = require('yup');


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
    params: yup.object({
        id: yup.string().uuid('Invalid Id').required('Id is required'),
    }),
    body: yup.object({
        name: yup.string().optional('Name is required'),
        address: yup.string().optional('Address is required'),
    }),
});

const idValidationSchema = yup.object({
    params: yup.object({
        id: yup.string().uuid('Invalid Id').required('Id is required'),
    })
});

const getUsersSchema = yup.object({
    query: yup.object({
        pageNumber: yup.number().integer().typeError('pageNumber must be a number').test('is-number', 'pageNumber must be a number', (value) => !isNaN(value)).min(1, "pageNumber must be greater than or equals 1").default(1),
        pageSize: yup.number().integer().typeError('pageSize must be a number').test('is-number', 'pageSize must be a number', (value) => !isNaN(value)).min(1, "pageSize must be greater than or equals 1").default(10),
    })
})

module.exports = { newUserSchema, updateUserSchema, idValidationSchema, getUsersSchema };