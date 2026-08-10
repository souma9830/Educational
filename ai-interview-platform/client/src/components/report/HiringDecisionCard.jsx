import { Award, CheckCircle2, XCircle, Sparkles } from 'lucide-react';

const HiringDecisionCard = ({ recommendation = 'Strong Hire' }) => {
  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-amber-400" />
          <h3 className="text-lg font-black">AI Candidate Hiring Decision Summary</h3>
        </div>
        <span className="px-3.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-black text-xs rounded-full uppercase">
          {recommendation}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs">
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
          <h4 className="text-emerald-400 font-bold mb-1 flex items-center gap-1">
            <CheckCircle2 size={14} /> Key Strengths
          </h4>
          <p className="text-slate-300">Optimal communication clarity (138 WPM pace) & $O(N)$ algorithm complexity</p>
        </div>
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
          <h4 className="text-amber-400 font-bold mb-1 flex items-center gap-1">
            <XCircle size={14} /> Focus Areas
          </h4>
          <p className="text-slate-300">Slight hesitation during edge-case null check scenario</p>
        </div>
      </div>
    </div>
  );
};

export default HiringDecisionCard;
