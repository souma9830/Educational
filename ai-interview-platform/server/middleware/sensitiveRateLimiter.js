const logger = require('../services/logger');

const sensitiveOperations = new Map();

const CLEANUP_INTERVAL = 5 * 60 * 1000;
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of sensitiveOperations.entries()) {
    if (now - record.windowStart > record.windowMs * 2) {
      sensitiveOperations.delete(key);
    }
  }
}, CLEANUP_INTERVAL).unref();

function sensitiveRateLimiter(maxRequests = 10, windowMs = 60000) {
  return (req, res, next) => {
    const key = req.user ? (req.user._id || req.user.uid) : req.ip;
    const now = Date.now();

    if (!sensitiveOperations.has(key)) {
      sensitiveOperations.set(key, { count: 1, windowStart: now, windowMs });
      res.setHeader('X-RateLimit-Limit', maxRequests);
      res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - 1));
      return next();
    }

    const record = sensitiveOperations.get(key);

    if (now - record.windowStart > windowMs) {
      record.count = 1;
      record.windowStart = now;
      res.setHeader('X-RateLimit-Limit', maxRequests);
      res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - 1));
      return next();
    }

    record.count++;
    const remaining = Math.max(0, maxRequests - record.count);
    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', remaining);

    if (record.count > maxRequests) {
      const retryAfterSec = Math.ceil((windowMs - (now - record.windowStart)) / 1000);
      res.setHeader('Retry-After', retryAfterSec);
      logger.warn('Sensitive endpoint rate limit exceeded', { key, remaining: 0 });
      return res.status(429).json({
        success: false,
        message: 'Too many sensitive requests. Please slow down and try again later.',
        retryAfter: retryAfterSec,
      });
    }

    next();
  };
}

module.exports = { sensitiveRateLimiter };
