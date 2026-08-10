import { useState } from 'react';
import { Bot, UserCheck, Sparkles, MessageSquare } from 'lucide-react';

const AiPanelInterface = () => {
  const [activePersona, setActivePersona] = useState('Dr. Aris (Staff Architect)');

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="text-purple-400" size={20} />
          <h3 className="text-lg font-black">Multi-Agent AI Panel Interview</h3>
        </div>
        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold rounded-xl">
          Speaking: {activePersona}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { name: 'Dr. Aris', role: 'Staff Architect', active: activePersona.includes('Aris') },
          { name: 'Sarah Chen', role: 'People Lead', active: activePersona.includes('Sarah') },
          { name: 'Alex Rivera', role: 'VP of Product', active: activePersona.includes('Alex') }
        ].map((agent, idx) => (
          <div key={idx} className={`p-3 rounded-xl border text-xs text-center ${agent.active ? 'bg-purple-600/20 border-purple-500 text-purple-200 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
            <span>{agent.name}</span>
            <span className="block text-[10px] text-slate-500">{agent.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiPanelInterface;
