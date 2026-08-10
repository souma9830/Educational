const mongoose = require('mongoose');

const PromptCacheSchema = new mongoose.Schema({
  promptHash: {
    type: String,
    required: true,
    unique: true
  },
  responseJson: {
    type: String,
    required: true
  },
  hitCount: {
    type: Number,
    default: 1
  },
  lastAccessedAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // TTL Index set to 24 hours
  }
});

PromptCacheSchema.index({ lastAccessedAt: -1 });

module.exports = mongoose.model('PromptCache', PromptCacheSchema);
