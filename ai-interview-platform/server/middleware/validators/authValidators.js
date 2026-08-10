const { body, validationResult } = require('express-validator');
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

    return sendError(res, 'Validation failed for incoming request payload', 400, formattedErrors);
  };
};

const signupValidation = validate([
  body('email').isEmail().withMessage('Please enter a valid email address').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('name').trim().notEmpty().withMessage('Name is required')
]);

const loginValidation = validate([
  body('email').isEmail().withMessage('Please enter a valid email address').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required')
]);

const forgotPasswordValidation = [
  body('email').isEmail().withMessage('Please enter a valid email address').normalizeEmail()
];

const resetPasswordValidation = [
  body('email').isEmail().withMessage('Please enter a valid email address').normalizeEmail(),
  body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long')
];

const verifyOTPValidator = [
  body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
  body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits')
];

const resendOTPValidator = [
  body('email').isEmail().withMessage('Valid email required').normalizeEmail()
];

const syncUserValidator = [
  body('email').isEmail().withMessage('Valid email required').normalizeEmail()
];

module.exports = {
  validate,
  signupValidation,
  loginValidation,
  forgotPasswordValidation,
  forgotPasswordValidator: forgotPasswordValidation,
  resetPasswordValidation,
  verifyOTPValidator,
  resendOTPValidator,
  syncUserValidator
};