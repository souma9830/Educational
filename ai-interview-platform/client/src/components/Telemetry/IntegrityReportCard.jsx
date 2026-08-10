import React from 'react';

export default function IntegrityReportCard({ score = 100, violations = [] }) {
  const getScoreBadgeClass = (s) => {
    if (s >= 85) return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    if (s >= 60) return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h4 className="text-lg font-semibold text-slate-100">Proctoring & Integrity Summary</h4>
          <p className="text-xs text-slate-400 mt-1">Real-time candidate telemetry analysis</p>
        </div>
        <div className={`px-4 py-1.5 rounded-full border text-sm font-bold ${getScoreBadgeClass(score)}`}>
          Integrity Score: {score}%
        </div>
      </div>

      <div className="space-y-2">
        <h5 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Event Timeline</h5>
        {violations.length === 0 ? (
          <p className="text-sm text-emerald-400 font-medium py-2">✓ No proctoring violations recorded during interview.</p>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {violations.map((v, i) => (
              <div key={v.id || i} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs flex justify-between items-center">
                <div>
                  <span className="font-semibold text-amber-400">{v.type}</span>
                  <p className="text-slate-400 text-[11px] mt-0.5">{v.details || 'Window/tab focus lost'}</p>
                </div>
                <span className="text-slate-500 text-[10px]">{new Date(v.timestamp).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
