import { useState } from 'react';
import CompetencyRadarChart from '../components/report/CompetencyRadarChart';
import TimelineMarkerPlayer from '../components/report/TimelineMarkerPlayer';
import AiSummaryCard from '../components/report/AiSummaryCard';
import SpeechAnalyticsCard from '../components/analytics/SpeechAnalyticsCard';
import { Award, Download, Share2, ArrowLeft } from 'lucide-react';

const InterviewReportPage = ({ candidateName = 'Alex Mercer', role = 'Senior Full-Stack Engineer' }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Award size={14} />
            Post-Interview Evaluation Report
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">{candidateName} - {role}</h1>
          <p className="text-xs text-slate-400 mt-1">Multi-modal interview analytics, competency radar benchmark, and synchronized replay timeline</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 transition flex items-center gap-2">
            <Share2 size={14} /> Share Report
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-md flex items-center gap-2">
            <Download size={14} /> Download PDF
          </button>
        </div>
      </div>

      {/* Main Grid Modules */}
      <AiSummaryCard />
      <CompetencyRadarChart />
      <SpeechAnalyticsCard />
      <TimelineMarkerPlayer />
    </div>
  );
};

export default InterviewReportPage;
