import request from 'supertest';
import { AppDataSource } from '../src/data-source';
import app from '../src/app';

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('Users API', () => {
  let userId: number;

  it('POST /users — create user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Alice', email: 'alice@example.com' })
      .expect(201);

    expect(res.body).toMatchObject({ name: 'Alice', email: 'alice@example.com' });
    userId = res.body.id;
  });

  it('GET /users/:id — return user', async () => {
    const res = await request(app).get(`/users/${userId}`).expect(200);
    expect(res.body).toHaveProperty('id', userId);
  });

  it('DELETE /users/:id — delete user', async () => {
    await request(app).delete(`/users/${userId}`).expect(200);
    await request(app).get(`/users/${userId}`).expect(404);
  });
});
