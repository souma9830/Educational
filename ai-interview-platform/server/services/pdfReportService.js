/**
 * PDF Candidate Executive Briefing Report Generator
 */

export const generateCandidatePdfReport = ({ candidateName = 'Alex Mercer', role = 'Senior Full-Stack Engineer' }) => {
  return {
    filename: `Candidate_Briefing_${candidateName.replace(/\s+/g, '_')}.pdf`,
    downloadUrl: `/downloads/reports/${Date.now()}.pdf`,
    generatedAt: new Date().toISOString()
  };
};
