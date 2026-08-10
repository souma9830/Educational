import { useState, useEffect, useRef } from 'react';
import CanvasToolbar from './CanvasToolbar';
import { Layout, Wifi, Download, Share2, MousePointer, Move, RefreshCw } from 'lucide-react';

const SystemDesignCanvas = ({ socket, roomId = 'session-101' }) => {
  const [nodes, setNodes] = useState([
    { id: 'n-1', type: 'Load Balancer', label: 'NGINX Ingress', x: 60, y: 100 },
    { id: 'n-2', type: 'API Gateway', label: 'Kong Gateway', x: 240, y: 100 },
    { id: 'n-3', type: 'Redis Cache', label: 'Redis Cluster', x: 440, y: 40 },
    { id: 'n-4', type: 'PostgreSQL DB', label: 'Primary DB', x: 440, y: 160 }
  ]);

  const [connectors, setConnectors] = useState([
    { id: 'c-1', fromNodeId: 'n-1', toNodeId: 'n-2', label: 'HTTP/2' },
    { id: 'c-2', fromNodeId: 'n-2', toNodeId: 'n-3', label: 'Cache Lookup' },
    { id: 'c-3', fromNodeId: 'n-2', toNodeId: 'n-4', label: 'SQL Read/Write' }
  ]);

  const [draggingNodeId, setDraggingNodeId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isConnected, setIsConnected] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!socket) return;

    socket.emit('whiteboard:join_room', { roomId });

    const handleInitState = (state) => {
      if (state.nodes?.length) setNodes(state.nodes);
      if (state.connectors?.length) setConnectors(state.connectors);
    };

    const handleNodeMoved = ({ nodeId, x, y }) => {
      setNodes((prev) => prev.map(n => n.id === nodeId ? { ...n, x, y } : n));
    };

    const handleNodeAdded = ({ node }) => {
      setNodes((prev) => [...prev, node]);
    };

    const handleCanvasCleared = () => {
      setNodes([]);
      setConnectors([]);
    };

    socket.on('whiteboard:init_state', handleInitState);
    socket.on('whiteboard:node_moved', handleNodeMoved);
    socket.on('whiteboard:node_added', handleNodeAdded);
    socket.on('whiteboard:canvas_cleared', handleCanvasCleared);

    return () => {
      socket.off('whiteboard:init_state', handleInitState);
      socket.off('whiteboard:node_moved', handleNodeMoved);
      socket.off('whiteboard:node_added', handleNodeAdded);
      socket.off('whiteboard:canvas_cleared', handleCanvasCleared);
    };
  }, [socket, roomId]);

  const handleMouseDown = (e, nodeId) => {
    e.stopPropagation();
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    setDraggingNodeId(nodeId);
    setDragOffset({
      x: e.clientX - node.x,
      y: e.clientY - node.y
    });
  };

  const handleMouseMove = (e) => {
    if (!draggingNodeId || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const newX = Math.max(10, Math.min(rect.width - 150, e.clientX - rect.left - 50));
    const newY = Math.max(10, Math.min(rect.height - 60, e.clientY - rect.top - 20));

    setNodes((prev) => prev.map(n => n.id === draggingNodeId ? { ...n, x: newX, y: newY } : n));

    if (socket) {
      socket.emit('whiteboard:update_node_position', { roomId, nodeId: draggingNodeId, x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setDraggingNodeId(null);
  };

  const handleAddNode = (type) => {
    const newNode = {
      id: `n-${Date.now()}`,
      type,
      label: `${type} Node`,
      x: 120 + Math.random() * 180,
      y: 60 + Math.random() * 100
    };
    setNodes((prev) => [...prev, newNode]);

    if (socket) {
      socket.emit('whiteboard:add_node', { roomId, node: newNode });
    }
  };

  const handleClearCanvas = () => {
    setNodes([]);
    setConnectors([]);
    if (socket) {
      socket.emit('whiteboard:clear_canvas', { roomId });
    }
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ nodes, connectors }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `System_Architecture_Diagram_${roomId}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl">
            <Layout size={20} />
          </div>
          <div>
            <h3 className="text-base font-black text-white">Real-Time Collaborative System Architecture Whiteboard</h3>
            <p className="text-[11px] text-slate-400">CRDT vector shape movements & connector arrows for live system design assessment</p>
          </div>
        </div>

        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold border ${
          isConnected ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
        }`}>
          <Wifi size={14} /> {isConnected ? 'WebSocket Sync Active' : 'Connecting...'}
        </span>
      </div>

      {/* Palette Toolbar */}
      <CanvasToolbar onAddNode={handleAddNode} onClear={handleClearCanvas} onExportJson={handleExportJson} />

      {/* Interactive SVG Diagram Canvas */}
      <div
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="relative bg-slate-950 rounded-2xl border border-slate-800 h-96 overflow-hidden p-4 select-none cursor-crosshair"
      >
        {/* SVG Connecting Vectors */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connectors.map((c) => {
            const fromNode = nodes.find(n => n.id === c.fromNodeId);
            const toNode = nodes.find(n => n.id === c.toNodeId);
            if (!fromNode || !toNode) return null;

            const x1 = fromNode.x + 70;
            const y1 = fromNode.y + 30;
            const x2 = toNode.x + 70;
            const y2 = toNode.y + 30;

            return (
              <g key={c.id}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                  strokeDasharray={c.label?.includes('Lookup') ? "4 4" : undefined}
                />
                <circle cx={(x1 + x2) / 2} cy={(y1 + y2) / 2} r="3" fill="#60a5fa" />
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => (
          <div
            key={node.id}
            onMouseDown={(e) => handleMouseDown(e, node.id)}
            style={{ left: `${node.x}px`, top: `${node.y}px` }}
            className={`absolute px-4 py-3 bg-slate-900 border rounded-2xl text-xs font-bold shadow-2xl cursor-grab active:cursor-grabbing transition-shadow flex flex-col items-center justify-center ${
              node.type === 'Load Balancer' ? 'border-blue-500 text-blue-300' :
              node.type === 'API Gateway' ? 'border-purple-500 text-purple-300' :
              node.type === 'Redis Cache' ? 'border-amber-500 text-amber-300' :
              node.type === 'PostgreSQL DB' ? 'border-emerald-500 text-emerald-300' : 'border-cyan-500 text-cyan-300'
            }`}
          >
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">{node.type}</span>
            <span className="font-extrabold text-white text-xs mt-0.5">{node.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemDesignCanvas;
