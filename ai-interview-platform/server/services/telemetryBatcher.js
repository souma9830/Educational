/**
 * Telemetry event queue batcher for high-throughput MongoDB bulk operations.
 */
class TelemetryBatcher {
  constructor(flushCallback, options = {}) {
    this.flushCallback = flushCallback;
    this.batchSize = options.batchSize || 50;
    this.flushIntervalMs = options.flushIntervalMs || 5000;
    this.queue = [];
    this.timer = null;
  }

  startTimer() {
    if (!this.timer && this.flushIntervalMs > 0) {
      this.timer = setInterval(() => this.flush(), this.flushIntervalMs);
    }
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  enqueue(eventData) {
    this.queue.push(eventData);
    this.startTimer();
    if (this.queue.length >= this.batchSize) {
      return this.flush();
    }
    return Promise.resolve(false);
  }

  async flush() {
    if (this.queue.length === 0) return false;
    const batchToFlush = [...this.queue];
    this.queue = [];
    try {
      await this.flushCallback(batchToFlush);
      return true;
    } catch (err) {
      // Re-queue failed items at beginning
      this.queue = [...batchToFlush, ...this.queue];
      throw err;
    }
  }

  size() {
    return this.queue.length;
  }
}

module.exports = TelemetryBatcher;
