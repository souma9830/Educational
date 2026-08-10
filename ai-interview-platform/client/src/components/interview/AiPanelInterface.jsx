import { useState } from 'react';
import { Bot, UserCheck, Sparkles, MessageSquare, RefreshCw, Send, HelpCircle } from 'lucide-react';
import api from '../../services/apiClient';

const AiPanelInterface = () => {
  const [activePersonaKey, setActivePersonaKey] = useState('TechArchitect');
  const [candidateAnswer, setCandidateAnswer] = useState('');
  const [loadingTurn, setLoadingTurn] = useState(false);
  const [transcript, setTranscript] = useState([
    {
      sender: 'Dr. Aris (Staff Architect)',
      role: 'System Design Lead',
      text: 'Welcome Alex! Let’s start with high-concurrency caching. How do you prevent cache stampede when 50k QPS hits an expired Redis key?',
      timestamp: '10:00 AM'
    }
  ]);

  const handleSendAnswer = async (e) => {
    e.preventDefault();
    if (!candidateAnswer.trim()) return;

    const userEntry = {
      sender: 'Candidate (Alex Mercer)',
      role: 'Interviewee',
      text: candidateAnswer,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTranscript((prev) => [...prev, userEntry]);
    setCandidateAnswer('');
    setLoadingTurn(true);

    try {
      const res = await api.post('/agent-panel/next-turn', {
        candidateAnswer,
        activePersona: activePersonaKey
      });

      if (res.data?.success) {
        const turn = res.data.panelTurn;
        const aiResponseEntry = {
          sender: turn.currentResponse.name,
          role: turn.currentResponse.role || 'Panel Interviewer',
          text: turn.currentResponse.question,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setTranscript((prev) => [...prev, aiResponseEntry]);
        setActivePersonaKey(turn.nextPersona.key || 'HRManager');
      }
    } catch (err) {
      // Fallback AI simulation
      setTimeout(() => {
        setTranscript((prev) => [
          ...prev,
          {
            sender: 'Sarah Chen (People Lead)',
            role: 'Culture & Communication',
            text: 'Interesting architecture choice! How did you communicate these technical trade-offs to non-engineering stakeholders?',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setActivePersonaKey('ProductManager');
      }, 500);
    } finally {
      setLoadingTurn(false);
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-500/20 text-purple-400 rounded-xl">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-black text-white text-base">Multi-Agent AI Panel Assessment</h3>
            <p className="text-xs text-slate-400">Real-time turn-taking cross-examination by specialized AI personas</p>
          </div>
        </div>

        <span className="px-3.5 py-1.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-extrabold rounded-xl">
          Active Speaker: {activePersonaKey}
        </span>
      </div>

      {/* AI Persona Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { key: 'TechArchitect', name: 'Dr. Aris', role: 'Staff Architect', active: activePersonaKey === 'TechArchitect' },
          { key: 'HRManager', name: 'Sarah Chen', role: 'People Lead', active: activePersonaKey === 'HRManager' },
          { key: 'ProductManager', name: 'Alex Rivera', role: 'VP of Product', active: activePersonaKey === 'ProductManager' }
        ].map((agent) => (
          <div
            key={agent.key}
            onClick={() => setActivePersonaKey(agent.key)}
            className={`p-3.5 rounded-2xl border cursor-pointer transition text-xs ${
              agent.active ? 'bg-purple-600/20 border-purple-500 text-purple-200 font-bold shadow-md shadow-purple-900/30' : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">{agent.name}</span>
              {agent.active && <Sparkles size={12} className="text-purple-400" />}
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">{agent.role}</span>
          </div>
        ))}
      </div>

      {/* Live Panel Transcript Stream */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 max-h-80 overflow-y-auto">
        {transcript.map((msg, idx) => {
          const isUser = msg.sender.includes('Candidate');
          return (
            <div key={idx} className={`p-4 rounded-2xl border text-xs space-y-1 ${
              isUser ? 'bg-blue-600/10 border-blue-500/30 text-blue-200 ml-8' : 'bg-slate-900 border-slate-800 text-slate-200 mr-8'
            }`}>
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className={isUser ? 'text-blue-400' : 'text-purple-400'}>{msg.sender} ({msg.role})</span>
                <span className="font-mono text-slate-500 text-[10px]">{msg.timestamp}</span>
              </div>
              <p className="leading-relaxed">{msg.text}</p>
            </div>
          );
        })}
      </div>

      {/* Response Input */}
      <form onSubmit={handleSendAnswer} className="flex gap-3">
        <input
          type="text"
          value={candidateAnswer}
          onChange={(e) => setCandidateAnswer(e.target.value)}
          placeholder="Type your technical answer to the AI Panel..."
          className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-purple-500 font-medium"
        />
        <button
          type="submit"
          disabled={loadingTurn}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition shadow-md flex items-center gap-2"
        >
          {loadingTurn ? <RefreshCw className="animate-spin" size={14} /> : <Send size={14} />}
          Respond
        </button>
      </form>
    </div>
  );
};

export default AiPanelInterface;
