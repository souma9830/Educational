const crypto = require('crypto');

/**
 * Double-submit cookie CSRF validation middleware.
 */
function generateCsrfToken() {
  return crypto.randomBytes(24).toString('hex');
}

const csrfDoubleSubmitMiddleware = (options = {}) => {
  const cookieName = options.cookieName || 'XSRF-TOKEN';
  const headerName = options.headerName || 'x-xsrf-token';
  const safeMethods = ['GET', 'HEAD', 'OPTIONS'];

  return (req, res, next) => {
    let tokenInCookie = req.cookies ? req.cookies[cookieName] : null;

    if (!tokenInCookie) {
      tokenInCookie = generateCsrfToken();
      res.cookie(cookieName, tokenInCookie, {
        sameSite: 'strict',
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
        httpOnly: false
      });
    }

    if (safeMethods.includes(req.method.toUpperCase())) {
      return next();
    }

    const tokenInHeader = req.headers[headerName.toLowerCase()] || (req.body ? req.body._csrf : null);

    if (!tokenInHeader || tokenInHeader !== tokenInCookie) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'CSRF_VALIDATION_FAILED',
          message: 'CSRF token validation failed or missing'
        }
      });
    }

    next();
  };
};

module.exports = {
  generateCsrfToken,
  csrfDoubleSubmitMiddleware
};
