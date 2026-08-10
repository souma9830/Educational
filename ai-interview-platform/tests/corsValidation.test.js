const { createCorsOriginValidator, corsMiddleware } = require('../server/middleware/corsValidator');

describe('CORS Dynamic Origin Validator', () => {
  test('allows exact origin match', () => {
    const validator = createCorsOriginValidator(['https://app.interview-platform.com']);
    expect(validator('https://app.interview-platform.com')).toBe(true);
    expect(validator('https://malicious.com')).toBe(false);
  });

  test('allows wildcard subdomain matching safely', () => {
    const validator = createCorsOriginValidator(['*.interview-platform.com']);
    expect(validator('https://sub.interview-platform.com')).toBe(true);
    expect(validator('https://interview-platform.com')).toBe(true);
    expect(validator('https://notinterview-platform.com')).toBe(false);
  });

  test('allows non-browser requests without origin header', () => {
    const validator = createCorsOriginValidator(['https://app.com']);
    expect(validator(undefined)).toBe(true);
  });

  test('middleware sets Access-Control headers for allowed origins', () => {
    const middleware = corsMiddleware(['https://app.com']);
    const req = { headers: { origin: 'https://app.com' }, method: 'GET' };
    const headers = {};
    const res = {
      setHeader: (k, v) => { headers[k] = v; }
    };
    const next = jest.fn();

    middleware(req, res, next);
    expect(headers['Access-Control-Allow-Origin']).toBe('https://app.com');
    expect(next).toHaveBeenCalled();
  });
});
