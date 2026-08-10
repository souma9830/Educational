const LruCache = require('../server/utils/lruCache');

describe('LRU Cache utility', () => {
  test('stores and retrieves items within capacity', () => {
    const cache = new LruCache(3);
    cache.set('a', 1);
    cache.set('b', 2);
    expect(cache.get('a')).toBe(1);
    expect(cache.get('b')).toBe(2);
    expect(cache.get('c')).toBeNull();
  });

  test('evicts oldest key when capacity is reached', () => {
    const cache = new LruCache(2);
    cache.set('a', 1);
    cache.set('b', 2);
    cache.set('c', 3); // 'a' evicted
    expect(cache.get('a')).toBeNull();
    expect(cache.get('b')).toBe(2);
    expect(cache.get('c')).toBe(3);
  });

  test('refreshes key priority on access', () => {
    const cache = new LruCache(2);
    cache.set('a', 1);
    cache.set('b', 2);
    cache.get('a'); // 'a' refreshed, 'b' is now oldest
    cache.set('c', 3); // 'b' evicted
    expect(cache.get('a')).toBe(1);
    expect(cache.get('b')).toBeNull();
    expect(cache.get('c')).toBe(3);
  });
});
