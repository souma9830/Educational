/**
 * Response time latency tracker and percentile distribution aggregator.
 */
class LatencyTracker {
  constructor() {
    this.buckets = {
      p50: 0,
      p90: 0,
      p95: 0,
      p99: 0
    };
    this.samples = [];
    this.maxSamples = 1000;
  }

  record(durationMs) {
    if (typeof durationMs !== 'number' || durationMs < 0) return;
    this.samples.push(durationMs);
    if (this.samples.length > this.maxSamples) {
      this.samples.shift();
    }
  }

  getMetrics() {
    if (this.samples.length === 0) {
      return { count: 0, avg: 0, p50: 0, p90: 0, p95: 0, p99: 0 };
    }
    const sorted = [...this.samples].sort((a, b) => a - b);
    const count = sorted.length;
    const sum = sorted.reduce((acc, val) => acc + val, 0);

    const getPercentile = (p) => {
      const idx = Math.ceil((p / 100) * count) - 1;
      return sorted[Math.max(0, idx)];
    };

    return {
      count,
      avg: Math.round((sum / count) * 100) / 100,
      p50: getPercentile(50),
      p90: getPercentile(90),
      p95: getPercentile(95),
      p99: getPercentile(99)
    };
  }

  reset() {
    this.samples = [];
  }
}

const defaultTracker = new LatencyTracker();

const latencyHistogramMiddleware = (tracker = defaultTracker) => {
  return (req, res, next) => {
    const start = process.hrtime.bigint();
    res.on('finish', () => {
      const end = process.hrtime.bigint();
      const durationMs = Number(end - start) / 1e6;
      tracker.record(durationMs);
    });
    next();
  };
};

module.exports = {
  LatencyTracker,
  latencyHistogramMiddleware,
  defaultTracker
};
