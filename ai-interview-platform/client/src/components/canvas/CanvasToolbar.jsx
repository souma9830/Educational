import { Layout, Database, Cpu, Server, Globe, Download, Trash2, Plus, Zap, Layers } from 'lucide-react';

const CanvasToolbar = ({ onAddNode, onClear, onExportJson }) => {
  const nodeTypes = [
    { type: 'Load Balancer', icon: Globe, color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
    { type: 'API Gateway', icon: Server, color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
    { type: 'Redis Cache', icon: Cpu, color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
    { type: 'PostgreSQL DB', icon: Database, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
    { type: 'Kafka Queue', icon: Zap, color: 'text-rose-400 border-rose-500/30 bg-rose-500/10' },
    { type: 'Microservice', icon: Layers, color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' }
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-bold text-slate-400 mr-2">System Architecture Palette:</span>
        {nodeTypes.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.type}
              onClick={() => onAddNode(item.type)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 hover:bg-slate-900 ${item.color}`}
            >
              <Icon size={14} />
              <Plus size={12} /> {item.type}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onExportJson}
          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
        >
          <Download size={14} /> Export Diagram JSON
        </button>

        <button
          onClick={onClear}
          className="px-3 py-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-600 hover:text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
        >
          <Trash2 size={14} /> Clear Board
        </button>
      </div>
    </div>
  );
};

export default CanvasToolbar;
