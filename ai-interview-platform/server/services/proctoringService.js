const ProctorLog = require('../models/ProctorLog');
const logger = require('./logger');

class ProctoringService {
  async logViolation({ sessionId, candidateId, violationType, severity = 'MEDIUM', metadata = {} }) {
    if (!sessionId || !candidateId || !violationType) {
      throw new Error('Missing required fields for logging proctoring violation');
    }

    try {
      const logEntry = await ProctorLog.create({
        sessionId,
        candidateId,
        violationType,
        severity,
        metadata,
        timestamp: new Date(),
      });

      logger.warn(`Proctoring violation logged for session ${sessionId}: ${violationType} [${severity}]`);
      return logEntry;
    } catch (error) {
      logger.error(`Failed to record proctoring violation for session ${sessionId}: ${error.message}`);
      throw error;
    }
  }

  async getSessionViolations(sessionId) {
    if (!sessionId) return [];
    return await ProctorLog.find({ sessionId }).sort({ timestamp: -1 }).lean();
  }

  async getViolationSummary(sessionId) {
    const logs = await this.getSessionViolations(sessionId);
    const summary = {
      totalViolations: logs.length,
      severityCounts: { LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0 },
      typeBreakdown: {},
    };

    logs.forEach((log) => {
      summary.severityCounts[log.severity] = (summary.severityCounts[log.severity] || 0) + 1;
      summary.typeBreakdown[log.violationType] = (summary.typeBreakdown[log.violationType] || 0) + 1;
    });

    return summary;
  }

  async calculateIntegrityScore(sessionId) {
    const summary = await this.getViolationSummary(sessionId);
    let penalty = 0;
    penalty += (summary.severityCounts.LOW || 0) * 2;
    penalty += (summary.severityCounts.MEDIUM || 0) * 5;
    penalty += (summary.severityCounts.HIGH || 0) * 15;
    penalty += (summary.severityCounts.CRITICAL || 0) * 30;

    const integrityScore = Math.max(0, 100 - penalty);
    return {
      sessionId,
      integrityScore,
      status: integrityScore >= 80 ? 'CLEAN' : integrityScore >= 50 ? 'REVIEW_REQUIRED' : 'FLAGGED',
      summary
    };
  }
}

module.exports = new ProctoringService();
