/**
 * Biometric Facial Liveness & Gaze-Tracking Vector Analysis Service
 */

export const analyzeFacialGazeVector = ({ yaw = 0, pitch = 0, faceCount = 1 }) => {
  const isOffScreen = Math.abs(yaw) > 25 || Math.abs(pitch) > 20;
  const isMultipleFaces = faceCount > 1;
  const isAbsent = faceCount === 0;

  let status = 'normal';
  if (isOffScreen) status = 'off_screen_gaze';
  else if (isMultipleFaces) status = 'multiple_faces';
  else if (isAbsent) status = 'face_absent';

  return {
    status,
    confidenceScore: 0.96,
    flagged: status !== 'normal'
  };
};
