import { orchestratePanelResponse } from '../services/multiAgentService.js';

// @desc    Process candidate answer and generate next AI agent persona question
// @route   POST /api/agent-panel/next-turn
// @access  Public / Private
export const processPanelTurn = async (req, res, next) => {
  try {
    const { interviewId = 'session-101', candidateAnswer = '', activePersona = 'TechArchitect' } = req.body;

    const panelTurn = orchestratePanelResponse({ candidateAnswer, activePersona });

    res.status(200).json({
      success: true,
      panelTurn
    });
  } catch (error) {
    next(error);
  }
};
