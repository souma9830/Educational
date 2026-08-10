import { useState } from 'react';
import { Cpu, ShieldCheck, HardDrive, Clock, Settings } from 'lucide-react';

const LanguageQuotaSettings = () => {
  const [memoryLimit, setMemoryLimit] = useState(128);
  const [timeoutSec, setTimeoutSec] = useState(3.0);

  return (
    <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 space-y-4 shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl">
            <Cpu size={20} />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-white">Docker Sandbox Resource Quota Configurator</h4>
            <p className="text-[11px] text-slate-400">Container memory ceiling and CPU execution timeout enforcement</p>
          </div>
        </div>

        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold rounded-xl">
          Quota Enforced
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-slate-400 flex items-center gap-1.5">
              <HardDrive size={14} className="text-blue-400" /> RAM Memory Limit ({memoryLimit} MB)
            </span>
          </div>
          <input
            type="range"
            min={64}
            max={512}
            step={32}
            value={memoryLimit}
            onChange={(e) => setMemoryLimit(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Clock size={14} className="text-purple-400" /> Max Execution Timeout ({timeoutSec}s)
            </span>
          </div>
          <input
            type="range"
            min={1.0}
            max={10.0}
            step={0.5}
            value={timeoutSec}
            onChange={(e) => setTimeoutSec(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>
      </div>
    </div>
  );
};

export default LanguageQuotaSettings;
