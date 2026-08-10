/**
 * Authentication Header Utility
 *
 * Provides functions for retrieving authentication tokens from storage and
 * constructing Bearer authorization headers for API client requests.
 */

const TOKEN_KEY = 'camsense_token';

/**
 * Safely determines if the application is running in a development environment.
 * Supports both Vite (import.meta.env) and Node/Jest (process.env).
 *
 * @returns {boolean}
 */
function isDevelopment() {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return Boolean(import.meta.env.DEV);
  }
  if (typeof process !== 'undefined' && process.env) {
    return process.env.NODE_ENV === 'development';
  }
  return false;
}

/**
 * Safely determines if demo fallback tokens are enabled.
 *
 * @returns {boolean}
 */
function isDemoTokenAllowed() {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.VITE_ALLOW_DEMO_TOKEN === 'true';
  }
  if (typeof process !== 'undefined' && process.env) {
    return process.env.REACT_APP_ALLOW_DEMO_TOKEN === 'true' || process.env.VITE_ALLOW_DEMO_TOKEN === 'true';
  }
  return false;
}

/**
 * getAuthToken
 *
 * Retrieves the current authentication JWT token from localStorage or sessionStorage.
 * Returns a fallback demo token in development environments if allowed.
 *
 * @returns {string | null}
 */
export function getAuthToken() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }

  try {
    const token = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
    if (token && token.trim()) {
      return token.trim();
    }
  } catch (_err) {
    // Storage access might be restricted
  }

  if (isDevelopment() && isDemoTokenAllowed()) {
    return 'demo_token_active';
  }

  return null;
}

/**
 * getAuthHeader
 *
 * Constructs HTTP request headers containing the Bearer token authorization header.
 * Returns an empty object if no token is available.
 *
 * @returns {{ Authorization?: string }}
 */
export function getAuthHeader() {
  const token = getAuthToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}

/**
 * setAuthToken
 *
 * Stores an authentication token in localStorage.
 *
 * @param {string} token
 */
export function setAuthToken(token) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

/**
 * clearAuthToken
 *
 * Removes the authentication token from storage.
 */
export function clearAuthToken() {
  if (typeof window === 'undefined' || !window.localStorage) return;
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
}

const authHeaders = {
  getAuthHeader,
  getAuthToken,
  setAuthToken,
  clearAuthToken,
};

export default authHeaders;
