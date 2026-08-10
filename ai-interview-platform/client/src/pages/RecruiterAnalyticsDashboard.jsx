import { useState } from 'react';
import CohortScoreChart from '../components/analytics/CohortScoreChart';
import { buildCandidateBriefingDocument } from '../../../../server/services/pdfReportService';
import { BarChart3, Download, Users, Award, FileText, CheckCircle2, Search, Filter } from 'lucide-react';

const RecruiterAnalyticsDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [candidates] = useState([
    { id: 'c1', name: 'Alex Mercer', role: 'Senior Full-Stack Engineer', score: 92, recommendation: 'Strong Hire', date: '2026-08-08' },
    { id: 'c2', name: 'Elena Rostova', role: 'Backend Architect', score: 89, recommendation: 'Hire', date: '2026-08-07' },
    { id: 'c3', name: 'Marcus Vance', role: 'Frontend Tech Lead', score: 94, recommendation: 'Strong Hire', date: '2026-08-06' },
    { id: 'c4', name: 'David Miller', role: 'DevOps Lead', score: 78, recommendation: 'Lean Reject', date: '2026-08-05' }
  ]);

  const handleDownloadPdfBrief = (candidate) => {
    const doc = buildCandidateBriefingDocument({
      candidateName: candidate.name,
      targetRole: candidate.role,
      recommendation: candidate.recommendation
    });

    const blob = new Blob([doc.documentContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = doc.filename;
    link.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <BarChart3 size={14} />
            Recruiter Talent Intelligence Portal
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Recruiter Talent Analytics & Executive Briefing Hub</h1>
          <p className="text-xs text-slate-400 mt-1">Cohort performance distributions, candidate ranking matrices, and 1-click executive briefing report exports</p>
        </div>

        <button
          onClick={() => handleDownloadPdfBrief(candidates[0])}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow-md flex items-center gap-2 self-start sm:self-auto"
        >
          <Download size={14} /> Export Candidate Briefing PDF
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Total Conducted Assessments</span>
          <h3 className="text-3xl font-black text-blue-400 mt-1">128</h3>
          <span className="text-[10px] text-slate-500">+14% vs last month</span>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Strong Hire Rate</span>
          <h3 className="text-3xl font-black text-emerald-400 mt-1">34%</h3>
          <span className="text-[10px] text-slate-500">43 Candidates Accepted</span>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Avg Technical Score</span>
          <h3 className="text-3xl font-black text-purple-400 mt-1">86.4%</h3>
          <span className="text-[10px] text-slate-500">LLM Keyword Benchmark</span>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Avg Speech Pace</span>
          <h3 className="text-3xl font-black text-amber-400 mt-1">138 WPM</h3>
          <span className="text-[10px] text-slate-500">Optimal Range: 120-150</span>
        </div>
      </div>

      {/* Cohort Score Chart */}
      <CohortScoreChart />

      {/* Candidate Evaluation Table */}
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Evaluated Candidate Assessment Log</h3>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search candidate or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          {candidates.map((c) => (
            <div key={c.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <h4 className="font-bold text-white text-sm">{c.name}</h4>
                <p className="text-slate-400">{c.role} • <span className="font-mono text-slate-500">{c.date}</span></p>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono font-bold text-emerald-400 text-sm">{c.score}% Score</span>
                <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase border ${
                  c.recommendation === 'Strong Hire' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                }`}>
                  {c.recommendation}
                </span>
                <button
                  onClick={() => handleDownloadPdfBrief(c)}
                  className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 transition"
                  title="Download Briefing PDF"
                >
                  <FileText size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruiterAnalyticsDashboard;
