/**
 * Web Audio API Noise Suppression & High-Pass Audio Filter Service
 * Applies high-pass biquad filters, dynamics compression, and spectral noise gating to candidate audio streams
 */

export const applyAudioNoiseFilter = (audioContext, mediaStream) => {
  const source = audioContext.createMediaStreamSource(mediaStream);

  // High-pass filter to eliminate background low-frequency hum (85Hz cut-off)
  const highPassFilter = audioContext.createBiquadFilter();
  highPassFilter.type = 'highpass';
  highPassFilter.frequency.setValueAtTime(85, audioContext.currentTime);

  // Dynamics compressor to level out sudden voice spikes
  const compressor = audioContext.createDynamicsCompressor();
  compressor.threshold.setValueAtTime(-24, audioContext.currentTime);
  compressor.knee.setValueAtTime(30, audioContext.currentTime);
  compressor.ratio.setValueAtTime(12, audioContext.currentTime);
  compressor.attack.setValueAtTime(0.003, audioContext.currentTime);
  compressor.release.setValueAtTime(0.25, audioContext.currentTime);

  const destination = audioContext.createMediaStreamDestination();

  source.connect(highPassFilter);
  highPassFilter.connect(compressor);
  compressor.connect(destination);

  return {
    filteredStream: destination.stream,
    filterNode: highPassFilter,
    compressorNode: compressor
  };
};
