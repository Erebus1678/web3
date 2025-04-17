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

describe('Tasks API', () => {
  it('POST /tasks — should create a task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ name: 'Test Task', complete: false })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Task');
    expect(res.body.complete).toBe(false);
  });

  it('GET /tasks — should return array including created task', async () => {
    const res = await request(app).get('/tasks').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('name', 'Test Task');
  });
});
