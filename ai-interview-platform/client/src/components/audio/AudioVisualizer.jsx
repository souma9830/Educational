import { Activity } from 'lucide-react';

const AudioVisualizer = () => {
  const bars = [40, 65, 85, 30, 90, 75, 50, 95, 60, 45, 80, 70];

  return (
    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
      <div className="flex items-center justify-between text-xs font-bold text-slate-400">
        <span className="flex items-center gap-1.5">
          <Activity size={14} className="text-emerald-400" /> Real-Time Frequency Spectrum Meter
        </span>
        <span className="text-emerald-400 font-mono text-[10px]">Filter Gated</span>
      </div>

      <div className="flex items-end justify-between h-16 gap-1 pt-2">
        {bars.map((height, idx) => (
          <div
            key={idx}
            style={{ height: `${height}%` }}
            className="flex-1 bg-gradient-to-t from-blue-600 to-emerald-400 rounded-t transition-all duration-150"
          />
        ))}
      </div>
    </div>
  );
};

export default AudioVisualizer;
