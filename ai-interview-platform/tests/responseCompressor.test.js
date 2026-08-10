const { shouldCompress, getCompressionOptions } = require('../server/middleware/responseCompressor');

describe('Response Compressor Filter Strategy', () => {
  test('skips compression when x-no-compression header is set', () => {
    const req = { headers: { 'x-no-compression': 'true' } };
    const res = { getHeader: () => 'application/json' };
    expect(shouldCompress(req, res)).toBe(false);
  });

  test('skips compression for image content types', () => {
    const req = { headers: {} };
    const res = { getHeader: () => 'image/png' };
    expect(shouldCompress(req, res)).toBe(false);
  });

  test('enables compression for standard JSON and HTML responses', () => {
    const req = { headers: {} };
    const res = { getHeader: () => 'application/json' };
    expect(shouldCompress(req, res)).toBe(true);
  });

  test('returns configured compression options with custom threshold', () => {
    const options = getCompressionOptions(2048);
    expect(options.threshold).toBe(2048);
    expect(options.level).toBe(6);
    expect(typeof options.filter).toBe('function');
  });
});
