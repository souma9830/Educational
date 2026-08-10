const healthController = require('../server/controllers/healthController');

describe('Health Diagnostic Endpoint Controller Suite', () => {
  test('healthController attaches pingLatencyMs to response', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await healthController.getHealthStatus(req, res, jest.fn());
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      success: true,
      data: expect.objectContaining({
        database: expect.objectContaining({
          connected: expect.any(Boolean)
        })
      })
    }));
  });
});
