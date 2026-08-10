import { FileText, Save, Sparkles } from 'lucide-react';
import { useState } from 'react';

const EvaluationNotesCard = () => {
  const [notes, setNotes] = useState('Candidate displayed deep knowledge of distributed caching and Kafka message queues. Highly recommended for Senior Staff role.');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-blue-400" />
          <h3 className="text-sm font-extrabold text-white">Interviewer Qualitative Assessment Notes</h3>
        </div>
        <button
          onClick={handleSave}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
        >
          <Save size={14} /> {saved ? 'Notes Saved!' : 'Save Notes'}
        </button>
      </div>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full h-24 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-200 outline-none resize-none focus:border-blue-500 font-medium"
      />
    </div>
  );
};

export default EvaluationNotesCard;
