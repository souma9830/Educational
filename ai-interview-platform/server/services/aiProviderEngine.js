const { extractCleanJson } = require('../utils/jsonSanitizer');
const CircuitBreaker = require('../utils/circuitBreaker');

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

class AIProviderEngine {
  constructor() {
    this.primaryBreaker = new CircuitBreaker({ failureThreshold: 3, resetTimeout: 20000 });
  }

  parseAiResponse(rawString) {
    return extractCleanJson(rawString);
  }

  async evaluateWithFallback(primaryCall, secondaryCall) {
    try {
      return await this.primaryBreaker.execute(primaryCall, async (err) => {
        console.warn(`[AI Engine] Primary provider failed or opened breaker (${err.message}). Invoking fallback provider...`);
        if (typeof secondaryCall === 'function') {
          return await secondaryCall();
        }
        return {
          score: 75,
          feedback: 'Evaluated using system heuristic fallback mode due to temporary AI service unavailability.',
          isFallback: true
        };
      });
    } catch (error) {
      console.error('[AI Engine] All provider executions failed:', error.message);
      return {
        score: 70,
        feedback: 'Standard evaluation generated via platform safe default fallback.',
        isFallback: true,
        error: error.message
      };
    }
  }
}

module.exports = new AIProviderEngine();
