/**
 * Interview session timer remaining time and warning trigger calculations.
 */
function formatTimeRemaining(secondsRemaining) {
  if (secondsRemaining <= 0) return '00:00';
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  const paddedMins = String(mins).padStart(2, '0');
  const paddedSecs = String(secs).padStart(2, '0');
  return `${paddedMins}:${paddedSecs}`;
}

function getTimerAlertState(secondsRemaining, warningThresholdSec = 300, criticalThresholdSec = 60) {
  if (secondsRemaining <= 0) {
    return { level: 'EXPIRED', message: 'Interview session time has expired' };
  }
  if (secondsRemaining <= criticalThresholdSec) {
    return { level: 'CRITICAL', message: `Only ${secondsRemaining} seconds remaining!` };
  }
  if (secondsRemaining <= warningThresholdSec) {
    return { level: 'WARNING', message: `${Math.ceil(secondsRemaining / 60)} minutes remaining` };
  }
  return { level: 'NORMAL', message: null };
}

module.exports = {
  formatTimeRemaining,
  getTimerAlertState
};
