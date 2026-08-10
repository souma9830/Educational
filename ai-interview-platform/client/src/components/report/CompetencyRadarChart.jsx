import { useState } from 'react';
import { Target, Award, Layers } from 'lucide-react';

const CompetencyRadarChart = ({
  scores = {
    algorithms: 88,
    systemDesign: 82,
    communication: 90,
    problemSolving: 94,
    codeQuality: 86
  }
}) => {
  const categories = [
    { key: 'algorithms', label: 'Algorithms & Data Structures', score: scores.algorithms },
    { key: 'systemDesign', label: 'System Architecture', score: scores.systemDesign },
    { key: 'communication', label: 'Communication Clarity', score: scores.communication },
    { key: 'problemSolving', label: 'Analytical Problem Solving', score: scores.problemSolving },
    { key: 'codeQuality', label: 'Code Quality & Cleanliness', score: scores.codeQuality }
  ];

  // SVG Radar Polygon math calculations
  const center = 120;
  const radius = 90;
  const numAxes = categories.length;

  const getCoordinates = (index, valuePct) => {
    const angle = (Math.PI * 2 / numAxes) * index - Math.PI / 2;
    const r = (valuePct / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const points = categories.map((cat, idx) => {
    const { x, y } = getCoordinates(idx, cat.score);
    return `${x},${y}`;
  }).join(' ');

  const benchmarkPoints = categories.map((_, idx) => {
    const { x, y } = getCoordinates(idx, 75); // 75% role benchmark
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Target size={14} />
            Competency Matrix Assessment
          </div>
          <h3 className="text-xl font-black text-white">Competency Radar Benchmark</h3>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold">
          <span className="flex items-center gap-1.5 text-blue-400">
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" /> Candidate Score
          </span>
          <span className="flex items-center gap-1.5 text-slate-500">
            <span className="w-3 h-3 rounded-full bg-slate-600 inline-block" /> Role Benchmark (75%)
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* SVG Radar Chart */}
        <div className="relative w-64 h-64 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 240 240" className="w-full h-full overflow-visible">
            {/* Concentric Grid Rings */}
            {[0.25, 0.5, 0.75, 1.0].map((level, rIdx) => {
              const gridPoints = categories.map((_, idx) => {
                const { x, y } = getCoordinates(idx, level * 100);
                return `${x},${y}`;
              }).join(' ');
              return (
                <polygon
                  key={rIdx}
                  points={gridPoints}
                  fill="none"
                  stroke="#334155"
                  strokeWidth="1"
                  strokeDasharray={level === 0.75 ? "2 2" : undefined}
                />
              );
            })}

            {/* Benchmark Polygon */}
            <polygon
              points={benchmarkPoints}
              fill="rgba(100, 116, 139, 0.15)"
              stroke="#64748b"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Candidate Polygon */}
            <polygon
              points={points}
              fill="rgba(59, 130, 246, 0.3)"
              stroke="#3b82f6"
              strokeWidth="2.5"
            />

            {/* Data Dots */}
            {categories.map((cat, idx) => {
              const { x, y } = getCoordinates(idx, cat.score);
              return (
                <circle
                  key={idx}
                  cx={x}
                  cy={y}
                  r="4"
                  className="fill-blue-400 stroke-slate-900 stroke-2"
                />
              );
            })}
          </svg>
        </div>

        {/* Score Breakdown List */}
        <div className="w-full space-y-3">
          {categories.map((cat) => (
            <div key={cat.key} className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">{cat.label}</span>
                <span className="text-emerald-400">{cat.score}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div style={{ width: `${cat.score}%` }} className="bg-blue-500 h-full rounded-full transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompetencyRadarChart;
