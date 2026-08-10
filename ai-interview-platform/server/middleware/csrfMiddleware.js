import crypto from 'crypto';

export const csrfProtection = (req, res, next) => {
  let csrfToken = req.cookies?.['XSRF-TOKEN'];
  if (!csrfToken) {
    csrfToken = crypto.randomBytes(32).toString('hex');
    res.cookie('XSRF-TOKEN', csrfToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  }

  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();

  const clientToken = req.headers['x-csrf-token'] || req.headers['x-xsrf-token'];
  if (!clientToken || clientToken !== csrfToken) {
    return res.status(403).json({ success: false, message: 'CSRF token validation failed' });
  }

  next();
};
