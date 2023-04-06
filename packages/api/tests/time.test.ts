import request from 'supertest';
import { app } from '../src/app';

describe('Time (e2e)', () => {
  it('Must have "fullDate" property', async () => {
    const res = await request(app).get('/time');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('fullDate');
  });

  it('Must have "ok" as status value', async () => {
    const res = await request(app).get('/healthcheck');
    expect(res.statusCode).toBe(200);
    expect(res.body?.status).toBe('ok');
  });
});
