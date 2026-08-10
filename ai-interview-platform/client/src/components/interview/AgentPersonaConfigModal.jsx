import { Bot, Sliders, X, Sparkles } from 'lucide-react';
import { useState } from 'react';

const AgentPersonaConfigModal = ({ isOpen, onClose }) => {
  const [aggressiveness, setAggressiveness] = useState('Medium');
  const [strictness, setStrictness] = useState('High');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-2xl w-full max-w-md space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Bot className="text-purple-400" size={18} />
            <h3 className="text-sm font-extrabold">Configure AI Panel Personas</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <span className="text-slate-400 font-bold block mb-1">Follow-Up Probing Intensity</span>
            <div className="grid grid-cols-3 gap-2">
              {['Low', 'Medium', 'High'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setAggressiveness(lvl)}
                  className={`p-2 rounded-xl border font-bold transition ${
                    aggressiveness === lvl ? 'bg-purple-600/20 text-purple-300 border-purple-500' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentPersonaConfigModal;
