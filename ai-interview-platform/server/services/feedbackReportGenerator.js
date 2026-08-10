/**
 * Structured Markdown and HTML report generator for candidate interview evaluation.
 */
class FeedbackReportGenerator {
  static generateMarkdownReport(candidate, sessionData) {
    const { name, role, email } = candidate;
    const { score, totalQuestions, breakdown, strengths, areasForImprovement } = sessionData;

    let md = `# Candidate Evaluation Report: ${name}\n\n`;
    md += `**Target Role:** ${role}\n`;
    md += `**Email:** ${email}\n`;
    md += `**Overall Score:** ${score} / 100\n`;
    md += `**Total Questions Answered:** ${totalQuestions}\n\n`;

    md += `## Performance Breakdown\n`;
    if (breakdown) {
      for (const [category, val] of Object.entries(breakdown)) {
        md += `- **${category}:** ${val}%\n`;
      }
    }
    md += `\n## Strengths\n`;
    if (Array.isArray(strengths)) {
      strengths.forEach(s => { md += `- ${s}\n`; });
    }

    md += `\n## Areas for Improvement\n`;
    if (Array.isArray(areasForImprovement)) {
      areasForImprovement.forEach(a => { md += `- ${a}\n`; });
    }

    return md;
  }

  static generateHtmlReport(candidate, sessionData) {
    const md = this.generateMarkdownReport(candidate, sessionData);
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Candidate Feedback - ${candidate.name}</title>
  <style>
    body { font-family: sans-serif; padding: 2rem; line-height: 1.6; color: #1e293b; }
    h1 { color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem; }
    h2 { color: #334155; margin-top: 1.5rem; }
    ul { padding-left: 1.2rem; }
    .badge { background: #e0e7ff; color: #3730a3; padding: 0.2rem 0.6rem; border-radius: 4px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <pre style="white-space: pre-wrap;">${md}</pre>
  </div>
</body>
</html>`;
    return html;
  }
}

module.exports = FeedbackReportGenerator;
