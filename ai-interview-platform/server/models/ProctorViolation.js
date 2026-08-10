import mongoose from 'mongoose';

const proctorViolationSchema = new mongoose.Schema({
  interviewId: {
    type: String,
    required: true,
    index: true
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  violationType: {
    type: String,
    enum: ['off_screen_gaze', 'multiple_faces', 'face_absent', 'spoofing_attempt'],
    required: true
  },
  confidenceScore: {
    type: Number,
    default: 0.95
  },
  gazeAngles: {
    yaw: { type: Number, default: 0 },
    pitch: { type: Number, default: 0 }
  },
  timestampSeconds: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const ProctorViolation = mongoose.model('ProctorViolation', proctorViolationSchema);
export default ProctorViolation;
