import HiringDecisionCard from '../components/report/HiringDecisionCard';
import CompetencyRadarChart from '../components/report/CompetencyRadarChart';
import TimelineMarkerPlayer from '../components/report/TimelineMarkerPlayer';

const CandidateEvaluationDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-black text-white">Candidate Evaluation & Skill Radar Hub</h1>
      <HiringDecisionCard recommendation="Strong Hire" />
      <CompetencyRadarChart />
      <TimelineMarkerPlayer />
    </div>
  );
};

export default CandidateEvaluationDashboard;
