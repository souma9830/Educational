/**
 * Candidate Interview Analytics Exporter Utility
 * Export interview reports to CSV, JSON, or Plain Text format.
 */

function calculateSessionMetrics(questions = []) {
  if (!Array.isArray(questions) || questions.length === 0) {
    return {
      totalQuestions: 0,
      answeredQuestions: 0,
      averageScore: 0,
      highestScore: 0,
      lowestScore: 0,
      categoryScores: {},
      completionRate: 0,
    };
  }

  const answered = questions.filter(q => q.score !== undefined && q.score !== null);
  const totalScores = answered.reduce((acc, q) => acc + (q.score || 0), 0);
  const averageScore = answered.length ? Number((totalScores / answered.length).toFixed(1)) : 0;
  const scores = answered.map(q => q.score || 0);
  const highestScore = scores.length ? Math.max(...scores) : 0;
  const lowestScore = scores.length ? Math.min(...scores) : 0;

  const categoryScores = {};
  const categoryCounts = {};

  questions.forEach(q => {
    const cat = q.category || 'General';
    categoryScores[cat] = (categoryScores[cat] || 0) + (q.score || 0);
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  Object.keys(categoryScores).forEach(cat => {
    categoryScores[cat] = Number((categoryScores[cat] / categoryCounts[cat]).toFixed(1));
  });

  return {
    totalQuestions: questions.length,
    answeredQuestions: answered.length,
    averageScore,
    highestScore,
    lowestScore,
    categoryScores,
    completionRate: Math.round((answered.length / questions.length) * 100),
  };
}

function convertReportToCSV(reportData = {}) {
  const headers = ['Question Number', 'Category', 'Question Text', 'Score', 'Feedback'];
  const questions = reportData.questions || [];
  const rows = questions.map((q, idx) => [
    idx + 1,
    `"${(q.category || 'General').replace(/"/g, '""')}"`,
    `"${(q.text || q.questionText || '').replace(/"/g, '""')}"`,
    q.score !== undefined ? q.score : 'N/A',
    `"${(q.userResponse || q.candidateAnswer || '').replace(/"/g, '""')}"`
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

function exportToJSON(data) {
  return JSON.stringify(data, null, 2);
}

function exportToCSV(data) {
  return convertReportToCSV(data);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculateSessionMetrics,
    convertReportToCSV,
    exportToJSON,
    exportToCSV,
  };
  module.exports.default = { calculateSessionMetrics, convertReportToCSV, exportToJSON, exportToCSV };
}
