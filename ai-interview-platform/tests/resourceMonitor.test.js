const ResourceMonitor = require('../server/services/resourceMonitor');

describe('Resource Monitor Service', () => {
  let monitor;

  beforeEach(() => {
    monitor = new ResourceMonitor({ memoryThresholdMb: 500, eventLoopLagThresholdMs: 100 });
  });

  test('returns process memory usage metrics in MB', () => {
    const mem = monitor.getMemoryUsage();
    expect(mem.heapUsedMb).toBeGreaterThan(0);
    expect(mem.heapTotalMb).toBeGreaterThan(0);
  });

  test('measures event loop latency lag', async () => {
    const lag = await monitor.checkEventLoopLag();
    expect(typeof lag).toBe('number');
    expect(lag).toBeGreaterThanOrEqual(0);
  });

  test('reports HEALTHY status under normal operation', async () => {
    const status = await monitor.getHealthStatus();
    expect(status.status).toBe('HEALTHY');
    expect(status.uptimeSeconds).toBeGreaterThanOrEqual(0);
  });
});
