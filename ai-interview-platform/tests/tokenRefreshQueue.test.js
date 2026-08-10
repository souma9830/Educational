const TokenRefreshQueue = require('../client/src/services/tokenRefreshQueue');

describe('Token Refresh Request Queue', () => {
  let queue;

  beforeEach(() => {
    queue = new TokenRefreshQueue();
  });

  test('queues requests and resolves them with new token', async () => {
    queue.setIsRefreshing(true);
    expect(queue.getIsRefreshing()).toBe(true);

    const p1 = new Promise((res, rej) => queue.enqueue(res, rej));
    const p2 = new Promise((res, rej) => queue.enqueue(res, rej));

    queue.processQueue(null, 'NEW_JWT_TOKEN');

    const [t1, t2] = await Promise.all([p1, p2]);
    expect(t1).toBe('NEW_JWT_TOKEN');
    expect(t2).toBe('NEW_JWT_TOKEN');
    expect(queue.getIsRefreshing()).toBe(false);
  });

  test('rejects queued requests when refresh operation fails', async () => {
    queue.setIsRefreshing(true);
    const p1 = new Promise((res, rej) => queue.enqueue(res, rej));

    const refreshError = new Error('Refresh token revoked');
    queue.processQueue(refreshError, null);

    await expect(p1).rejects.toThrow('Refresh token revoked');
  });
});
