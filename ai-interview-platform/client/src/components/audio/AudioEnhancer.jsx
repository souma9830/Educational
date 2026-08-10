import { useState } from 'react';
import { Mic, Volume2, ShieldCheck } from 'lucide-react';

const AudioEnhancer = () => {
  const [filterActive, setFilterActive] = useState(true);

  return (
    <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Mic className="text-blue-400" size={18} />
        <div>
          <h4 className="text-xs font-bold">AI WebAudio Noise Cancellation</h4>
          <span className="text-[10px] text-slate-400">Low-Rumble High-Pass Filter Enabled</span>
        </div>
      </div>

      <button
        onClick={() => setFilterActive(!filterActive)}
        className={`px-3 py-1 rounded-xl text-xs font-bold border transition ${filterActive ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-slate-800 text-slate-400'}`}
      >
        {filterActive ? 'Active' : 'Bypass'}
      </button>
    </div>
  );
};

export default AudioEnhancer;
