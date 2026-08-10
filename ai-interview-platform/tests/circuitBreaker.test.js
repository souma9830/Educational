const { CircuitBreaker, STATES } = require('../server/db/circuitBreaker');

describe('Circuit Breaker Utility', () => {
  test('executes successfully in CLOSED state', async () => {
    const fn = jest.fn().mockResolvedValue('OK');
    const breaker = new CircuitBreaker(fn, { failureThreshold: 2 });

    const result = await breaker.execute();
    expect(result).toBe('OK');
    expect(breaker.getState()).toBe(STATES.CLOSED);
  });

  test('opens circuit when failure threshold is reached', async () => {
    const fn = jest.fn().mockRejectedValue(new Error('DB Error'));
    const breaker = new CircuitBreaker(fn, { failureThreshold: 2, resetTimeoutMs: 1000 });

    await expect(breaker.execute()).rejects.toThrow('DB Error');
    expect(breaker.getState()).toBe(STATES.CLOSED);

    await expect(breaker.execute()).rejects.toThrow('DB Error');
    expect(breaker.getState()).toBe(STATES.OPEN);

    // Subsequent calls fail immediately with Circuit Breaker OPEN error
    await expect(breaker.execute()).rejects.toThrow('Circuit Breaker is OPEN');
  });

  test('transitions to HALF_OPEN after timeout and closes on success', async () => {
    const fn = jest.fn()
      .mockRejectedValueOnce(new Error('Err'))
      .mockRejectedValueOnce(new Error('Err'))
      .mockResolvedValueOnce('Recovered');

    const breaker = new CircuitBreaker(fn, { failureThreshold: 2, resetTimeoutMs: 50 });

    try { await breaker.execute(); } catch {}
    try { await breaker.execute(); } catch {}

    expect(breaker.getState()).toBe(STATES.OPEN);

    // Wait for reset timeout
    await new Promise(r => setTimeout(r, 60));

    const result = await breaker.execute();
    expect(result).toBe('Recovered');
    expect(breaker.getState()).toBe(STATES.CLOSED);
  });
});
