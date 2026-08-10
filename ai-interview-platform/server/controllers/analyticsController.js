import { processInterviewAudioAnalytics } from '../services/audioAnalysisService.js';
import InterviewReport from '../models/InterviewReport.js';

// @desc    Analyze interview speech transcript & audio metrics
// @route   POST /api/analytics/speech
// @access  Public / Private
export const analyzeSpeechMetrics = async (req, res, next) => {
  try {
    const { interviewId = 'session-101', candidateId, transcriptText, durationSeconds = 180 } = req.body;

    const report = await processInterviewAudioAnalytics({
      interviewId,
      candidateId,
      transcriptText: transcriptText || 'Basically, um, I used a distributed cache to reduce database query latency, you know, which improved performance.',
      durationSeconds
    });

    res.status(200).json({
      success: true,
      message: 'Speech & audio analytics pipeline processed successfully',
      report
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get multi-modal interview report by ID
// @route   GET /api/analytics/reports/:interviewId
// @access  Public / Private
export const getInterviewReport = async (req, res, next) => {
  try {
    const { interviewId } = req.params;
    let report = await InterviewReport.findOne({ interviewId });

    if (!report) {
      report = await processInterviewAudioAnalytics({
        interviewId,
        transcriptText: 'Basically, um, I implemented dynamic programming, you know, to optimize time complexity.',
        durationSeconds: 150
      });
    }

    res.status(200).json({
      success: true,
      report
    });
  } catch (error) {
    next(error);
  }
};

export const exportReport = async (req, res, next) => {
  try {
    const analyticsExporter = require('../utils/analyticsExporter');
    const { format = 'json', reportData } = req.body;

    if (format === 'csv') {
      const csv = analyticsExporter.exportToCSV(reportData);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="interview-report.csv"');
      return res.send(csv);
    }

    const jsonData = analyticsExporter.exportToJSON(reportData);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="interview-report.json"');
    return res.send(jsonData);
  } catch (error) {
    next(error);
  }
};

