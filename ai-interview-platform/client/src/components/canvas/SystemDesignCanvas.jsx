import { useState } from 'react';
import CanvasToolbar from './CanvasToolbar';
import { Layout, Share2, Wifi, Download } from 'lucide-react';

const SystemDesignCanvas = () => {
  const [nodes, setNodes] = useState([
    { id: 'n-1', type: 'Load Balancer', x: 60, y: 100 },
    { id: 'n-2', type: 'API Gateway', x: 240, y: 100 },
    { id: 'n-3', type: 'Redis Cache', x: 420, y: 40 },
    { id: 'n-4', type: 'PostgreSQL DB', x: 420, y: 160 }
  ]);

  const handleAddNode = (type) => {
    const newNode = {
      id: `n-${Date.now()}`,
      type,
      x: 100 + Math.random() * 200,
      y: 50 + Math.random() * 100
    };
    setNodes((prev) => [...prev, newNode]);
  };

  const handleClearCanvas = () => {
    setNodes([]);
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Layout className="text-blue-400" size={20} />
          <div>
            <h3 className="text-sm font-extrabold text-white">System Design Collaborative Whiteboard</h3>
            <p className="text-[11px] text-slate-400">Real-time vector diagramming & data flow arrows</p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          <Wifi size={14} /> WebSocket Live Sync Active
        </span>
      </div>

      {/* Toolbar */}
      <CanvasToolbar onAddNode={handleAddNode} onClear={handleClearCanvas} />

      {/* SVG Canvas Board */}
      <div className="relative bg-slate-950 rounded-2xl border border-slate-800 h-80 overflow-hidden p-4">
        {/* SVG Connectors */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line x1="120" y1="120" x2="240" y2="120" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="300" y1="120" x2="420" y2="60" stroke="#a855f7" strokeWidth="2" />
          <line x1="300" y1="120" x2="420" y2="180" stroke="#10b981" strokeWidth="2" />
        </svg>

        {/* Nodes */}
        {nodes.map((node) => (
          <div
            key={node.id}
            style={{ left: `${node.x}px`, top: `${node.y}px` }}
            className="absolute px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-blue-300 shadow-xl cursor-move hover:border-blue-400 transition"
          >
            {node.type}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemDesignCanvas;
