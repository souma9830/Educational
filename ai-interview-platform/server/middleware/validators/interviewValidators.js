const { body, param, validationResult } = require('express-validator');
const { sendError } = require('../../utils/apiResponse');

const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const formattedErrors = errors.array().map(err => ({
      field: err.path || err.param,
      message: err.msg
    }));

    return sendError(res, 'Validation failed for interview payload', 400, formattedErrors);
  };
};

const createInterviewValidation = validate([
  body('jobRole').trim().notEmpty().withMessage('Job role is required'),
  body('experienceYears').optional().isNumeric().withMessage('Experience years must be a number'),
  body('interviewType').optional().isIn(['technical', 'behavioral', 'coding', 'system-design']).withMessage('Invalid interview type')
]);

const evaluateAnswerValidation = validate([
  body('interviewId').trim().notEmpty().withMessage('Interview ID is required'),
  body('questionId').trim().notEmpty().withMessage('Question ID is required'),
  body('userAnswer').trim().notEmpty().withMessage('User answer cannot be empty')
]);

module.exports = {
  createInterviewValidation,
  evaluateAnswerValidation
};