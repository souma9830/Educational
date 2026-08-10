const TelemetryBatcher = require('../server/services/telemetryBatcher');

describe('Telemetry Event Batcher Service', () => {
  let flushMock;
  let batcher;

  beforeEach(() => {
    flushMock = jest.fn().mockResolvedValue(true);
    batcher = new TelemetryBatcher(flushMock, { batchSize: 3, flushIntervalMs: 0 });
  });

  afterEach(() => {
    batcher.stopTimer();
  });

  test('buffers items until batch size limit is triggered', async () => {
    await batcher.enqueue({ event: 'click_next' });
    await batcher.enqueue({ event: 'type_answer' });
    expect(flushMock).not.toHaveBeenCalled();
    expect(batcher.size()).toBe(2);

    await batcher.enqueue({ event: 'toggle_cam' });
    expect(flushMock).toHaveBeenCalledTimes(1);
    expect(flushMock).toHaveBeenCalledWith([
      { event: 'click_next' },
      { event: 'type_answer' },
      { event: 'toggle_cam' }
    ]);
    expect(batcher.size()).toBe(0);
  });

  test('re-queues failed items if flushCallback throws', async () => {
    const errorFlush = jest.fn().mockRejectedValue(new Error('DB Timeout'));
    const failingBatcher = new TelemetryBatcher(errorFlush, { batchSize: 1, flushIntervalMs: 0 });

    await expect(failingBatcher.enqueue({ event: 'test' })).rejects.toThrow('DB Timeout');
    expect(failingBatcher.size()).toBe(1);
    failingBatcher.stopTimer();
  });
});
