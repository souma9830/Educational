const { sanitizeCodeSubmission } = require('../server/utils/sandboxSanitizer');

describe('Code Sandbox Input Sanitizer Utility', () => {
  test('approves standard safe code submissions', () => {
    const code = `function sum(a, b) { return a + b; } console.log(sum(2, 3));`;
    const res = sanitizeCodeSubmission(code);
    expect(res.safe).toBe(true);
  });

  test('blocks attempts to access child_process or fs module', () => {
    const malicious1 = `const cp = require('child_process'); cp.execSync('rm -rf /');`;
    const res1 = sanitizeCodeSubmission(malicious1);
    expect(res1.safe).toBe(false);
    expect(res1.reason).toContain('child_process');

    const malicious2 = `const fs = require('fs'); fs.readFileSync('/etc/passwd');`;
    const res2 = sanitizeCodeSubmission(malicious2);
    expect(res2.safe).toBe(false);
    expect(res2.reason).toContain('fs');
  });

  test('blocks eval calls and process exit attempts', () => {
    const code = `eval('console.log("hacked")');`;
    expect(sanitizeCodeSubmission(code).safe).toBe(false);
  });
});
