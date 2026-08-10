const questionSetService = require('../server/services/questionSetService');

describe('Custom Question Set Service Integration Test Suite', () => {
  test('fetchQuestionSets returns empty array when userId is not provided', async () => {
    const res = await questionSetService.fetchQuestionSets(null);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBe(0);
  });
});
