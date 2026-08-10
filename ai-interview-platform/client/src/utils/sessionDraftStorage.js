/**
 * Session draft recovery and local storage helper.
 */
class SessionDraftStorage {
  constructor(storageKey = 'interview_session_draft') {
    this.storageKey = storageKey;
  }

  saveDraft(sessionId, data) {
    if (!sessionId || !data) return false;
    const payload = {
      sessionId,
      data,
      updatedAt: new Date().toISOString()
    };
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`${this.storageKey}_${sessionId}`, JSON.stringify(payload));
        return true;
      }
    } catch {
      // Ignore quota or disabled local storage
    }
    return false;
  }

  getDraft(sessionId) {
    if (!sessionId) return null;
    try {
      if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem(`${this.storageKey}_${sessionId}`);
        if (!raw) return null;
        return JSON.parse(raw);
      }
    } catch {
      return null;
    }
    return null;
  }

  clearDraft(sessionId) {
    if (!sessionId) return;
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(`${this.storageKey}_${sessionId}`);
      }
    } catch {}
  }
}

module.exports = SessionDraftStorage;
