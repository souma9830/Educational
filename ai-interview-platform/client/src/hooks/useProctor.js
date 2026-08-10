import { useEffect, useState, useCallback } from 'react';

export function useProctor(active = true, options = {}) {
  const { maxViolations = 5, onViolation, onThresholdExceeded } = options;
  const [violations, setViolations] = useState(0);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [lastViolationType, setLastViolationType] = useState(null);

  const triggerViolation = useCallback((type) => {
    setLastViolationType(type);
    setShowWarningModal(true);
    setViolations((prev) => {
      const nextCount = prev + 1;
      if (onViolation) onViolation(type, nextCount);
      if (nextCount >= maxViolations && onThresholdExceeded) {
        onThresholdExceeded(nextCount);
      }
      return nextCount;
    });
  }, [maxViolations, onViolation, onThresholdExceeded]);

  useEffect(() => {
    if (!active) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        triggerViolation('TAB_SWITCH');
      }
    };

    const handleBlur = () => {
      triggerViolation('WINDOW_BLUR');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [active, triggerViolation]);

  const dismissWarning = useCallback(() => {
    setShowWarningModal(false);
  }, []);

  const resetViolations = useCallback(() => {
    setViolations(0);
    setShowWarningModal(false);
  }, []);

  const integrityScore = Math.max(0, 100 - violations * 15);

  return {
    violations,
    integrityScore,
    showWarningModal,
    lastViolationType,
    dismissWarning,
    resetViolations,
  };
}

export default useProctor;
