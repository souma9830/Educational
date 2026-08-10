const DB_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

const connectionOptions = {
  serverSelectionTimeoutMS: 5000,
  // Explicit TCP-handshake timeout — prevents indefinite hangs when the
  // database host is unreachable during initial boot.
  connectTimeoutMS: parseInt(process.env.DB_CONNECT_TIMEOUT, 10) || 10000,
  heartbeatFrequencyMS: 10000,
  maxPoolSize: parseInt(process.env.DB_POOL_SIZE, 10) || 10,
  minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE, 10) || 2,
  socketTimeoutMS: parseInt(process.env.DB_SOCKET_TIMEOUT, 10) || 45000,
  family: 4,
  retryWrites: true,
  w: 'majority',
};

const MAX_RETRIES = parseInt(process.env.DB_MAX_RETRIES, 10) || 5;
const RETRY_DELAY_MS = parseInt(process.env.DB_RETRY_DELAY_MS, 10) || 2000;
const MAX_BACKOFF_MS = 30000;

/**
 * wait – resolves after `ms` milliseconds.
 * @param {number} ms
 * @returns {Promise<void>}
 */
async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * backoffDelay – returns the exponential back-off delay for a given attempt
 * number (0-indexed), capped at MAX_BACKOFF_MS.
 *
 * Formula: min(RETRY_DELAY_MS * 2^attempt, MAX_BACKOFF_MS)
 *
 * Example with defaults (RETRY_DELAY_MS = 2000, MAX_BACKOFF_MS = 30000):
 *   attempt 0 →  2 000 ms
 *   attempt 1 →  4 000 ms
 *   attempt 2 →  8 000 ms
 *   attempt 3 → 16 000 ms
 *   attempt 4 → 30 000 ms  (capped)
 *
 * @param {number} attempt - Zero-indexed retry attempt number
 * @returns {number} Milliseconds to wait before the next connection attempt
 */
function backoffDelay(attempt) {
  return Math.min(RETRY_DELAY_MS * Math.pow(2, attempt), MAX_BACKOFF_MS);
}

module.exports = {
  DB_URI,
  connectionOptions,
  MAX_RETRIES,
  RETRY_DELAY_MS,
  MAX_BACKOFF_MS,
  wait,
  backoffDelay,
};
