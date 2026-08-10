/**
 * Token Blacklist Utility
 * Provides in-memory token revocation management for invalidated JWTs.
 */
class TokenBlacklist {
  constructor() {
    this.blacklistedTokens = new Map();
    // Cleanup expired tokens every 15 minutes
    this.cleanupInterval = setInterval(() => this.cleanup(), 15 * 60 * 1000);
    if (this.cleanupInterval.unref) {
      this.cleanupInterval.unref();
    }
  }

  /**
   * Revoke a token until its expiration time
   * @param {string} token - The JWT string
   * @param {number} expiresInMs - Time in milliseconds until token naturally expires
   */
  add(token, expiresInMs = 24 * 60 * 60 * 1000) {
    if (!token) return;
    const expiresAt = Date.now() + expiresInMs;
    this.blacklistedTokens.set(token, expiresAt);
  }

  /**
   * Check if a token has been revoked
   * @param {string} token - The JWT string
   * @returns {boolean} True if token is blacklisted
   */
  has(token) {
    if (!token) return false;
    const expiresAt = this.blacklistedTokens.get(token);
    if (!expiresAt) return false;
    if (Date.now() > expiresAt) {
      this.blacklistedTokens.delete(token);
      return false;
    }
    return true;
  }

  /**
   * Remove expired tokens from memory
   */
  cleanup() {
    const now = Date.now();
    for (const [token, expiresAt] of this.blacklistedTokens.entries()) {
      if (now > expiresAt) {
        this.blacklistedTokens.delete(token);
      }
    }
  }

  /**
   * Clear all blacklisted tokens (useful for testing)
   */
  clear() {
    this.blacklistedTokens.clear();
  }
}

module.exports = new TokenBlacklist();
