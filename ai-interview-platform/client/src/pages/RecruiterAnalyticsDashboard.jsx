import { useState } from 'react';
import { BarChart3, Download, Users, Award } from 'lucide-react';

const RecruiterAnalyticsDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-white">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black">Recruiter Talent Analytics</h1>
          <p className="text-xs text-slate-400">Cohort performance distribution & automated candidate PDF exports</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 font-bold text-xs rounded-xl flex items-center gap-2">
          <Download size={14} /> Export Candidate Briefing PDF
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-bold uppercase">Interviews Conducted</span>
          <h3 className="text-3xl font-black text-blue-400 mt-1">128</h3>
        </div>
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-bold uppercase">Strong Hire Rate</span>
          <h3 className="text-3xl font-black text-emerald-400 mt-1">34%</h3>
        </div>
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-bold uppercase">Avg Technical Score</span>
          <h3 className="text-3xl font-black text-purple-400 mt-1">86.4</h3>
        </div>
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-bold uppercase">Avg WPM Pace</span>
          <h3 className="text-3xl font-black text-amber-400 mt-1">138</h3>
        </div>
      </div>
    </div>
  );
};

export default RecruiterAnalyticsDashboard;
