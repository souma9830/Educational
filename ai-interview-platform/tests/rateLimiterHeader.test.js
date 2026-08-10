const rateLimiter = require('../server/middleware/rateLimiter');

describe('Rate Limiter Retry-After Header Suite', () => {
  test('rateLimiter sets Retry-After response header on limit breach', () => {
    const middleware = rateLimiter(1, 60000);
    const req = { ip: '127.0.0.1', originalUrl: '/api/test' };
    const res = {
      headers: {},
      setHeader: function(k, v) { this.headers[k] = v; },
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    middleware(req, res, next);
    middleware(req, res, next);

    expect(res.headers['Retry-After']).toBe(60);
    expect(res.status).toHaveBeenCalledWith(429);
  });
});
