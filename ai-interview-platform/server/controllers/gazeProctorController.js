import ProctorViolation from '../models/ProctorViolation.js';
import { analyzeFacialGazeVector } from '../services/livenessService.js';

export const logGazeViolation = async (req, res, next) => {
  try {
    const { interviewId = 'session-101', yaw = 0, pitch = 0, faceCount = 1, timestampSeconds = 42 } = req.body;

    const analysis = analyzeFacialGazeVector({ yaw, pitch, faceCount });

    if (analysis.flagged) {
      const violation = await ProctorViolation.create({
        interviewId,
        candidateId: req.user?._id,
        violationType: analysis.status,
        confidenceScore: analysis.confidenceScore,
        gazeAngles: { yaw, pitch },
        timestampSeconds
      });

      return res.status(201).json({
        success: true,
        flagged: true,
        violation
      });
    }

    res.status(200).json({ success: true, flagged: false, message: 'Gaze orientation within normal bounds' });
  } catch (error) {
    next(error);
  }
};
