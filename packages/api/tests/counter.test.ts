import request from 'supertest';
import { app } from '../src/app';

describe('Counter (e2e)', () => {
  it('Must have "count" property', async () => {
    const res = await request(app).get('/counter');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('count');
  });

  it('Must return a number', async () => {
    const res = await request(app).get('/counter');
    expect(res.statusCode).toBe(200);
    expect(typeof res.body?.count).toBe('number');
  });

  it('Must increment his value', async () => {
    let oldValue;

    for (let i = 1; i <= 10; i++) {
      const res = await request(app).get('/counter');
      const currVal = res.body?.count;

      expect(res.statusCode).toBe(200);

      if (typeof oldValue === 'number') {
        expect(oldValue + 1).toBe(currVal);
      }

      oldValue = currVal;
    }
  });
});
