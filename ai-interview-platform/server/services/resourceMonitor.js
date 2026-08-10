/**
 * System memory & event loop lag health monitoring service.
 */
class ResourceMonitor {
  constructor(options = {}) {
    this.memoryThresholdMb = options.memoryThresholdMb || 1024; // 1 GB heap limit
    this.eventLoopLagThresholdMs = options.eventLoopLagThresholdMs || 200;
  }

  getMemoryUsage() {
    const mem = process.memoryUsage();
    return {
      rssMb: Math.round(mem.rss / 1024 / 1024),
      heapTotalMb: Math.round(mem.heapTotal / 1024 / 1024),
      heapUsedMb: Math.round(mem.heapUsed / 1024 / 1024),
      externalMb: Math.round(mem.external / 1024 / 1024)
    };
  }

  async checkEventLoopLag() {
    const start = Date.now();
    return new Promise(resolve => {
      setImmediate(() => {
        const lagMs = Date.now() - start;
        resolve(lagMs);
      });
    });
  }

  async getHealthStatus() {
    const mem = this.getMemoryUsage();
    const lagMs = await this.checkEventLoopLag();

    const isMemoryOverload = mem.heapUsedMb > this.memoryThresholdMb;
    const isLagOverload = lagMs > this.eventLoopLagThresholdMs;

    let status = 'HEALTHY';
    if (isMemoryOverload || isLagOverload) {
      status = 'DEGRADED';
    }

    return {
      status,
      uptimeSeconds: Math.floor(process.uptime()),
      memory: mem,
      eventLoopLagMs: lagMs,
      alerts: {
        memoryWarning: isMemoryOverload,
        eventLoopLagWarning: isLagOverload
      }
    };
  }
}

module.exports = ResourceMonitor;
