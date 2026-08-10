/**
 * Calculates audio volume RMS (Root Mean Square) and decibel levels from Float32Array PCM samples.
 */
function calculateRms(pcmData) {
  if (!pcmData || pcmData.length === 0) return 0;
  let sum = 0;
  for (let i = 0; i < pcmData.length; i++) {
    sum += pcmData[i] * pcmData[i];
  }
  const rms = Math.sqrt(sum / pcmData.length);
  return Math.min(1, Math.max(0, rms));
}

function rmsToDb(rms) {
  if (rms <= 0) return -100;
  const db = 20 * Math.log10(rms);
  return Math.max(-100, Math.round(db));
}

function normalizeAudioLevel(rms, minDb = -60, maxDb = 0) {
  const db = rmsToDb(rms);
  if (db <= minDb) return 0;
  if (db >= maxDb) return 100;
  const percentage = ((db - minDb) / (maxDb - minDb)) * 100;
  return Math.round(percentage);
}

module.exports = {
  calculateRms,
  rmsToDb,
  normalizeAudioLevel
};
