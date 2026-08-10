import { Filter, Calendar, Search } from 'lucide-react';

const AnalyticsFilterPanel = ({ onFilterChange }) => {
  return (
    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2">
        <Filter size={14} className="text-blue-400" />
        <span className="font-bold text-slate-300">Cohort Filter:</span>
        <select className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1 text-white outline-none">
          <option value="all">All Role Cohorts</option>
          <option value="fullstack">Senior Full-Stack</option>
          <option value="backend">Backend Architect</option>
          <option value="frontend">Frontend Lead</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <Calendar size={14} className="text-purple-400" />
        <select className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1 text-white outline-none">
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last Quarter</option>
          <option value="1y">Year to Date</option>
        </select>
      </div>
    </div>
  );
};

export default AnalyticsFilterPanel;
