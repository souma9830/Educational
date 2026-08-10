import express from 'express';
import { analyzeSpeechMetrics, getInterviewReport } from '../controllers/analyticsController.js';

const router = express.Router();

router.post('/speech', analyzeSpeechMetrics);
router.get('/reports/:interviewId', getInterviewReport);

export default router;
