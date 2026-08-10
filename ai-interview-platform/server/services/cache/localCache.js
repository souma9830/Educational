const cache = new Map();

const ttlCleanup = setInterval(() => {
  const now = Date.now();
  for (const [key, item] of cache) {
    if (now > item.expiry) {
      cache.delete(key);
    }
  }
}, 60000);

if (ttlCleanup.unref) {
  ttlCleanup.unref();
}

class LocalCache {
  constructor() {
    this.hits = 0;
    this.misses = 0;
  }

  get(key) {
    const item = cache.get(key);
    if (!item) {
      this.misses++;
      return null;
    }
    if (Date.now() > item.expiry) {
      cache.delete(key);
      this.misses++;
      return null;
    }
    this.hits++;
    return item.value;
  }

  set(key, value, ttlMs = 300000) {
    cache.set(key, { value, expiry: Date.now() + ttlMs });
  }

  del(key) {
    cache.delete(key);
  }

  clear() {
    cache.clear();
    this.hits = 0;
    this.misses = 0;
  }

  size() {
    return cache.size;
  }

  getStats() {
    const total = this.hits + this.misses;
    return {
      hits: this.hits,
      misses: this.misses,
      hitRatio: total > 0 ? (this.hits / total).toFixed(2) : 0,
      size: cache.size
    };
  }
}

module.exports = LocalCache;
