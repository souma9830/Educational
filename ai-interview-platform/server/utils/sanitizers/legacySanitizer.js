/**
 * Legacy Sanitizer Helper
 * Sanitizes URL parameters and legacy request headers.
 */
function sanitizeLegacyParams(params) {
  if (!params || typeof params !== 'object') return params;
  const clean = {};
  for (const [key, val] of Object.entries(params)) {
    if (typeof val === 'string') {
      clean[key] = val.replace(/[<>'"]/g, '').trim();
    } else {
      clean[key] = val;
    }
  }
  return clean;
}

module.exports = {
  sanitizeLegacyParams,
};
