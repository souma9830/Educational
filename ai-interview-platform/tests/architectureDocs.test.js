const fs = require('fs');
const path = require('path');

describe('Documentation Architecture Integrity Test Suite', () => {
  test('API_USAGE.md and DEVELOPMENT_SETUP.md documentation files exist', () => {
    const apiDocExists = fs.existsSync(path.join(__dirname, '../docs/API_USAGE.md'));
    const setupDocExists = fs.existsSync(path.join(__dirname, '../docs/DEVELOPMENT_SETUP.md'));
    expect(apiDocExists).toBe(true);
    expect(setupDocExists).toBe(true);
  });
});
