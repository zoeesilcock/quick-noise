const request = require('supertest');
const app = require('./app')

describe('Test the example API route', () => {
    test('It should respond 200 ok to the GET method', async () => {
        const response = await request(app).get('/api/hello');
        expect(response.statusCode).toBe(200);
    });
});
