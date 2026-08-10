const { validateOTPPurpose } = require('../server/utils/authValidation');
const OTP = require('../server/models/OTP');

describe('OTP Model & Validation Audit Security', () => {
  test('validateOTPPurpose identifies supported OTP purposes', () => {
    expect(validateOTPPurpose('password-reset')).toBe(true);
    expect(validateOTPPurpose('email-verification')).toBe(true);
    expect(validateOTPPurpose('invalid-purpose')).toBe(false);
  });

  test('OTP incrementAttempts logs security warning on excessive attempts', async () => {
    const otpInstance = new OTP({
      email: 'test@example.com',
      otp: '123456',
      attempts: 4,
    });
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    otpInstance.incrementAttempts();
    expect(otpInstance.attempts).toBe(5);
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('[Security Alert]'));
    spy.mockRestore();
  });
});
