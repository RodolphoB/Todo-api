const request = require('supertest');
const app = require('../src/app');

describe('API de Tarefas', () => {
  it('Deve retornar 401 sem token', async () => {
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(401);
  });
});
