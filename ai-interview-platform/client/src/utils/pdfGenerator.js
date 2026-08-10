import { jsPDF } from 'jspdf';
import { pdfThemes } from './pdfThemes';

/**
 * Builds and returns a jsPDF document instance containing formatted assessment report data.
 *
 * @param {object} reportData - Assessment report feedback object.
 * @param {string} role - Target engineering role.
 * @param {string} [themeName='default'] - Selected PDF theme key ('default' | 'premium').
 * @returns {jsPDF} Formatted jsPDF document instance.
 */
export function buildAssessmentPDFDoc(reportData = {}, role = 'Software Engineer', themeName = 'default') {
  const theme = pdfThemes[themeName] || pdfThemes.default;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = theme.margin.top;

  const checkPageOverflow = (needed = 10) => {
    if (y + needed > pageHeight - theme.margin.bottom) {
      doc.addPage();
      y = theme.margin.top;
    }
  };

  // Header Title
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...theme.primary);
  doc.text('Assessment Feedback Profile', theme.margin.left, y);
  y += 8;

  // Divider Line
  doc.setDrawColor(...theme.border);
  doc.line(theme.margin.left, y, 210 - theme.margin.right, y);
  y += 10;

  // Meta Information
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(...theme.text);
  doc.text(`Role: ${role}`, theme.margin.left, y);
  y += 7;
  doc.text(`Date: ${new Date().toLocaleDateString()}`, theme.margin.left, y);
  y += 14;

  // Score Summary Section
  checkPageOverflow(30);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...theme.primary);
  doc.text('Score Summary', theme.margin.left, y);
  y += 9;

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(...theme.text);
  doc.text(`Overall Score: ${reportData.overallScore ?? 0}%`, theme.margin.left, y);
  y += 7;
  doc.text(`Resume Profile Match: ${reportData.resumeScore ?? 0}%`, theme.margin.left, y);
  y += 7;
  doc.text(`Interview & Verbal Round: ${reportData.interviewScore ?? 0}%`, theme.margin.left, y);
  y += 7;
  doc.text(`Coding Environment Round: ${reportData.codingScore ?? 0}%`, theme.margin.left, y);
  y += 14;

  // Aptitude Breakdown Section
  if (reportData.breakdown) {
    checkPageOverflow(40);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(...theme.primary);
    doc.text('Aptitude Breakdown', theme.margin.left, y);
    y += 9;

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(...theme.text);

    const entries = [
      ['Syntax Accuracy', reportData.breakdown.syntaxAccuracy ?? 0],
      ['System Scalability', reportData.breakdown.systemScalability ?? 0],
      ['Verbal Communication', reportData.breakdown.verbalCommunication ?? 0],
      ['Complexity Optimization', reportData.breakdown.complexityOptimization ?? 0],
    ];

    entries.forEach(([label, score]) => {
      checkPageOverflow(10);
      doc.text(`${label}: ${score}%`, theme.margin.left, y);
      const barWidth = Math.min(100, Math.max(0, (score / 100) * 100));
      doc.setDrawColor(200, 200, 200);
      doc.setFillColor(99, 102, 241);
      doc.rect(theme.margin.left + 110, y - 3, barWidth, 4, 'F');
      y += 8;
    });
    y += 6;
  }

  // Core Strengths Section
  if (reportData.strengths && Array.isArray(reportData.strengths) && reportData.strengths.length > 0) {
    checkPageOverflow(30);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(...theme.primary);
    doc.text('Core Strengths', theme.margin.left, y);
    y += 9;

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...theme.text);

    reportData.strengths.forEach((s) => {
      const lines = doc.splitTextToSize(`• ${s}`, 170);
      checkPageOverflow(lines.length * 5 + 4);
      doc.text(lines, theme.margin.left, y);
      y += lines.length * 5 + 2;
    });
    y += 4;
  }

  // Areas for Improvement Section
  if (reportData.weaknesses && Array.isArray(reportData.weaknesses) && reportData.weaknesses.length > 0) {
    checkPageOverflow(30);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(...theme.primary);
    doc.text('Areas for Improvement', theme.margin.left, y);
    y += 9;

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...theme.text);

    reportData.weaknesses.forEach((w) => {
      const lines = doc.splitTextToSize(`• ${w}`, 170);
      checkPageOverflow(lines.length * 5 + 4);
      doc.text(lines, theme.margin.left, y);
      y += lines.length * 5 + 2;
    });
    y += 4;
  }

  // Strategic Hiring Verdict Section
  checkPageOverflow(30);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...theme.primary);
  doc.text('Strategic Hiring Verdict', theme.margin.left, y);
  y += 9;

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...theme.text);
  const reportText = reportData.feedbackReport || 'Assessment evaluation complete.';
  const splitVerdict = doc.splitTextToSize(reportText, 170);
  checkPageOverflow(splitVerdict.length * 5);
  doc.text(splitVerdict, theme.margin.left, y);

  return doc;
}

/**
 * Generates and triggers browser download of the Assessment Report PDF.
 *
 * @param {object} reportData - Report feedback object containing scores, strengths, weaknesses, and verdict.
 * @param {string} role - Selected candidate role title.
 * @param {string} [themeName='default'] - Selected PDF theme style.
 */
export function generateAssessmentPDF(reportData, role, themeName = 'default') {
  const doc = buildAssessmentPDFDoc(reportData, role, themeName);
  const safeRoleName = (role || 'Candidate').replace(/[^a-zA-Z0-9_-]/g, '_');
  const fileName = `Assessment_Report_${safeRoleName}.pdf`;
  doc.save(fileName);
}

export default generateAssessmentPDF;
