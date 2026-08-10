import { BarChart3, TrendingUp, Award, Layers } from 'lucide-react';

const CohortScoreChart = () => {
  const cohorts = [
    { role: 'Senior Full-Stack', avgTechnical: 88, avgSystemDesign: 82, avgCommunication: 91, totalCandidates: 45 },
    { role: 'Backend Architect', avgTechnical: 94, avgSystemDesign: 92, avgCommunication: 84, totalCandidates: 28 },
    { role: 'Frontend Lead', avgTechnical: 86, avgSystemDesign: 78, avgCommunication: 95, totalCandidates: 34 },
    { role: 'DevOps / SRE', avgTechnical: 90, avgSystemDesign: 89, avgCommunication: 81, totalCandidates: 21 }
  ];

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="text-blue-400" size={20} />
          <h3 className="text-xl font-black">Candidate Cohort Benchmark Distribution</h3>
        </div>
        <span className="text-xs font-mono text-slate-400">Total Assessments Evaluated: 128</span>
      </div>

      <div className="space-y-4">
        {cohorts.map((c, idx) => (
          <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-white text-sm">{c.role} ({c.totalCandidates} Candidates)</span>
              <span className="text-emerald-400 font-mono">Technical Avg: {c.avgTechnical}%</span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-[11px]">
              <div>
                <span className="text-slate-400 block mb-1">Technical Depth ({c.avgTechnical}%)</span>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div style={{ width: `${c.avgTechnical}%` }} className="bg-blue-500 h-full rounded-full" />
                </div>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">System Architecture ({c.avgSystemDesign}%)</span>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div style={{ width: `${c.avgSystemDesign}%` }} className="bg-purple-500 h-full rounded-full" />
                </div>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Communication Pace ({c.avgCommunication}%)</span>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div style={{ width: `${c.avgCommunication}%` }} className="bg-emerald-500 h-full rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CohortScoreChart;
