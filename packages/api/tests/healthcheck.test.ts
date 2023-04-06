import request from 'supertest';
import { app } from '../src/app';

describe('Healthcheck (e2e)', () => {
  it('Must have "status" property', async () => {
    const res = await request(app).get('/healthcheck');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status');
  });

  it('Must have "ok" as status value', async () => {
    const res = await request(app).get('/healthcheck');
    expect(res.statusCode).toBe(200);
    expect(res.body?.status).toBe('ok');
  });
});
