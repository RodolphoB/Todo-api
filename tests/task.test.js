const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/Users');

describe('API de Tarefas', () => {
  let token;

  beforeAll(async () => {
    // Apaga usuário teste se existir
    await User.destroy({ where: { username: 'TesteUser' } });
  });

  it('Deve retornar 401 sem token', async () => {
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(401);
  });

  it('Deve criar um novo usuário', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        username: 'TesteUser',
        password: '123456'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body).toHaveProperty('token');
    expect(res.body.token).toBeTruthy();
  });

  it('Deve fazer login e retornar um token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'TesteUser',
        password: '123456'
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.token).toBeTruthy();

    token = res.body.token;
  });

  it('Deve criar uma tarefa autenticada', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Nova tarefa de teste'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('title', 'Nova tarefa de teste');
  });
});
