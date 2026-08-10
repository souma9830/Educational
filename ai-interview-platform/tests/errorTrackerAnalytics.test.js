const ErrorTracker = require('../server/services/errorTracker');

describe('ErrorTracker Analytics Aggregation Suite', () => {
  test('ErrorTracker getStats includes byCode field in results', async () => {
    const stats = await ErrorTracker.getStats(24);
    expect(stats).toHaveProperty('byCode');
    expect(Array.isArray(stats.byCode)).toBe(true);
  });
});
