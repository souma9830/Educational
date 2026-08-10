const { isDatabaseConnected } = require('../utils/database');
const { sendSuccess, handleControllerError } = require('../utils/apiResponse');
const logger = require('../services/logger');
const { getDatabaseDiagnostics } = require('../utils/healthDiagnostics');

exports.getHealthStatus = async (req, res, next) => {
  try {
    const startTime = Date.now();
    const dbConnected = isDatabaseConnected();
    const dbLatencyMs = dbConnected ? (Date.now() - startTime) : null;

    const diagnostics = getDatabaseDiagnostics();
    const health = {
      status: dbConnected ? 'healthy' : 'degraded',
      uptime: `${process.uptime().toFixed(2)}s`,
      memory: process.memoryUsage(),
      database: {
        connected: dbConnected,
        type: dbConnected ? 'mongodb' : 'file-storage',
        pingLatencyMs: dbLatencyMs,
        diagnostics: diagnostics.database,
      },
      systemDiagnostics: diagnostics.system,
      timestamp: new Date().toISOString()
    };
    logger.info('Health check requested', { databaseConnected: dbConnected, pingLatencyMs: dbLatencyMs });
    sendSuccess(res, health, 200, 'Service diagnostics updated');
  } catch (error) {
    logger.error('Health check failed', { error: error.message });
    handleControllerError(res, error, 'Failed to get health status');
  }
};

exports.getDetailedDiagnostics = async (req, res) => {
  try {
    const diagnostics = getDatabaseDiagnostics();
    sendSuccess(res, { diagnostics }, 200, 'Detailed telemetry fetched successfully');
  } catch (error) {
    logger.error('Diagnostics check failed', { error: error.message });
    handleControllerError(res, error, 'Failed to get system diagnostics');
  }
};