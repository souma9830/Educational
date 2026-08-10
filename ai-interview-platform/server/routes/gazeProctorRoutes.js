import express from 'express';
import { logGazeViolation } from '../controllers/gazeProctorController.js';

const router = express.Router();

router.post('/log-gaze', logGazeViolation);

export default router;
