const cacheManager = require('../server/services/cache/cacheManager');

describe('Prompt Cache TTL & Analytics Optimization Suite', () => {
  test('cacheManager tracks hit/miss statistics properly', () => {
    cacheManager.clear();
    cacheManager.set('prompt_key_1', 'cached_response_data', 10000);

    const val = cacheManager.get('prompt_key_1');
    expect(val).toBe('cached_response_data');

    const missVal = cacheManager.get('non_existent_key');
    expect(missVal).toBeNull();

    const stats = cacheManager.getStats();
    expect(stats.hits).toBe(1);
    expect(stats.misses).toBe(1);
  });
});
