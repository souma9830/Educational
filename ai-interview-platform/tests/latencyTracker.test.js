const { LatencyTracker, latencyHistogramMiddleware } = require('../server/middleware/latencyHistogram');

describe('LatencyTracker & Middleware', () => {
  let tracker;

  beforeEach(() => {
    tracker = new LatencyTracker();
  });

  test('calculates correct percentiles for sample latency data', () => {
    for (let i = 1; i <= 100; i++) {
      tracker.record(i);
    }
    const metrics = tracker.getMetrics();
    expect(metrics.count).toBe(100);
    expect(metrics.p50).toBe(50);
    expect(metrics.p90).toBe(90);
    expect(metrics.p95).toBe(95);
    expect(metrics.p99).toBe(99);
  });

  test('caps sample buffer to maxSamples limit', () => {
    tracker.maxSamples = 10;
    for (let i = 1; i <= 20; i++) {
      tracker.record(i);
    }
    expect(tracker.samples.length).toBe(10);
    expect(tracker.samples[0]).toBe(11);
  });

  test('returns zero metrics on empty samples', () => {
    const metrics = tracker.getMetrics();
    expect(metrics.count).toBe(0);
    expect(metrics.avg).toBe(0);
  });

  test('middleware records response time on finish', (done) => {
    const middleware = latencyHistogramMiddleware(tracker);
    const req = {};
    const listeners = {};
    const res = {
      on: (event, cb) => { listeners[event] = cb; }
    };

    middleware(req, res, () => {
      expect(listeners['finish']).toBeDefined();
      listeners['finish']();
      expect(tracker.samples.length).toBe(1);
      done();
    });
  });
});
