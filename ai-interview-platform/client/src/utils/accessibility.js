/**
 * ARIA_LIVE_REGION_STYLES
 *
 * Visually hidden styles for screen reader live announcement regions.
 * Ensures announcements are read aloud without disrupting visual layout.
 */
export const ARIA_LIVE_REGION_STYLES = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: '0',
};

/**
 * announceToScreenReader
 *
 * Announces a message to screen reader users using an ARIA live region.
 * Dynamically creates the live region element if it does not already exist.
 *
 * @param {string} message - The message text to announce.
 * @param {'polite' | 'assertive'} priority - ARIA live priority level.
 */
export function announceToScreenReader(message, priority = 'polite') {
  if (!message || typeof document === 'undefined') return;

  let el = document.getElementById('sr-announcements');
  if (!el) {
    el = document.createElement('div');
    el.id = 'sr-announcements';
    el.setAttribute('aria-live', priority);
    el.setAttribute('aria-atomic', 'true');
    Object.assign(el.style, ARIA_LIVE_REGION_STYLES);
    document.body.appendChild(el);
  } else {
    el.setAttribute('aria-live', priority);
  }

  el.textContent = '';
  requestAnimationFrame(() => {
    el.textContent = message;
  });
}

/**
 * getAriaInvalid
 *
 * Returns 'true' if validation errors exist, otherwise 'false'.
 *
 * @param {boolean | object | string | null} errors
 * @returns {'true' | 'false'}
 */
export function getAriaInvalid(errors) {
  return errors ? 'true' : 'false';
}

/**
 * getErrorId
 *
 * Constructs a standardized HTML element ID for form input error labels.
 *
 * @param {string} fieldName
 * @returns {string}
 */
export function getErrorId(fieldName) {
  return `error-${fieldName}`;
}

/**
 * setFocus
 *
 * Sets focus to an HTML element by ID or element reference.
 * If the element is not natively focusable, adds tabIndex="-1" temporarily.
 *
 * @param {string | HTMLElement} target - Element ID string or HTMLElement reference.
 */
export function setFocus(target) {
  if (typeof document === 'undefined' || !target) return;

  requestAnimationFrame(() => {
    const el = typeof target === 'string' ? document.getElementById(target) : target;
    if (el && typeof el.focus === 'function') {
      if (!el.hasAttribute('tabindex') && !/^(INPUT|TEXTAREA|SELECT|BUTTON|A)$/i.test(el.tagName)) {
        el.setAttribute('tabindex', '-1');
      }
      el.focus();
    }
  });
}

const accessibility = {
  announceToScreenReader,
  getAriaInvalid,
  getErrorId,
  setFocus,
  ARIA_LIVE_REGION_STYLES,
};

export default accessibility;
