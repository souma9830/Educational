const { rotateBackups } = require('../server/services/backupRotation');

describe('Backup Rotation Service Suite', () => {
  test('rotateBackups returns success object structure', () => {
    const result = rotateBackups(5);
    expect(result.success).toBe(true);
    expect(result).toHaveProperty('message');
  });

  test('rotateBackups accepts retention maxAgeDays parameter', () => {
    const result = rotateBackups(5, 7);
    expect(result.success).toBe(true);
    expect(result.deletedCount).toBeDefined();
    expect(result.freedBytes).toBeDefined();
  });
});
