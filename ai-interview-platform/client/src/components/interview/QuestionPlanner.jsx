import { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, ChevronDown, ChevronUp, FileText, Target, HelpCircle, RefreshCw, Award } from 'lucide-react';
import api from '../../services/apiClient';

const QuestionPlanner = ({ interviewId = 'session-101' }) => {
  const [loading, setLoading] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [questionBank, setQuestionBank] = useState({
    candidateName: 'Alex Mercer',
    targetRole: 'Senior Full-Stack Engineer',
    jobDescriptionTitle: 'Distributed Systems Lead',
    matchScorePct: 92,
    parsedSkills: ['React.js', 'Node.js', 'MongoDB', 'Redis', 'Docker', 'System Design'],
    missingSkills: ['Kafka', 'Kubernetes'],
    generatedQuestions: [
      {
        questionId: 'q-101',
        questionText: 'Can you walk us through your Redis caching strategy in high-concurrency Node.js environments?',
        category: 'Technical Depth',
        difficulty: 'Hard',
        expectedModelAnswer: 'Candidate should explain Cache-Aside pattern, TTL expiration strategy, Redis cluster eviction policies (LRU), and cache stampede protection via distributed locking.',
        rubricCriteria: [
          { criterion: 'Mentions Cache-Aside or Write-Through pattern', weightPct: 30, sampleKeyword: 'cache-aside' },
          { criterion: 'Explains TTL expiration & eviction policies', weightPct: 35, sampleKeyword: 'LRU eviction' },
          { criterion: 'Addresses cache stampede / mutex locks', weightPct: 35, sampleKeyword: 'distributed lock' }
        ]
      },
      {
        questionId: 'q-102',
        questionText: 'How do you design microservices event-driven communication to guarantee eventual consistency without distributed 2PC transactions?',
        category: 'Architecture',
        difficulty: 'Hard',
        expectedModelAnswer: 'Candidate should discuss Transactional Outbox Pattern, Kafka event streaming, Saga orchestrator pattern, and consumer idempotency.',
        rubricCriteria: [
          { criterion: 'Explains Transactional Outbox Pattern', weightPct: 40, sampleKeyword: 'outbox' },
          { criterion: 'Demonstrates Saga pattern for rollback flows', weightPct: 30, sampleKeyword: 'saga' },
          { criterion: 'Ensures idempotent event processing', weightPct: 30, sampleKeyword: 'idempotent' }
        ]
      },
      {
        questionId: 'q-103',
        questionText: 'Describe a scenario where a Node.js production deployment caused a memory leak. How did you profile and resolve V8 garbage collection issues?',
        category: 'Problem Solving',
        difficulty: 'Medium',
        expectedModelAnswer: 'Candidate should detail using chrome://inspect, V8 heap snapshots, analyzing detached DOM nodes or unhandled event listeners, and measuring RSS vs Heap limits.',
        rubricCriteria: [
          { criterion: 'Uses V8 Heap Snapshots & Chrome Inspector', weightPct: 35, sampleKeyword: 'heap snapshot' },
          { criterion: 'Identifies unhandled listener / closure leaks', weightPct: 35, sampleKeyword: 'event listener' },
          { criterion: 'Systematic root cause analysis workflow', weightPct: 30, sampleKeyword: 'profiler' }
        ]
      },
      {
        questionId: 'q-104',
        questionText: 'How do you optimize React 18 component tree re-renders in a high-frequency real-time dashboard?',
        category: 'Technical Depth',
        difficulty: 'Medium',
        expectedModelAnswer: 'Candidate should mention React.memo, useMemo/useCallback, virtualized lists (react-window), and state lifting localization.',
        rubricCriteria: [
          { criterion: 'Applies virtualization for large data grids', weightPct: 40, sampleKeyword: 'virtualization' },
          { criterion: 'Uses React.memo & useCallback memoization', weightPct: 30, sampleKeyword: 'memoization' },
          { criterion: 'Localizes state to avoid parent re-renders', weightPct: 30, sampleKeyword: 'state lifting' }
        ]
      },
      {
        questionId: 'q-105',
        questionText: 'Tell us about a technical disagreement with a staff architect regarding framework choice. How did you reach consensus?',
        category: 'Behavioral',
        difficulty: 'Easy',
        expectedModelAnswer: 'Candidate should demonstrate data-driven decision making, benchmarking proof-of-concept prototypes, active listening, and team alignment.',
        rubricCriteria: [
          { criterion: 'Demonstrates data-driven benchmarking', weightPct: 40, sampleKeyword: 'benchmark' },
          { criterion: 'Shows active listening & team alignment', weightPct: 30, sampleKeyword: 'consensus' },
          { criterion: 'Professional constructive debate focus', weightPct: 30, sampleKeyword: 'collaboration' }
        ]
      }
    ]
  });

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles size={14} />
            AI Resume-to-JD Question Generator
          </div>
          <h2 className="text-2xl font-black text-white">{questionBank.candidateName} - {questionBank.targetRole}</h2>
          <p className="text-xs text-slate-400 mt-1">Parses candidate resume PDFs against JD specifications and generates 5 tailored technical & behavioral questions with scoring rubrics</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-extrabold">
            JD Skill Match: {questionBank.matchScorePct}%
          </span>
        </div>
      </div>

      {/* Extracted Skills Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Parsed Candidate Resume Expertise</span>
          <div className="flex flex-wrap gap-2">
            {questionBank.parsedSkills.map((skill, idx) => (
              <span key={idx} className="px-3 py-1 bg-slate-900 text-blue-300 border border-slate-700 rounded-xl text-xs font-bold">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Target JD Technical Skill Gaps</span>
          <div className="flex flex-wrap gap-2">
            {questionBank.missingSkills.map((skill, idx) => (
              <span key={idx} className="px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-bold">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Tailored 5-Question Assessment Bank</h3>

        {questionBank.generatedQuestions.map((q, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div key={idx} className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden transition">
              <div
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className="p-5 cursor-pointer flex items-start justify-between gap-4 hover:bg-slate-900/50"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-extrabold text-amber-400">Q{idx + 1}.</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {q.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      q.difficulty === 'Hard' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    }`}>
                      {q.difficulty}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-sm mt-1">{q.questionText}</h4>
                </div>
                {isExpanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
              </div>

              {isExpanded && (
                <div className="p-5 bg-slate-900/80 border-t border-slate-800 space-y-4 text-xs">
                  <div>
                    <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Expected Model Answer</span>
                    <p className="text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                      {q.expectedModelAnswer}
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Evaluation Rubric Criteria</span>
                    <ul className="space-y-2 text-slate-300">
                      {q.rubricCriteria.map((c, i) => (
                        <li key={i} className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                          <span className="flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-emerald-400" />
                            {c.criterion}
                          </span>
                          <span className="font-mono text-[10px] font-bold text-amber-400">Weight: {c.weightPct}%</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionPlanner;
