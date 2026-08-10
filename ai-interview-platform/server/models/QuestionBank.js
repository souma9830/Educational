const mongoose = require('mongoose');

const questionBankSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Frontend', 'Backend', 'Fullstack', 'DevOps', 'System Design', 'Algorithms'],
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
    tags: [{ type: String }],
    questions: [
      {
        questionText: { type: String, required: true },
        sampleAnswer: { type: String },
        scoringRubric: { type: String },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

questionBankSchema.index({ category: 1, difficulty: 1 });

module.exports = mongoose.model('QuestionBank', questionBankSchema);
