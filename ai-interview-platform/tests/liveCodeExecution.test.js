const { executeCode } = require('../server/services/jdoodleCompiler');

describe('Code Execution & Output Stream Integration Tests', () => {
  test('executeCode returns simulated fallback message when API credentials are missing', async () => {
    const res = await executeCode('console.log("hello");', 'javascript');
    expect(res).toBeDefined();
    expect(res.statusCode).toBe(200);
    expect(res.output).toContain('No client credentials configured');
  });
});
