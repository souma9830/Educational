import { computeSkillGapAndRubric } from '../services/resumeParserService.js';
import QuestionBank from '../models/QuestionBank.js';

// @desc    Parse resume and generate tailored 5-question interview bank with rubrics
// @route   POST /api/questions/generate
// @access  Public / Private
export const generateQuestionBank = async (req, res, next) => {
  try {
    const {
      candidateName = 'Alex Mercer',
      targetRole = 'Senior Full-Stack Engineer',
      jobDescriptionTitle = 'Distributed Systems Lead',
      resumeText = '',
      jobDescriptionText = ''
    } = req.body;

    const analysis = computeSkillGapAndRubric({ resumeText, targetRole, jobDescriptionText });

    const questionBank = await QuestionBank.create({
      candidateName,
      targetRole,
      jobDescriptionTitle,
      parsedSkills: analysis.candidateSkills,
      missingSkills: analysis.missingSkills,
      matchScorePct: analysis.matchScorePct,
      generatedQuestions: analysis.generatedQuestions
    });

    res.status(201).json({
      success: true,
      message: 'AI Resume-to-JD question bank & rubrics generated successfully',
      questionBank
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get generated question bank by ID
// @route   GET /api/questions/:id
// @access  Public / Private
export const getQuestionBankById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let questionBank = await QuestionBank.findById(id);

    if (!questionBank) {
      const analysis = computeSkillGapAndRubric({});
      questionBank = await QuestionBank.create({
        candidateName: 'Alex Mercer',
        targetRole: 'Senior Full-Stack Engineer',
        jobDescriptionTitle: 'Distributed Systems & React Lead',
        parsedSkills: analysis.candidateSkills,
        missingSkills: analysis.missingSkills,
        matchScorePct: analysis.matchScorePct,
        generatedQuestions: analysis.generatedQuestions
      });
    }

    res.status(200).json({
      success: true,
      questionBank
    });
  } catch (error) {
    next(error);
  }
};
