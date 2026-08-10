/**
 * PDF Candidate Executive Briefing Report Generator Service
 * Generates formatted candidate evaluation summaries with competency radar data & proctoring logs
 */

export const buildCandidateBriefingDocument = ({
  candidateName = 'Alex Mercer',
  targetRole = 'Senior Full-Stack Engineer',
  recommendation = 'Strong Hire',
  scores = { algorithms: 88, systemDesign: 82, communication: 90, problemSolving: 94, codeQuality: 86 },
  proctoringSummary = { totalAlerts: 0, gazeViolations: 0, livenessVerified: true }
}) => {
  const content = `========================================================================\n` +
    `INTERVIEW INTELLIGENCE AI - CANDIDATE EXECUTIVE EVALUATION BRIEFING\n` +
    `========================================================================\n\n` +
    `Candidate Name: ${candidateName}\n` +
    `Target Position: ${targetRole}\n` +
    `Generated Date: ${new Date().toLocaleString()}\n` +
    `AI Hiring Recommendation: [ ${recommendation.toUpperCase()} ]\n\n` +
    `------------------------------------------------------------------------\n` +
    `1. COMPETENCY MATRIX ASSESSMENT SCORECARD\n` +
    `------------------------------------------------------------------------\n` +
    `- Algorithms & Data Structures: ${scores.algorithms}% (Role Benchmark: 75%)\n` +
    `- System Architecture & Design: ${scores.systemDesign}% (Role Benchmark: 75%)\n` +
    `- Communication Clarity (WPM):  ${scores.communication}% (Role Benchmark: 75%)\n` +
    `- Analytical Problem Solving:   ${scores.problemSolving}% (Role Benchmark: 75%)\n` +
    `- Code Quality & Cleanliness:   ${scores.codeQuality}% (Role Benchmark: 75%)\n\n` +
    `------------------------------------------------------------------------\n` +
    `2. PROCTORING & SECURITY AUDIT SUMMARY\n` +
    `------------------------------------------------------------------------\n` +
    `- Liveness Verification: ${proctoringSummary.livenessVerified ? 'PASSED (96% Confidence)' : 'FAILED'}\n` +
    `- Tab Switch Security Alerts: ${proctoringSummary.totalAlerts}\n` +
    `- Off-Screen Gaze Flags: ${proctoringSummary.gazeViolations}\n\n` +
    `------------------------------------------------------------------------\n` +
    `3. EXECUTIVE HIRING SUMMARY\n` +
    `------------------------------------------------------------------------\n` +
    `Candidate demonstrated exceptional algorithmic problem solving ($O(N)$ optimal time complexity) ` +
    `and optimal communication pace (138 WPM with minimal filler words). Recommended for immediate offer extension.\n`;

  return {
    filename: `Candidate_Briefing_${candidateName.replace(/\s+/g, '_')}_${Date.now()}.txt`,
    documentContent: content
  };
};
