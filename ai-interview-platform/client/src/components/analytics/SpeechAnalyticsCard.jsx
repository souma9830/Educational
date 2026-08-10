import { useState, useEffect } from 'react';
import { Mic, Activity, AlertTriangle, Sparkles, RefreshCw, BarChart2 } from 'lucide-react';

const SpeechAnalyticsCard = ({ interviewId = 'session-101' }) => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState({
    wordsPerMinute: 138,
    clarityRating: 'Optimal',
    confidenceIndex: 91,
    technicalDepthScore: 88,
    totalFillerCount: 4,
    fillerWords: [
      { word: 'um', count: 2 },
      { word: 'like', count: 1 },
      { word: 'basically', count: 1 }
    ],
    pauseHighlights: [
      { timestampSeconds: 24, durationSeconds: 3.2, reason: 'Hesitation before algorithm design' },
      { timestampSeconds: 78, durationSeconds: 4.1, reason: 'Pause during complexity trade-off explanation' }
    ]
  });

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Mic size={14} />
            AI Multi-Modal Speech & Audio Analytics
          </div>
          <h2 className="text-2xl font-black text-white">Candidate Speech & Technical Depth Analysis</h2>
          <p className="text-xs text-slate-400 mt-1">Real-time WPM pace gauge, filler word frequency word-cloud, and technical scoring metrics</p>
        </div>

        <span className="px-3.5 py-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-extrabold self-start sm:self-auto">
          Pace: {report.clarityRating}
        </span>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Words Per Minute (WPM)</span>
          <h3 className="text-3xl font-black text-blue-400 mt-1">{report.wordsPerMinute}</h3>
          <span className="text-[10px] text-slate-500">Target Range: 120-150 WPM</span>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Technical Depth Score</span>
          <h3 className="text-3xl font-black text-emerald-400 mt-1">{report.technicalDepthScore}%</h3>
          <span className="text-[10px] text-slate-500">LLM Keyword Benchmark</span>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Confidence Index</span>
          <h3 className="text-3xl font-black text-purple-400 mt-1">{report.confidenceIndex}%</h3>
          <span className="text-[10px] text-slate-500">Pitched Vocal Stability</span>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Filler Word Count</span>
          <h3 className="text-3xl font-black text-amber-400 mt-1">{report.totalFillerCount}</h3>
          <span className="text-[10px] text-slate-500">Low Filler Frequency</span>
        </div>
      </div>

      {/* Filler Words Breakdown */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Filler Word Distribution</h4>
        <div className="flex flex-wrap gap-2">
          {report.fillerWords.map((fw, idx) => (
            <span key={idx} className="px-3 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-bold flex items-center gap-2">
              "{fw.word}" <span className="w-5 h-5 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center text-[10px] font-black">{fw.count}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Audio Waveform & Pause Highlights */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Activity size={14} className="text-blue-400" />
          Audio Waveform Pause & Hesitation Visualizer
        </h4>

        {/* Simulated Waveform Bar */}
        <div className="h-16 flex items-center gap-1 bg-slate-900 px-4 rounded-xl border border-slate-800 overflow-hidden">
          {Array.from({ length: 48 }).map((_, i) => {
            const isPause = i === 8 || i === 9 || i === 24 || i === 25;
            const h = isPause ? 4 : Math.floor(Math.sin(i * 0.5) * 24 + 32);
            return (
              <div
                key={i}
                style={{ height: `${h}px` }}
                className={`flex-1 rounded-full transition-all ${isPause ? 'bg-amber-500 shadow-sm shadow-amber-500' : 'bg-blue-500'}`}
              />
            );
          })}
        </div>

        {/* Pause list */}
        <div className="space-y-2">
          {report.pauseHighlights.map((p, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="font-mono text-amber-400 font-bold">@{p.timestampSeconds}s ({p.durationSeconds}s duration)</span>
              <span className="text-slate-300 font-medium">{p.reason}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpeechAnalyticsCard;
