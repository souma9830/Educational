const { calculateRms, rmsToDb, normalizeAudioLevel } = require('../client/src/utils/audioLevelCalculator');

describe('Audio Level Calculator Utility', () => {
  test('returns 0 for empty or silent PCM buffer', () => {
    const silentBuffer = new Float32Array([0, 0, 0, 0]);
    expect(calculateRms(silentBuffer)).toBe(0);
    expect(normalizeAudioLevel(0)).toBe(0);
  });

  test('calculates correct RMS for standard sine wave sample', () => {
    const sample = new Float32Array([0.5, -0.5, 0.5, -0.5]);
    const rms = calculateRms(sample);
    expect(rms).toBe(0.5);
  });

  test('normalizes decibel values into 0-100 percentage scale', () => {
    // rms 1 => 0 dB => 100%
    expect(normalizeAudioLevel(1)).toBe(100);
    // rms 0.001 => -60 dB => 0%
    expect(normalizeAudioLevel(0.001)).toBe(0);
  });
});
