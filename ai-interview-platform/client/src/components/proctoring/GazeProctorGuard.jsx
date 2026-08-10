import { useState, useEffect } from 'react';
import { Eye, ShieldAlert, Camera, CheckCircle2 } from 'lucide-react';

const GazeProctorGuard = () => {
  const [gazeStatus, setGazeStatus] = useState('Normal Gaze Center');
  const [violationsCount, setViolationsCount] = useState(0);

  return (
    <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye size={16} className="text-blue-400" />
          <h4 className="text-xs font-bold">Biometric Gaze Proctoring Active</h4>
        </div>
        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold rounded-full">
          {gazeStatus}
        </span>
      </div>

      <div className="text-[11px] text-slate-400 flex items-center justify-between">
        <span>Off-Screen Gaze Flags: {violationsCount}</span>
        <span className="text-emerald-400 font-bold">Anti-Spoofing: Verified</span>
      </div>
    </div>
  );
};

export default GazeProctorGuard;
