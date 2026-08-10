/**
 * Generic Circuit Breaker state machine for DB operations & external RPCs.
 */
const STATES = {
  CLOSED: 'CLOSED',
  OPEN: 'OPEN',
  HALF_OPEN: 'HALF_OPEN'
};

class CircuitBreaker {
  constructor(fn, options = {}) {
    this.fn = fn;
    this.failureThreshold = options.failureThreshold || 3;
    this.resetTimeoutMs = options.resetTimeoutMs || 5000;
    this.state = STATES.CLOSED;
    this.failures = 0;
    this.nextAttempt = Date.now();
  }

  async execute(...args) {
    if (this.state === STATES.OPEN) {
      if (Date.now() >= this.nextAttempt) {
        this.state = STATES.HALF_OPEN;
      } else {
        throw new Error('Circuit Breaker is OPEN: request rejected');
      }
    }

    try {
      const result = await this.fn(...args);
      this.onSuccess();
      return result;
    } catch (err) {
      this.onFailure();
      throw err;
    }
  }

  onSuccess() {
    this.failures = 0;
    this.state = STATES.CLOSED;
  }

  onFailure() {
    this.failures++;
    if (this.failures >= this.failureThreshold) {
      this.state = STATES.OPEN;
      this.nextAttempt = Date.now() + this.resetTimeoutMs;
    }
  }

  getState() {
    return this.state;
  }
}

module.exports = {
  CircuitBreaker,
  STATES
};
