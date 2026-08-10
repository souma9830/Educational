/**
 * AbortSignal Factory Helpers
 *
 * Provides factory functions for generating timeout-based and combined
 * AbortSignal instances for network requests and async operations.
 */

/**
 * createTimedSignal
 *
 * Generates an AbortSignal that automatically aborts after the specified timeout delay.
 * Clears the internal timer if the signal is aborted prematurely to prevent memory leaks.
 *
 * @param {number} [timeoutMs=8000] - Timeout duration in milliseconds (default: 8000ms).
 * @returns {AbortSignal} An AbortSignal instance.
 */
export function createTimedSignal(timeoutMs = 8000) {
  const duration = typeof timeoutMs === 'number' && timeoutMs > 0 ? timeoutMs : 8000;

  // Use native AbortSignal.timeout if available in modern environments
  if (typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function') {
    return AbortSignal.timeout(duration);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => {
    controller.abort(new Error(`Request timed out after ${duration}ms`));
  }, duration);

  // Clear timeout if the controller signal aborts externally
  controller.signal.addEventListener('abort', () => {
    clearTimeout(timer);
  }, { once: true });

  return controller.signal;
}

/**
 * createCompoundSignal
 *
 * Combines multiple AbortSignal instances into a single signal that aborts
 * as soon as any of the parent signals abort.
 *
 * @param {AbortSignal[]} signals - Array of AbortSignal instances to combine.
 * @returns {AbortSignal} Combined AbortSignal instance.
 */
export function createCompoundSignal(signals = []) {
  const validSignals = signals.filter((s) => s && typeof s.addEventListener === 'function');

  // Use native AbortSignal.any if available in modern browsers
  if (typeof AbortSignal !== 'undefined' && typeof AbortSignal.any === 'function') {
    return AbortSignal.any(validSignals);
  }

  const controller = new AbortController();
  for (const sig of validSignals) {
    if (sig.aborted) {
      controller.abort(sig.reason);
      return controller.signal;
    }
    sig.addEventListener('abort', () => controller.abort(sig.reason), { once: true });
  }

  return controller.signal;
}

const apiSignals = {
  createTimedSignal,
  createCompoundSignal,
};

export default apiSignals;
