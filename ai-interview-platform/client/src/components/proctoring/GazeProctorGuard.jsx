import { useState, useEffect } from 'react';
import { Eye, ShieldAlert, Camera, CheckCircle2, AlertTriangle, Activity } from 'lucide-react';
import api from '../../services/apiClient';

const GazeProctorGuard = ({ interviewId = 'session-101' }) => {
  const [gazeStatus, setGazeStatus] = useState('Normal Gaze Center');
  const [violationsCount, setViolationsCount] = useState(0);
  const [livenessScore, setLivenessScore] = useState(96);
  const [violationsList, setViolationsList] = useState([
    { id: 'v-1', type: 'Off-Screen Gaze', timestamp: '00:04:12', confidence: 95 }
  ]);

  const handleSimulateGazeCheck = () => {
    const isFlagged = Math.random() > 0.6;
    if (isFlagged) {
      setViolationsCount(prev => prev + 1);
      setGazeStatus('Off-Screen Look Flagged');
      setViolationsList(prev => [
        { id: `v-${Date.now()}`, type: 'Off-Screen Gaze Vector', timestamp: '00:08:45', confidence: 94 },
        ...prev
      ]);
    } else {
      setGazeStatus('Normal Gaze Center');
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl">
            <Eye size={20} />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-white">Biometric Facial Anti-Spoofing & Gaze Guard</h3>
            <p className="text-[11px] text-slate-400">Continuous 3D pupil vector tracking & liveness verification</p>
          </div>
        </div>

        <span className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border ${
          gazeStatus.includes('Flagged') ? 'bg-amber-500/20 text-amber-300 border-amber-500/30 animate-pulse' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
        }`}>
          {gazeStatus}
        </span>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Facial Liveness Score</span>
          <h4 className="text-2xl font-black text-emerald-400 mt-1">{livenessScore}% Verified</h4>
          <span className="text-[10px] text-slate-500">3D Depth Anti-Spoofing</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Off-Screen Gaze Flags</span>
          <h4 className="text-2xl font-black text-amber-400 mt-1">{violationsCount} Flags</h4>
          <span className="text-[10px] text-slate-500">Yaw/Pitch Threshold: 22°</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Face Count Integrity</span>
          <h4 className="text-2xl font-black text-blue-400 mt-1">1 Face Active</h4>
          <span className="text-[10px] text-slate-500">No Secondary Face Detected</span>
        </div>
      </div>

      {/* Real-time Violation Feed */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Activity size={14} className="text-blue-400" /> Proctoring Real-Time Violation Log
          </h4>
          <button
            onClick={handleSimulateGazeCheck}
            className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-xs font-bold rounded-lg border border-slate-800 text-slate-300"
          >
            Run Gaze Calibration Check
          </button>
        </div>

        <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
          {violationsList.map((v) => (
            <div key={v.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <AlertTriangle size={14} className="text-amber-400" />
                <span className="font-bold text-white">{v.type}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-slate-400">{v.timestamp}</span>
                <span className="font-mono font-bold text-emerald-400">{v.confidence}% Conf</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GazeProctorGuard;
