const { csrfDoubleSubmitMiddleware, generateCsrfToken } = require('../server/middleware/csrfDoubleSubmit');

describe('CSRF Double Submit Cookie Middleware', () => {
  test('allows safe HTTP methods (GET, OPTIONS, HEAD)', () => {
    const middleware = csrfDoubleSubmitMiddleware();
    const req = { method: 'GET', headers: {} };
    const res = { cookie: jest.fn() };
    const next = jest.fn();

    middleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('blocks POST requests when CSRF token in header does not match cookie token', () => {
    const middleware = csrfDoubleSubmitMiddleware();
    const req = {
      method: 'POST',
      cookies: { 'XSRF-TOKEN': 'secret_token_123' },
      headers: { 'x-xsrf-token': 'wrong_token' }
    };
    const res = {
      cookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    middleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  test('allows POST request when CSRF token matches', () => {
    const middleware = csrfDoubleSubmitMiddleware();
    const token = generateCsrfToken();
    const req = {
      method: 'POST',
      cookies: { 'XSRF-TOKEN': token },
      headers: { 'x-xsrf-token': token }
    };
    const res = { cookie: jest.fn() };
    const next = jest.fn();

    middleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
