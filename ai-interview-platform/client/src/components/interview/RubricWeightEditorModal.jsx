import { Sparkles, X, Sliders } from 'lucide-react';
import { useState } from 'react';

const RubricWeightEditorModal = ({ isOpen, onClose }) => {
  const [techWeight, setTechWeight] = useState(40);
  const [archWeight, setArchWeight] = useState(30);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-2xl w-full max-w-md space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="text-amber-400" size={18} />
            <h3 className="text-sm font-extrabold">Evaluation Rubric Weightages</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <span className="text-slate-400 font-bold block mb-1">Technical Depth Weight ({techWeight}%)</span>
            <input
              type="range"
              min={10}
              max={70}
              value={techWeight}
              onChange={(e) => setTechWeight(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RubricWeightEditorModal;
