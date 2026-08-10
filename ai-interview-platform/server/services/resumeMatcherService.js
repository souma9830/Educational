/**
 * Resume-to-JD Skill Gap Analysis & Question Generator Service
 */

export const analyzeSkillGap = ({ resumeSkills = [], jdSkills = [] }) => {
  const matched = resumeSkills.filter(s => jdSkills.includes(s));
  const missing = jdSkills.filter(s => !resumeSkills.includes(s));

  const matchScorePct = Math.round((matched.length / Math.max(1, jdSkills.length)) * 100);

  return {
    matchedSkills: matched,
    missingSkills: missing,
    matchScorePct
  };
};
