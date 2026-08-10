const fs = require('fs');
const path = require('path');

describe('ESLint Code Quality Configuration Test Suite', () => {
  test('ESLint configuration file exists and contains essential rules', () => {
    const eslintPath = path.join(__dirname, '../.eslintrc.json');
    expect(fs.existsSync(eslintPath)).toBe(true);

    const config = JSON.parse(fs.readFileSync(eslintPath, 'utf8'));
    expect(config.rules).toBeDefined();
    expect(config.rules['no-var']).toBe('error');
    expect(config.env.node).toBe(true);
    expect(config.env.browser).toBe(true);
  });
});
