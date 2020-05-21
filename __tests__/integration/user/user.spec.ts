import request from 'supertest';
import app from '../../../src/app';

describe('CreateUsers', () => {
  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users').send();

    expect(response.body).toBe({ ok: true });
  });
});
