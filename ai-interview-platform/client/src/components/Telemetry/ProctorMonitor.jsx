import React, { useEffect, useState } from 'react';

export default function ProctorMonitor({ sessionId, candidateId, onViolationLogged }) {
  const [violations, setViolations] = useState([]);
  const [warningMessage, setWarningMessage] = useState(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        recordViolation('TAB_SWITCH', 'HIGH', { note: 'Candidate switched tabs or minimized window' });
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        recordViolation('FULLSCREEN_EXIT', 'MEDIUM', { note: 'Candidate exited fullscreen mode' });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [sessionId, candidateId]);

  const recordViolation = async (violationType, severity, metadata) => {
    const token = localStorage.getItem('camsense_token');
    if (!token || !sessionId || !candidateId) return;

    try {
      const response = await fetch('/api/proctoring/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sessionId, candidateId, violationType, severity, metadata }),
      });
      const data = await response.json();
      if (data.success) {
        setViolations((prev) => [...prev, data.data]);
        setWarningMessage(`Warning: ${violationType.replace(/_/g, ' ')} detected!`);
        if (onViolationLogged) onViolationLogged(data.data);
        setTimeout(() => setWarningMessage(null), 4000);
      }
    } catch (err) {
      console.error('Failed to log proctoring violation:', err);
    }
  };

  return (
    <div className="proctor-monitor-container p-3 rounded bg-gray-900 border border-gray-700 text-white">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
          Proctoring Monitor
        </h4>
        <span className="text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-300">
          Violations: {violations.length}
        </span>
      </div>
      {warningMessage && (
        <div className="p-2 bg-red-950/80 border border-red-500 text-red-200 text-xs rounded animate-bounce">
          {warningMessage}
        </div>
      )}
    </div>
  );
}
