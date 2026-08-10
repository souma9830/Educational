const SandboxValidator = require('../server/utils/sandboxValidator');

describe('Sandbox Security Validator Suite', () => {
  it('should reject empty code submissions', () => {
    const res = SandboxValidator.validate('', 'javascript');
    expect(res.safe).toBe(false);
    expect(res.violations[0].rule).toBe('empty_submission');
  });

  it('should detect and block dangerous process.exit keyword', () => {
    const res = SandboxValidator.validate('process.exit(0);', 'javascript');
    expect(res.safe).toBe(false);
    expect(res.violations.some(v => v.rule === 'suspicious_keyword')).toBe(true);
  });

  it('should detect and block child_process module requiring', () => {
    const res = SandboxValidator.validate('const cp = require("child_process");', 'javascript');
    expect(res.safe).toBe(false);
  });

  it('should allow benign algorithm logic without blocked keywords', () => {
    const code = 'function add(a, b) { return a + b; } console.log(add(2, 3));';
    const res = SandboxValidator.validate(code, 'javascript');
    expect(res.safe).toBe(true);
  });
});
