/**
 * Request queueing manager for async token refresh operations.
 */
class TokenRefreshQueue {
  constructor() {
    this.isRefreshing = false;
    this.failedQueue = [];
  }

  getIsRefreshing() {
    return this.isRefreshing;
  }

  setIsRefreshing(val) {
    this.isRefreshing = !!val;
  }

  enqueue(resolve, reject) {
    this.failedQueue.push({ resolve, reject });
  }

  processQueue(error, newToken = null) {
    this.failedQueue.forEach(promise => {
      if (error) {
        promise.reject(error);
      } else {
        promise.resolve(newToken);
      }
    });
    this.failedQueue = [];
    this.isRefreshing = false;
  }

  clear() {
    this.failedQueue = [];
    this.isRefreshing = false;
  }
}

module.exports = TokenRefreshQueue;
