const { AppError, BadRequestError, UnauthorizedError, NotFoundError } = require('../server/utils/AppError');

describe('AppError Hierarchy & Serialization', () => {
  test('creates base AppError with default values', () => {
    const err = new AppError('Server error');
    expect(err.statusCode).toBe(500);
    expect(err.errorCode).toBe('INTERNAL_SERVER_ERROR');
    expect(err.isOperational).toBe(true);
  });

  test('subclasses provide correct HTTP status codes', () => {
    const badReq = new BadRequestError('Invalid payload');
    expect(badReq.statusCode).toBe(400);

    const unauth = new UnauthorizedError('Token expired');
    expect(unauth.statusCode).toBe(401);

    const notFound = new NotFoundError('Session missing');
    expect(notFound.statusCode).toBe(404);
  });

  test('serializes cleanly into JSON object', () => {
    const err = new BadRequestError('Validation failed', { field: 'email' });
    const json = err.toJSON();
    expect(json).toEqual({
      name: 'BadRequestError',
      message: 'Validation failed',
      statusCode: 400,
      errorCode: 'BAD_REQUEST',
      details: { field: 'email' }
    });
  });
});
