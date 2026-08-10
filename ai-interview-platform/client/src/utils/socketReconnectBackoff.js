/**
 * Calculates jittered exponential backoff delays for socket reconnection.
 */
function calculateReconnectDelay(attempt, baseDelayMs = 1000, maxDelayMs = 30000, jitterRatio = 0.2) {
  if (attempt <= 0) return baseDelayMs;
  
  const exponential = baseDelayMs * Math.pow(2, attempt - 1);
  const capped = Math.min(exponential, maxDelayMs);
  
  // Calculate jitter: +/- jitterRatio
  const jitterRange = capped * jitterRatio;
  const jitter = (Math.random() * 2 - 1) * jitterRange;
  
  return Math.max(baseDelayMs, Math.round(capped + jitter));
}

class SocketReconnectTracker {
  constructor(options = {}) {
    this.baseDelayMs = options.baseDelayMs || 1000;
    this.maxDelayMs = options.maxDelayMs || 30000;
    this.maxAttempts = options.maxAttempts || 10;
    this.attempt = 0;
  }

  getNextDelay() {
    this.attempt++;
    if (this.attempt > this.maxAttempts) {
      return null; // Exceeded max reconnect attempts
    }
    return calculateReconnectDelay(this.attempt, this.baseDelayMs, this.maxDelayMs);
  }

  reset() {
    this.attempt = 0;
  }

  shouldRetry() {
    return this.attempt < this.maxAttempts;
  }
}

module.exports = {
  calculateReconnectDelay,
  SocketReconnectTracker
};
