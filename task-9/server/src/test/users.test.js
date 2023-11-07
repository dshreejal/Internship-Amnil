const request = require('supertest');
const pool = require('../config/db');
const app = require('../app');

let server;
beforeAll((done) => {
    server = app.listen(8000, () => {
        console.log("Test Server started on port 8000");
        done();
    });
});

afterAll((done) => {
    server.close(done);
});

const users = [{
    name: "Test User 1",
    email: "test@test.com",
    password: "123456",
    username: "testuser1",
    address: "Test Address 1"
},
{
    name: "Test User 2",
    email: "test@test.com",
    password: "123456",
    username: "testuser2",
    address: "Test Address 2"
},
{
    name: "Test User 3",
    email: "test@test.com",
    password: "123456",
    username: "testuser3",
    address: "Test Address 3"
},
]

describe('/api/users', () => {
    let token;
    beforeAll(async () => {
        for (user of users) {
            const res = await request(app).post('/api/users').send(user);
            expect(res.status).toBe(201);

        }
        const loginResponse = await request(app).post('/api/users/login').send({
            username: users[0].username,
            password: users[0].password
        });
        expect(loginResponse.status).toBe(200);
        token = loginResponse.body.data.authToken;
    });

    afterAll(async () => {
        for (user of users) {
            await pool.query(`DELETE FROM users WHERE username='${user.username}'`);
        }
    })

    it('should return all users', async () => {
        const res = await request(app).get('/api/users').set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200);
        expect(res.body.data.users.length).toBe(3);
    });

    it('should return paginated users', async () => {
        const res = await request(app).get('/api/users?pageNumber=1&pageSize=2').set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200);
        expect(res.body.data.totalCount).toBe(3);
        expect(res.body.data.users.length).toBe(2);
        expect(res.body.data.currentPage).toBe(1);
        expect(res.body.data.nextPage).toBe(2);
    });

    it('should return user by id', async () => {
        const users = await request(app).get('/api/users').set('Authorization', `Bearer ${token}`)

        const res = await request(app).get(`/api/users/${users.body.data.users[0].id}`).set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200);
    });

    it('should edit user by id', async () => {
        const users = await request(app).get('/api/users').set('Authorization', `Bearer ${token}`)

        const res = await request(app).put(`/api/users/${users.body.data.users[0].id}`).set('Authorization', `Bearer ${token}`).send({
            name: "Test User Updated",
            address: "Test Address Updated"
        })

        expect(res.status).toBe(200);
        expect(res.body.data.name).toBe("Test User Updated");
        expect(res.body.data.address).toBe("Test Address Updated");
    })
})