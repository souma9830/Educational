const AnomalyAggregator = require('../server/services/anomalyAggregator');

describe('Proctoring Anomaly Event Aggregator', () => {
  let aggregator;

  beforeEach(() => {
    aggregator = new AnomalyAggregator();
  });

  test('calculates correct risk score and LOW severity for minor events', () => {
    aggregator.logEvent('tab_switch'); // 15
    const risk = aggregator.calculateRiskScore();
    expect(risk.totalScore).toBe(15);
    expect(risk.severity).toBe('LOW');
  });

  test('escalates severity to HIGH or CRITICAL as anomaly score increases', () => {
    aggregator.logEvent('multiple_faces'); // 30
    aggregator.logEvent('no_face'); // 20
    expect(aggregator.calculateRiskScore().severity).toBe('HIGH'); // 50

    aggregator.logEvent('multiple_faces'); // +30 = 80
    expect(aggregator.calculateRiskScore().severity).toBe('CRITICAL');
  });

  test('provides aggregated event breakdown count', () => {
    aggregator.logEvent('tab_switch');
    aggregator.logEvent('tab_switch');
    aggregator.logEvent('window_blur');
    const risk = aggregator.calculateRiskScore();
    expect(risk.breakdown).toEqual({
      tab_switch: 2,
      window_blur: 1
    });
  });
});
