import { Sparkles, CheckCircle2, XCircle, ThumbsUp, Award } from 'lucide-react';

const AiSummaryCard = ({
  recommendation = 'Strong Hire',
  pros = [
    'Optimal communication clarity (138 WPM pace with minimal filler words)',
    'Demonstrated $O(N)$ optimal time complexity in algorithm solution',
    'Clear architectural trade-off explanation during system design'
  ],
  cons = [
    'Slight hesitation during edge-case null check scenario'
  ]
}) => {
  const getBadgeStyle = (rec) => {
    switch (rec) {
      case 'Strong Hire': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Hire': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Lean Reject': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      default: return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="text-amber-400" size={20} />
          <h3 className="text-xl font-black text-white">AI Candidate Hiring Decision Summary</h3>
        </div>

        <span className={`px-4 py-1.5 rounded-full text-xs font-black border uppercase tracking-wider ${getBadgeStyle(recommendation)}`}>
          {recommendation}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Key Strengths (Pros) */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <CheckCircle2 size={16} /> Key Strengths & Demonstrated Competencies
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {pros.map((p, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Growth Areas (Cons) */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <XCircle size={16} /> Growth & Focus Areas
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {cons.map((c, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AiSummaryCard;
