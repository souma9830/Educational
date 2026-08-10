const {
  sanitizeHtml,
  sanitizeForDisplay,
  isValidNumeric,
  isValidEmail,
  truncate,
  validatePasswordStrength,
  sanitizeCode,
} = require('../../../client/src/utils/security');

describe('Client Security Utilities (security.js)', () => {
  describe('sanitizeHtml', () => {
    it('should escape HTML characters correctly', () => {
      const payload = '<script>alert("xss & \'test\'")</script>';
      const sanitized = sanitizeHtml(payload);
      expect(sanitized).toBe('&lt;script&gt;alert(&quot;xss &amp; &#x27;test&#x27;&quot;)&lt;&#x2F;script&gt;');
    });

    it('should handle non-string inputs safely', () => {
      expect(sanitizeHtml(null)).toBe('');
      expect(sanitizeHtml(123)).toBe('');
    });
  });

  describe('sanitizeForDisplay', () => {
    it('should strip script tags and HTML tags', () => {
      const html = '<div><script>alert(1)</script>Hello <b>World</b></div>';
      expect(sanitizeForDisplay(html)).toBe('Hello World');
    });
  });

  describe('isValidNumeric', () => {
    it('should return true for valid numeric strings within limit', () => {
      expect(isValidNumeric('123456', 6)).toBe(true);
      expect(isValidNumeric('123', 6)).toBe(true);
    });

    it('should return false for invalid or oversized numeric strings', () => {
      expect(isValidNumeric('1234567', 6)).toBe(false);
      expect(isValidNumeric('123a', 6)).toBe(false);
    });
  });

  describe('isValidEmail', () => {
    it('should validate email format', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('invalid-email')).toBe(false);
    });
  });

  describe('truncate', () => {
    it('should truncate strings exceeding maxLength', () => {
      expect(truncate('Hello World', 5)).toBe('Hello...');
      expect(truncate('Hello', 10)).toBe('Hello');
    });
  });

  describe('validatePasswordStrength', () => {
    it('should validate password strength rules', () => {
      expect(validatePasswordStrength('Pass1234')).toBe(true);
      expect(validatePasswordStrength('weak')).toBe(false);
      expect(validatePasswordStrength('nouppercase1')).toBe(false);
      expect(validatePasswordStrength('NOLOWERCASE1')).toBe(false);
      expect(validatePasswordStrength('NoDigitsHere')).toBe(false);
    });

    it('should handle null or invalid types', () => {
      expect(validatePasswordStrength(null)).toBe(false);
      expect(validatePasswordStrength(undefined)).toBe(false);
    });
  });

  describe('sanitizeCode', () => {
    it('should strip control characters from code string', () => {
      const dirtyCode = 'const x = 1;\x00\x07\x1F;';
      expect(sanitizeCode(dirtyCode)).toBe('const x = 1;;');
    });
  });
});
