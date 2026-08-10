import { useState } from 'react';
import { Mic, Volume2, ShieldCheck, Activity, Sliders } from 'lucide-react';

const AudioEnhancer = () => {
  const [filterActive, setFilterActive] = useState(true);
  const [cutoffFreq, setCutoffFreq] = useState(85);

  return (
    <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 space-y-4 shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl">
            <Mic size={20} />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-white">AI WebAudio Noise Suppression Pipeline</h4>
            <p className="text-[11px] text-slate-400">High-pass Biquad Filter & Dynamics Compression</p>
          </div>
        </div>

        <button
          onClick={() => setFilterActive(!filterActive)}
          className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
            filterActive ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}
        >
          {filterActive ? 'Active Gating' : 'Bypass Filter'}
        </button>
      </div>

      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex justify-between items-center text-xs font-bold">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Sliders size={14} className="text-blue-400" /> High-Pass Frequency Threshold ({cutoffFreq} Hz)
          </span>
          <span className="text-emerald-400 font-mono">Cut-off: Low Fan/Rumble Noise</span>
        </div>
        <input
          type="range"
          min={40}
          max={200}
          value={cutoffFreq}
          onChange={(e) => setCutoffFreq(Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
      </div>
    </div>
  );
};

export default AudioEnhancer;
