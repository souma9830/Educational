import { WifiOff, RefreshCw, X, CheckCircle2 } from 'lucide-react';

const EditorReconnectModal = ({ isOpen, onRetry }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-2xl w-full max-w-md space-y-4 text-center">
        <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto">
          <WifiOff size={24} />
        </div>
        <h3 className="text-lg font-black">WebSocket Connection Reconnecting</h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Your offline code edits are buffered locally in vector clock buffer. Merging Operational Transformation deltas upon reconnect...
        </p>

        <button
          onClick={onRetry}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
        >
          <RefreshCw className="animate-spin" size={14} /> Force Fast-Forward Sync
        </button>
      </div>
    </div>
  );
};

export default EditorReconnectModal;
