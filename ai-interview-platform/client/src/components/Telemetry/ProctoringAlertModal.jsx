import React from 'react';

export default function ProctoringAlertModal({ isOpen, violationCount, maxViolations = 5, onClose, violationType }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-slate-900 border border-amber-500/40 text-slate-100 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
        <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-2xl font-bold">
          ⚠️
        </div>
        <div>
          <h3 className="text-xl font-bold text-amber-200">Proctoring Warning Alert</h3>
          <p className="text-sm text-slate-300 mt-2">
            A integrity event (<span className="text-amber-400 font-semibold">{violationType || 'TAB_SWITCH'}</span>) was detected.
            Please remain on the interview screen.
          </p>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-sm">
          <span className="text-slate-400">Recorded Violations:</span>
          <span className="font-semibold text-amber-400">{violationCount} / {maxViolations}</span>
        </div>

        {violationCount >= maxViolations && (
          <p className="text-xs text-rose-400 font-semibold">
            Warning: Maximum integrity violation threshold reached. Your interview session may be automatically flagged.
          </p>
        )}

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl transition-colors focus:ring-2 focus:ring-amber-400 focus:outline-none"
        >
          I Understand & Resume Session
        </button>
      </div>
    </div>
  );
}
