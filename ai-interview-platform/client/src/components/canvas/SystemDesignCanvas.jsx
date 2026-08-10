import { useState } from 'react';
import { Layout, Database, Cpu, Server, Globe, Share2 } from 'lucide-react';

const SystemDesignCanvas = () => {
  const [nodes, setNodes] = useState([
    { id: '1', type: 'Load Balancer', x: 50, y: 100 },
    { id: '2', type: 'API Gateway', x: 200, y: 100 },
    { id: '3', type: 'Redis Cache', x: 350, y: 50 },
    { id: '4', type: 'PostgreSQL DB', x: 350, y: 150 }
  ]);

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Layout className="text-blue-400" size={18} />
          <h3 className="text-sm font-bold">Collaborative System Design Canvas</h3>
        </div>
        <span className="text-xs text-emerald-400 font-bold">Live WebSocket Sync</span>
      </div>

      <div className="relative bg-slate-950 rounded-2xl border border-slate-800 h-64 overflow-hidden p-4">
        {nodes.map((node) => (
          <div key={node.id} style={{ left: `${node.x}px`, top: `${node.y}px` }} className="absolute p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-blue-300 shadow-md">
            {node.type}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemDesignCanvas;
