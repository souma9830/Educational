/**
 * Real-time Candidate Interview Proctoring Monitor
 * Tracks window blur, tab visibility changes, audio drops, and integrity threshold events.
 */
class ProctoringMonitor {
  constructor(options = {}) {
    this.maxViolations = options.maxViolations || 5;
    this.onViolation = options.onViolation || (() => {});
    this.violations = [];
    this.isActive = false;

    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.handleWindowBlur = this.handleWindowBlur.bind(this);
  }

  start() {
    if (typeof window === 'undefined' || this.isActive) return;
    this.isActive = true;

    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    window.addEventListener('blur', this.handleWindowBlur);
  }

  stop() {
    if (typeof window === 'undefined' || !this.isActive) return;
    this.isActive = false;

    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    window.removeEventListener('blur', this.handleWindowBlur);
  }

  recordViolation(type, details = '') {
    const violationEvent = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
      type,
      details,
      timestamp: new Date().toISOString()
    };

    this.violations.push(violationEvent);
    this.onViolation(violationEvent, this.violations.length);
    return violationEvent;
  }

  handleVisibilityChange() {
    if (document.hidden) {
      this.recordViolation('TAB_SWITCH', 'Candidate switched away from the active interview browser tab');
    }
  }

  handleWindowBlur() {
    this.recordViolation('WINDOW_BLUR', 'Focus left the interview window application bounds');
  }

  calculateIntegrityScore() {
    const penaltyPerViolation = 15;
    const rawScore = 100 - (this.violations.length * penaltyPerViolation);
    return Math.max(0, rawScore);
  }

  getViolationSummary() {
    return {
      count: this.violations.length,
      integrityScore: this.calculateIntegrityScore(),
      exceededThreshold: this.violations.length >= this.maxViolations,
      events: [...this.violations]
    };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ProctoringMonitor;
  module.exports.default = ProctoringMonitor;
}
