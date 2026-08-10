import { Layout, Server, Database, Globe, Layers, Sparkles } from 'lucide-react';

const CanvasPresetSelector = ({ onSelectPreset }) => {
  const presets = [
    {
      id: 'microservices',
      title: 'Microservices E-Commerce Architecture',
      description: 'API Gateway, Auth Service, Order Service, Redis Cache, PostgreSQL DB',
      nodeCount: 5
    },
    {
      id: 'streaming',
      title: 'Real-Time Event Streaming Pipeline',
      description: 'Ingress Load Balancer, Kafka Event Bus, Analytics Worker, MongoDB Cluster',
      nodeCount: 4
    },
    {
      id: 'serverless',
      title: 'Serverless Cloud Edge Pipeline',
      description: 'CDN Edge, Cloud Functions, DynamoDB, S3 Bucket Storage',
      nodeCount: 4
    }
  ];

  return (
    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles size={16} className="text-amber-400" />
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">Architecture Canvas Templates</h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {presets.map((preset) => (
          <div
            key={preset.id}
            onClick={() => onSelectPreset(preset.id)}
            className="p-4 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 rounded-xl cursor-pointer transition space-y-1.5"
          >
            <h5 className="font-extrabold text-white text-xs">{preset.title}</h5>
            <p className="text-[10px] text-slate-400 leading-relaxed">{preset.description}</p>
            <span className="inline-block px-2 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-mono rounded">
              {preset.nodeCount} Pre-configured Nodes
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CanvasPresetSelector;
