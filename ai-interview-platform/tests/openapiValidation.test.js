const fs = require('fs');
const path = require('path');

describe('OpenAPI Specification Integrity', () => {
  test('openapi.yaml file exists and contains valid structural tags', () => {
    const yamlPath = path.join(__dirname, '../docs/openapi.yaml');
    expect(fs.existsSync(yamlPath)).toBe(true);

    const content = fs.readFileSync(yamlPath, 'utf8');
    expect(content).toContain('openapi: 3.0.3');
    expect(content).toContain('AI Interview Platform API Specification');
    expect(content).toContain('/api/v1/interview/start');
  });
});
