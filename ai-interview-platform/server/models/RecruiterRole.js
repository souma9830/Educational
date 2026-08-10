import mongoose from 'mongoose';

const recruiterRoleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    enum: ['LeadRecruiter', 'TechnicalInterviewer', 'HRCoordinator'],
    required: true,
    unique: true
  },
  scopes: [{
    scope: { type: String, required: true },
    isAllowed: { type: Boolean, default: true }
  }]
}, {
  timestamps: true
});

const RecruiterRole = mongoose.model('RecruiterRole', recruiterRoleSchema);
export default RecruiterRole;
