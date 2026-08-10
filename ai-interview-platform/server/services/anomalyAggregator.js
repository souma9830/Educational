/**
 * Proctoring anomaly event scorer and real-time severity calculator.
 */
class AnomalyAggregator {
  constructor(weights = {}) {
    this.weights = {
      tab_switch: weights.tab_switch || 15,
      multiple_faces: weights.multiple_faces || 30,
      no_face: weights.no_face || 20,
      audio_silence: weights.audio_silence || 5,
      window_blur: weights.window_blur || 10
    };
    this.events = [];
  }

  logEvent(eventType, metadata = {}) {
    const weight = this.weights[eventType] || 10;
    const eventRecord = {
      type: eventType,
      weight,
      timestamp: new Date().toISOString(),
      metadata
    };
    this.events.push(eventRecord);
    return eventRecord;
  }

  calculateRiskScore() {
    const totalScore = this.events.reduce((acc, ev) => acc + ev.weight, 0);
    let severity = 'LOW';
    if (totalScore >= 75) {
      severity = 'CRITICAL';
    } else if (totalScore >= 45) {
      severity = 'HIGH';
    } else if (totalScore >= 20) {
      severity = 'MEDIUM';
    }
    return {
      totalScore,
      severity,
      eventCount: this.events.length,
      breakdown: this.getBreakdown()
    };
  }

  getBreakdown() {
    const counts = {};
    for (const ev of this.events) {
      counts[ev.type] = (counts[ev.type] || 0) + 1;
    }
    return counts;
  }

  clear() {
    this.events = [];
  }
}

module.exports = AnomalyAggregator;
