const proctoringService = require('../server/services/proctoringService');

describe('Proctoring Integrity Monitor Unit Test Suite', () => {
  test('calculateIntegrityScore returns clean status for 0 violations', async () => {
    jest.spyOn(proctoringService, 'getViolationSummary').mockResolvedValue({
      totalViolations: 0,
      severityCounts: { LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0 },
      typeBreakdown: {}
    });

    const res = await proctoringService.calculateIntegrityScore('sess-1');
    expect(res.integrityScore).toBe(100);
    expect(res.status).toBe('CLEAN');
  });
});
