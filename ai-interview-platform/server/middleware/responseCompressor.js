/**
 * Selective payload compression filter and response header optimization.
 */
function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    return false;
  }
  const contentType = res.getHeader('Content-Type') || '';
  if (typeof contentType === 'string' && contentType.includes('image/')) {
    return false;
  }
  return true;
}

function getCompressionOptions(thresholdBytes = 1024) {
  return {
    threshold: thresholdBytes,
    filter: shouldCompress,
    level: 6 // Balanced compression ratio & CPU performance
  };
}

module.exports = {
  shouldCompress,
  getCompressionOptions
};
