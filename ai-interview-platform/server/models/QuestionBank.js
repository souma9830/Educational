import mongoose from 'mongoose';

const questionBankSchema = new mongoose.Schema({
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  candidateName: {
    type: String,
    required: true,
    default: 'Alex Mercer'
  },
  targetRole: {
    type: String,
    required: true,
    default: 'Senior Full-Stack Engineer'
  },
  jobDescriptionTitle: {
    type: String,
    required: true,
    default: 'Distributed Systems & React Lead'
  },
  matchScorePct: {
    type: Number,
    min: 0,
    max: 100,
    default: 88
  },
  parsedSkills: [{
    type: String
  }],
  missingSkills: [{
    type: String
  }],
  generatedQuestions: [{
    questionId: { type: String, required: true },
    questionText: { type: String, required: true },
    category: {
      type: String,
      enum: ['Technical Depth', 'Architecture', 'System Design', 'Behavioral', 'Problem Solving'],
      default: 'Technical Depth'
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard', 'Expert'],
      default: 'Medium'
    },
    expectedModelAnswer: { type: String, required: true },
    rubricCriteria: [{
      criterion: { type: String, required: true },
      weightPct: { type: Number, default: 25 },
      sampleKeyword: { type: String }
    }],
    targetSkillGap: { type: String }
  }],
  overallEvaluationRubric: {
    minimumPassingScorePct: { type: Number, default: 75 },
    categoryWeightages: {
      technical: { type: Number, default: 40 },
      architecture: { type: Number, default: 30 },
      communication: { type: Number, default: 30 }
    }
  }
}, {
  timestamps: true
});

const QuestionBank = mongoose.model('QuestionBank', questionBankSchema);
export default QuestionBank;
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
