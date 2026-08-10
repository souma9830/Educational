/**
 * Password Strength & Validation Rules
 *
 * Provides scoring metrics, strength labels, color mappings, and requirement
 * validation rules for user authentication forms.
 */

export const PASSWORD_REQUIREMENTS = [
  { id: 'length', label: 'At least 8 characters', test: (pwd) => Boolean(pwd && pwd.length >= 8) },
  { id: 'upper', label: 'One uppercase letter', test: (pwd) => Boolean(pwd && /[A-Z]/.test(pwd)) },
  { id: 'lower', label: 'One lowercase letter', test: (pwd) => Boolean(pwd && /[a-z]/.test(pwd)) },
  { id: 'number', label: 'One number', test: (pwd) => Boolean(pwd && /[0-9]/.test(pwd)) },
  { id: 'special', label: 'One special character', test: (pwd) => Boolean(pwd && /[^A-Za-z0-9]/.test(pwd)) },
];

/**
 * Calculates password strength score (0-5), label, and color coding.
 *
 * @param {string} password - Input password string.
 * @returns {{ score: number, label: string, color: string, percentage: number, requirements: object }}
 */
export const calculatePasswordStrength = (password) => {
  if (!password || typeof password !== 'string') {
    return {
      score: 0,
      label: 'Very Weak',
      color: '#ef4444',
      percentage: 0,
      requirements: {
        length: false,
        upper: false,
        lower: false,
        number: false,
        special: false,
      },
    };
  }

  const reqs = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  let score = 0;
  if (password.length >= 6) score += 1;
  if (reqs.length) score += 1;
  if (reqs.upper && reqs.lower) score += 1;
  if (reqs.number) score += 1;
  if (reqs.special) score += 1;

  score = Math.min(5, score);

  let label = 'Very Weak';
  let color = '#ef4444';
  let percentage = 20;

  switch (score) {
    case 0:
    case 1:
      label = 'Very Weak';
      color = '#ef4444';
      percentage = 20;
      break;
    case 2:
      label = 'Weak';
      color = '#f97316';
      percentage = 40;
      break;
    case 3:
      label = 'Medium';
      color = '#eab308';
      percentage = 60;
      break;
    case 4:
      label = 'Strong';
      color = '#22c55e';
      percentage = 80;
      break;
    case 5:
    default:
      label = 'Very Strong';
      color = '#10b981';
      percentage = 100;
      break;
  }

  return {
    score,
    label,
    color,
    percentage,
    requirements: reqs,
  };
};

/**
 * Checks whether a password satisfies all core security requirements.
 *
 * @param {string} password
 * @returns {boolean}
 */
export const validatePasswordRequirements = (password) => {
  return PASSWORD_REQUIREMENTS.every((req) => req.test(password));
};

const passwordRules = {
  calculatePasswordStrength,
  validatePasswordRequirements,
  PASSWORD_REQUIREMENTS,
};

export default passwordRules;
