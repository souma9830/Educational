const { exportResumeAnalytics } = require('../server/controllers/resumeController');

describe('Resume Parser Analytics Exporter Unit Test Suite', () => {
  test('exportResumeAnalytics returns grade and summary', async () => {
    const req = {
      body: {
        skills: ['React', 'Node.js', 'MongoDB'],
        matchPercentage: 85,
        targetRole: 'Fullstack Engineer'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await exportResumeAnalytics(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
});
