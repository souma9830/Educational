const { sanitizeLogData } = require('../server/utils/logSanitizer');

describe('Sensitive Log Sanitizer Utility', () => {
  test('redacts password and authorization token fields', () => {
    const raw = {
      username: 'candidate1',
      password: 'MySecretPassword123!',
      headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR...'
      }
    };
    const clean = sanitizeLogData(raw);
    expect(clean.username).toBe('candidate1');
    expect(clean.password).toBe('[REDACTED]');
    expect(clean.headers.authorization).toBe('[REDACTED]');
  });

  test('recursively sanitizes nested objects and arrays', () => {
    const raw = {
      user: {
        apiKey: 'sk-123456789'
      },
      list: [
        { refreshToken: 'token_abc' },
        { normal: 'value' }
      ]
    };
    const clean = sanitizeLogData(raw);
    expect(clean.user.apiKey).toBe('[REDACTED]');
    expect(clean.list[0].refreshToken).toBe('[REDACTED]');
    expect(clean.list[1].normal).toBe('value');
  });

  test('returns primitive values untouched', () => {
    expect(sanitizeLogData('hello')).toBe('hello');
    expect(sanitizeLogData(123)).toBe(123);
    expect(sanitizeLogData(null)).toBe(null);
  });
});
