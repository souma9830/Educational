const { formatTimeRemaining, getTimerAlertState } = require('../client/src/utils/sessionTimer');

describe('Interview Session Timer Utility', () => {
  test('formats seconds into mm:ss strings', () => {
    expect(formatTimeRemaining(125)).toBe('02:05');
    expect(formatTimeRemaining(59)).toBe('00:59');
    expect(formatTimeRemaining(0)).toBe('00:00');
  });

  test('determines alert state levels correctly', () => {
    expect(getTimerAlertState(600).level).toBe('NORMAL');
    expect(getTimerAlertState(250).level).toBe('WARNING');
    expect(getTimerAlertState(45).level).toBe('CRITICAL');
    expect(getTimerAlertState(0).level).toBe('EXPIRED');
  });
});
