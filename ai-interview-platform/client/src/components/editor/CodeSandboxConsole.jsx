import { useState } from 'react';
import { Terminal, Play, ShieldAlert, Cpu } from 'lucide-react';

const CodeSandboxConsole = ({ output = 'Container Ready. Memory Limit: 128MB | Timeout: 3.0s' }) => {
  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 font-mono text-xs text-slate-300 space-y-2">
      <div className="flex items-center justify-between text-slate-500 border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-emerald-400" />
          <span className="font-bold">Docker Sandbox Console Output</span>
        </div>
        <span className="text-[10px] text-emerald-400 font-bold">Isolated Container (128MB Cap)</span>
      </div>
      <pre className="whitespace-pre-wrap text-emerald-300 leading-relaxed">{output}</pre>
    </div>
  );
};

export default CodeSandboxConsole;
