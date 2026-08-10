class AnalyticsExporter {
  exportToJSON(reportData) {
    if (!reportData) throw new Error('No report data provided for export');
    return JSON.stringify(
      {
        exportTimestamp: new Date().toISOString(),
        candidate: reportData.candidateName || 'Anonymous',
        role: reportData.role || 'N/A',
        overallScore: reportData.overallScore || 0,
        skillBreakdown: reportData.skillBreakdown || [],
        feedback: reportData.summaryFeedback || '',
      },
      null,
      2
    );
  }

  exportToCSV(reportData) {
    if (!reportData) throw new Error('No report data provided for export');

    const headers = ['Candidate Name', 'Role', 'Overall Score', 'Technical Rating', 'Communication Rating', 'Date'];
    const row = [
      `"${reportData.candidateName || 'Anonymous'}"`,
      `"${reportData.role || 'N/A'}"`,
      reportData.overallScore || 0,
      reportData.technicalScore || 0,
      reportData.communicationScore || 0,
      `"${new Date().toISOString()}"`,
    ];

    return `${headers.join(',')}\n${row.join(',')}`;
  }
}

module.exports = new AnalyticsExporter();
