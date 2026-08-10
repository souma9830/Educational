const SessionDraftStorage = require('../client/src/utils/sessionDraftStorage');

describe('Session Draft Storage Utility', () => {
  let draftStorage;
  let mockStore = {};

  beforeEach(() => {
    mockStore = {};
    global.localStorage = {
      getItem: (key) => mockStore[key] || null,
      setItem: (key, value) => { mockStore[key] = value.toString(); },
      removeItem: (key) => { delete mockStore[key]; }
    };
    draftStorage = new SessionDraftStorage();
  });

  test('saves session draft to local storage', () => {
    const data = { currentQuestionIndex: 2, answerText: 'Draft answer' };
    const saved = draftStorage.saveDraft('sess_123', data);
    expect(saved).toBe(true);
    expect(mockStore['interview_session_draft_sess_123']).toBeDefined();
  });

  test('retrieves saved session draft', () => {
    const data = { currentQuestionIndex: 1, answerText: 'Hello world' };
    draftStorage.saveDraft('sess_456', data);
    const draft = draftStorage.getDraft('sess_456');
    expect(draft.sessionId).toBe('sess_456');
    expect(draft.data.answerText).toBe('Hello world');
  });

  test('clears session draft upon completion', () => {
    draftStorage.saveDraft('sess_789', { answer: 'Done' });
    draftStorage.clearDraft('sess_789');
    expect(draftStorage.getDraft('sess_789')).toBeNull();
  });
});
