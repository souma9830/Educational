/**
 * Media constraints and browser API utility wrappers for webcam proctoring.
 */

/**
 * Default media stream constraints for webcam proctoring and telemetry sessions.
 * Optimized for low bandwidth and light memory usage (320x240 ideal video, audio noise suppression).
 */
export const DEFAULT_MEDIA_CONSTRAINTS = {
  video: {
    width: { ideal: 320 },
    height: { ideal: 240 },
    facingMode: 'user',
  },
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
  },
};

/**
 * Checks if the browser supports media devices and getUserMedia API.
 *
 * @returns {boolean}
 */
export const isMediaDevicesSupported = () => {
  return typeof navigator !== 'undefined' && Boolean(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
};

/**
 * Requests camera and microphone permissions and returns a MediaStream object.
 *
 * @param {MediaStreamConstraints} [customConstraints] - Optional overrides for media constraints.
 * @returns {Promise<MediaStream>}
 */
export const getCameraPermission = async (customConstraints = {}) => {
  if (!isMediaDevicesSupported()) {
    throw new Error('MediaDevices API is not supported in this browser environment.');
  }

  const constraints = {
    video: customConstraints.video || DEFAULT_MEDIA_CONSTRAINTS.video,
    audio: customConstraints.audio !== undefined ? customConstraints.audio : DEFAULT_MEDIA_CONSTRAINTS.audio,
  };

  return navigator.mediaDevices.getUserMedia(constraints);
};

/**
 * Safely stops all active tracks (video and audio) on a MediaStream.
 *
 * @param {MediaStream | null} stream - The MediaStream object to stop.
 */
export const stopStreamTracks = (stream) => {
  if (stream && typeof stream.getTracks === 'function') {
    stream.getTracks().forEach((track) => {
      if (track && typeof track.stop === 'function') {
        track.stop();
      }
    });
  }
};

const mediaUtils = {
  getCameraPermission,
  stopStreamTracks,
  DEFAULT_MEDIA_CONSTRAINTS,
  isMediaDevicesSupported,
};

export default mediaUtils;
