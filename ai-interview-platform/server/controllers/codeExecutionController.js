import { executeInDockerSandbox } from '../services/dockerSandboxService.js';

// @desc    Execute candidate code in isolated Docker container sandbox
// @route   POST /api/sandbox/execute
// @access  Public / Private
export const executeCodeSandbox = async (req, res, next) => {
  try {
    const { code, language = 'javascript', memoryLimitMb = 128, timeoutMs = 3000 } = req.body;

    if (!code) {
      return res.status(400).json({ success: false, message: 'Code string is required' });
    }

    const result = await executeInDockerSandbox({ code, language, memoryLimitMb, timeoutMs });

    res.status(200).json({
      success: true,
      message: `Code executed successfully in Docker ${language} container`,
      result
    });
  } catch (error) {
    next(error);
  }
};
