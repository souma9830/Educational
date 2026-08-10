const RefreshToken = require('../server/models/RefreshToken');

describe('RefreshToken Model Invalidation Suite', () => {
  test('RefreshToken model exports revokeAllUserTokens static method', () => {
    expect(typeof RefreshToken.revokeAllUserTokens).toBe('function');
  });
});
