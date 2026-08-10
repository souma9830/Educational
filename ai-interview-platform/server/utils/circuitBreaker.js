class CircuitBreaker {
  constructor({ failureThreshold = 3, resetTimeout = 20000 } = {}) {
    this.failureThreshold = failureThreshold;
    this.resetTimeout = resetTimeout;
    this.failureCount = 0;
    this.state = 'CLOSED';
    this.nextAttempt = Date.now();
  }

  async execute(action, fallbackAction) {
    if (this.state === 'OPEN') {
      if (Date.now() > this.nextAttempt) {
        this.state = 'HALF_OPEN';
      } else {
        const err = new Error('Circuit breaker is OPEN');
        if (typeof fallbackAction === 'function') return fallbackAction(err);
        throw err;
      }
    }

    try {
      const result = await action();
      this.reset();
      return result;
    } catch (err) {
      this.recordFailure();
      if (typeof fallbackAction === 'function') return fallbackAction(err);
      throw err;
    }
  }

  recordFailure() {
    this.failureCount++;
    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.resetTimeout;
    }
  }

  reset() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }
}

module.exports = CircuitBreaker;
