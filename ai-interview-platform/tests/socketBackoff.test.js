const { calculateReconnectDelay, SocketReconnectTracker } = require('../client/src/utils/socketReconnectBackoff');

describe('Socket Reconnect Exponential Backoff', () => {
  test('exponentially increases backoff delay up to maxDelayMs', () => {
    const delay1 = calculateReconnectDelay(1, 1000, 30000, 0); // 1000
    const delay2 = calculateReconnectDelay(2, 1000, 30000, 0); // 2000
    const delay3 = calculateReconnectDelay(3, 1000, 30000, 0); // 4000
    expect(delay1).toBe(1000);
    expect(delay2).toBe(2000);
    expect(delay3).toBe(4000);
  });

  test('caps delay at maxDelayMs', () => {
    const delay = calculateReconnectDelay(10, 1000, 15000, 0);
    expect(delay).toBe(15000);
  });

  test('tracker stops after maxAttempts', () => {
    const tracker = new SocketReconnectTracker({ maxAttempts: 3 });
    expect(tracker.getNextDelay()).not.toBeNull();
    expect(tracker.getNextDelay()).not.toBeNull();
    expect(tracker.getNextDelay()).not.toBeNull();
    expect(tracker.getNextDelay()).toBeNull();
  });

  test('reset clears attempt count', () => {
    const tracker = new SocketReconnectTracker({ maxAttempts: 2 });
    tracker.getNextDelay();
    tracker.getNextDelay();
    expect(tracker.shouldRetry()).toBe(false);
    tracker.reset();
    expect(tracker.shouldRetry()).toBe(true);
  });
});
