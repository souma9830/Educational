const { executeCode } = require('../server/services/jdoodleCompiler');

describe('JDoodle Code Execution Timeout Suite', () => {
  test('executeCode fallback handles unconfigured credentials gracefully', async () => {
    const result = await executeCode('console.log("hello")', 'javascript');
    expect(result.statusCode).toBe(200);
    expect(result.output).toContain('simulated execution');
  });
});
