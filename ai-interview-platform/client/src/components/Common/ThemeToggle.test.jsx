const { isWcagCompliant, calculateContrastRatio } = require('../../utils/contrastChecker');

describe('Theme Contrast & WCAG Compliance Suite', () => {
  it('should verify high contrast ratio for dark mode background and text', () => {
    const bgDark = '#090d16';
    const textDark = '#f8fafc';
    const ratio = calculateContrastRatio(bgDark, textDark);
    expect(ratio).toBeGreaterThan(7.0);
    expect(isWcagCompliant(bgDark, textDark, 'AAA')).toBe(true);
  });

  it('should verify contrast ratio for light mode background and text', () => {
    const bgLight = '#ffffff';
    const textLight = '#0f172a';
    const ratio = calculateContrastRatio(bgLight, textLight);
    expect(ratio).toBeGreaterThan(7.0);
    expect(isWcagCompliant(bgLight, textLight, 'AAA')).toBe(true);
  });
});
