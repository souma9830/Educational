const { DEFAULT_COMMANDS, filterCommands } = require('../client/src/utils/commandRegistry');

describe('Command Palette Registry Unit Test Suite', () => {
  test('filterCommands filters commands correctly by query', () => {
    const res = filterCommands(DEFAULT_COMMANDS, 'coding');
    expect(res.length).toBeGreaterThan(0);
    expect(res[0].tab).toBe('coding');
  });
});
