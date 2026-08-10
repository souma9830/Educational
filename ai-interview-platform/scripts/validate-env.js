/**
 * Environment Variable Validation Script
 * Validates required & optional environment variables for local development and deployment.
 */
require('dotenv').config();

const REQUIRED_VARS = [];
const RECOMMENDED_VARS = ['PORT', 'NODE_ENV', 'GEMINI_API_KEY', 'MONGODB_URI'];

function validateEnvironment() {
  console.log('[Env Validator] Checking application environment variables...');

  const missingRequired = REQUIRED_VARS.filter((key) => !process.env[key]);
  const missingRecommended = RECOMMENDED_VARS.filter((key) => !process.env[key]);

  if (missingRequired.length > 0) {
    console.error(`[Env Validator Error] Missing required variables: ${missingRequired.join(', ')}`);
    process.exit(1);
  }

  if (missingRecommended.length > 0) {
    console.warn(`[Env Validator Warning] Recommended variables missing (operating in fallback mode): ${missingRecommended.join(', ')}`);
  } else {
    console.log('[Env Validator Success] All environment variables are correctly configured.');
  }
}

if (require.main === module) {
  validateEnvironment();
}

module.exports = { validateEnvironment };
