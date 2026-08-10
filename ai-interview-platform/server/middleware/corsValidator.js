/**
 * Strict dynamic CORS origin validator and domain sanitizer.
 */
function createCorsOriginValidator(allowedOrigins = []) {
  const normalizedOrigins = allowedOrigins.map(origin => origin.trim().toLowerCase());

  return function isOriginAllowed(origin) {
    if (!origin) return true; // Allow non-browser requests (same-origin, curl, server-to-server)
    
    const lowerOrigin = origin.toLowerCase();
    
    if (normalizedOrigins.includes(lowerOrigin) || normalizedOrigins.includes('*')) {
      return true;
    }

    // Wildcard domain matching e.g., *.example.com
    for (const pattern of normalizedOrigins) {
      if (pattern.startsWith('*.')) {
        const domainSuffix = pattern.slice(2);
        try {
          const parsedUrl = new URL(lowerOrigin);
          if (parsedUrl.hostname === domainSuffix || parsedUrl.hostname.endsWith('.' + domainSuffix)) {
            return true;
          }
        } catch {
          // Invalid origin URL format
        }
      }
    }

    return false;
  };
}

const corsMiddleware = (allowedOrigins = []) => {
  const validator = createCorsOriginValidator(allowedOrigins);
  return (req, res, next) => {
    const origin = req.headers.origin;
    if (origin && validator(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With');
    }
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  };
};

module.exports = {
  createCorsOriginValidator,
  corsMiddleware
};
