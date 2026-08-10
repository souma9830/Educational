const request = require('supertest');
const express = require('express');
const { sensitiveRateLimiter } = require('../../middleware/sensitiveRateLimiter');

const app = express();
app.use(express.json());

app.post('/api/auth/sensitive', sensitiveRateLimiter(3, 10000), (req, res) => {
  res.json({ success: true, message: 'Processed' });
});

describe('Sensitive Endpoint Rate Limiting Security Suite', () => {
  it('should allow requests under the maximum limit and append standard rate limit headers', async () => {
    const res = await request(app).post('/api/auth/sensitive');
    expect(res.status).toBe(200);
    expect(res.headers['x-ratelimit-limit']).toBe('3');
    expect(res.headers['x-ratelimit-remaining']).toBe('2');
  });

  it('should block requests exceeding the max limit with 429 status code and Retry-After header', async () => {
    const ip = '192.168.1.100';
    await request(app).post('/api/auth/sensitive').set('X-Forwarded-For', ip);
    await request(app).post('/api/auth/sensitive').set('X-Forwarded-For', ip);
    await request(app).post('/api/auth/sensitive').set('X-Forwarded-For', ip);
    
    const blockedRes = await request(app).post('/api/auth/sensitive').set('X-Forwarded-For', ip);
    expect(blockedRes.status).toBe(429);
    expect(blockedRes.body.success).toBe(false);
    expect(blockedRes.headers['retry-after']).toBeDefined();
  });
});
