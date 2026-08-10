const mongoose = require('mongoose');

const interviewReportSchema = new mongoose.Schema({
  interviewId: {
    type: String,
    required: true,
    index: true
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  wordsPerMinute: {
    type: Number,
    default: 135
  },
  totalWords: {
    type: Number,
    default: 0
  },
  durationSeconds: {
    type: Number,
    default: 0
  },
  fillerWords: [{
    word: { type: String, required: true },
    count: { type: Number, default: 0 }
  }],
  totalFillerCount: {
    type: Number,
    default: 0
  },
  technicalDepthScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 85
  },
  confidenceIndex: {
    type: Number,
    min: 0,
    max: 100,
    default: 90
  },
  clarityRating: {
    type: String,
    enum: ['Optimal', 'Fast Pace', 'Slow Pace', 'Needs Improvement'],
    default: 'Optimal'
  },
  pauseHighlights: [{
    timestampSeconds: { type: Number },
    durationSeconds: { type: Number },
    reason: { type: String, default: 'Pause detected' }
  }]
}, {
  timestamps: true
});

interviewReportSchema.index({ candidateId: 1, createdAt: -1 });

const InterviewReport = mongoose.models.InterviewReport || mongoose.model('InterviewReport', interviewReportSchema);
module.exports = InterviewReport;
