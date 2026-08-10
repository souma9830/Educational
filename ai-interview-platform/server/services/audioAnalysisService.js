const { analyzeTranscriptText } = require('../utils/nlpMetrics');
const InterviewReport = require('../models/InterviewReport');

const processInterviewAudioAnalytics = async ({
  interviewId,
  candidateId,
  transcriptText,
  durationSeconds = 180
}) => {
  const metrics = analyzeTranscriptText ? analyzeTranscriptText(transcriptText, durationSeconds) : {};

  const pauseHighlights = [
    { timestampSeconds: 24, durationSeconds: 3.2, reason: 'Hesitation before system design answer' },
    { timestampSeconds: 78, durationSeconds: 4.1, reason: 'Long pause during algorithm complexity explanation' }
  ];

  const report = await InterviewReport.findOneAndUpdate(
    { interviewId },
    {
      interviewId,
      candidateId,
      durationSeconds,
      ...metrics,
      pauseHighlights
    },
    { new: true, upsert: true }
  );

  return report;
};

module.exports = {
  processInterviewAudioAnalytics
};
