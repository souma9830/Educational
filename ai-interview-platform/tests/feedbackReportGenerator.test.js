const FeedbackReportGenerator = require('../server/services/feedbackReportGenerator');

describe('Feedback Report Generator Service', () => {
  const mockCandidate = { name: 'John Doe', role: 'Full Stack Engineer', email: 'john@example.com' };
  const mockSessionData = {
    score: 88,
    totalQuestions: 5,
    breakdown: { Technical: 90, Communication: 85 },
    strengths: ['Clear system design explanation', 'Strong JavaScript knowledge'],
    areasForImprovement: ['Elaborate more on edge case testing']
  };

  test('generates valid markdown report with candidate details', () => {
    const md = FeedbackReportGenerator.generateMarkdownReport(mockCandidate, mockSessionData);
    expect(md).toContain('# Candidate Evaluation Report: John Doe');
    expect(md).toContain('Overall Score:** 88 / 100');
    expect(md).toContain('Technical:** 90%');
    expect(md).toContain('- Clear system design explanation');
  });

  test('generates valid HTML document structure', () => {
    const html = FeedbackReportGenerator.generateHtmlReport(mockCandidate, mockSessionData);
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('Candidate Feedback - John Doe');
  });
});
