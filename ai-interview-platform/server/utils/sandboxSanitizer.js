/**
 * Code submission input sanitizer for code execution sandbox security.
 */
const DANGEROUS_PATTERNS = [
  /require\s*\(\s*['"]child_process['"]\s*\)/i,
  /require\s*\(\s*['"]fs['"]\s*\)/i,
  /process\.exit/i,
  /process\.env/i,
  /__dirname/i,
  /__filename/i,
  /eval\s*\(/i,
  /execSync/i,
  /spawnSync/i
];

function sanitizeCodeSubmission(code, language = 'javascript') {
  if (!code || typeof code !== 'string') {
    return { safe: false, reason: 'Empty or invalid code payload' };
  }

  if (code.length > 50000) { // Max 50KB code length
    return { safe: false, reason: 'Code submission exceeds size limit' };
  }

  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(code)) {
      return { safe: false, reason: `Forbidden security construct detected: ${pattern.toString()}` };
    }
  }

  return { safe: true, code };
}

module.exports = {
  sanitizeCodeSubmission,
  DANGEROUS_PATTERNS
};
