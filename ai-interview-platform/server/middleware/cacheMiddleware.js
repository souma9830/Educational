const memoryCache = new Map();

export const cacheResponse = (ttlSeconds = 300) => {
  return (req, res, next) => {
    if (req.method !== 'GET') return next();

    const key = req.originalUrl || req.url;
    const cached = memoryCache.get(key);

    if (cached && Date.now() < cached.expiry) {
      res.setHeader('X-Cache', 'HIT');
      return res.status(200).json(cached.data);
    }

    const originalJson = res.json.bind(res);
    res.json = (body) => {
      res.setHeader('X-Cache', 'MISS');
      if (res.statusCode >= 200 && res.statusCode < 300) {
        memoryCache.set(key, { data: body, expiry: Date.now() + ttlSeconds * 1000 });
      }
      return originalJson(body);
    };

    next();
  };
};
