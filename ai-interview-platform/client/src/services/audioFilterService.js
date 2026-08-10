/**
 * Web Audio API Noise Suppression & High-Pass Audio Filter Service
 */

export const applyAudioNoiseFilter = (audioContext, mediaStream) => {
  const source = audioContext.createMediaStreamSource(mediaStream);
  const biquadFilter = audioContext.createBiquadFilter();

  biquadFilter.type = 'highpass';
  biquadFilter.frequency.setValueAtTime(85, audioContext.currentTime); // Cut background low rumble

  const destination = audioContext.createMediaStreamDestination();
  source.connect(biquadFilter);
  biquadFilter.connect(destination);

  return destination.stream;
};
