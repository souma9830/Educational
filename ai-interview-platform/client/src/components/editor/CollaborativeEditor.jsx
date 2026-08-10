import { useState, useEffect } from 'react';
import { Code2, Wifi, WifiOff, CheckCircle2, Play, Copy, RefreshCw } from 'lucide-react';
import useCodeSync from '../../hooks/useCodeSync';
import API from '../../services/api/apiClient';

const CollaborativeEditor = ({ socket, roomId = 'session-101' }) => {
  const { code, updateCode, version, isConnected } = useCodeSync(
    socket,
    roomId,
    '// Technical Assessment Sandbox\nfunction solution(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const diff = target - nums[i];\n    if (map.has(diff)) return [map.get(diff), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}'
  );

  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);

  const handleRunCode = async () => {
    setRunning(true);
    try {
      const res = await API.post('/interview/coding/eval', {
        role: 'Fullstack Engineer',
        code,
        language
      });
      const data = res.data?.data || res.data;
      if (data) {
        let textOutput = `[Execution Results]\nScore: ${data.overallScore || 'N/A'}/100\n`;
        if (data.testCases && data.testCases.length > 0) {
          data.testCases.forEach((tc, idx) => {
            textOutput += `Test ${idx + 1}: ${tc.status || 'PASSED'} - Input: ${tc.input} | Expected: ${tc.expectedOutput}\n`;
          });
        }
        if (data.compilerOutput) textOutput += `Output:\n${data.compilerOutput}\n`;
        if (data.recommendation) textOutput += `Recommendation: ${data.recommendation}`;
        setOutput(textOutput);
      }
    } catch (err) {
      setOutput(`Execution error: ${err.response?.data?.message || err.message}`);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-4">
      {/* Editor Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <Code2 className="text-blue-400" size={20} />
          <div>
            <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
              Collaborative Code Sandbox
              <span className="text-[10px] text-slate-400 font-mono">v{version}</span>
            </h3>
            <p className="text-[11px] text-slate-400">CRDT Vector Sync & Disconnect State Recovery Enabled</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs font-bold text-white focus:outline-none"
          >
            <option value="javascript">JavaScript (ES6)</option>
            <option value="python">Python 3</option>
            <option value="cpp">C++ 17</option>
            <option value="java">Java 11</option>
          </select>

          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold border ${
            isConnected ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border-rose-500/30 animate-pulse'
          }`}>
            {isConnected ? <Wifi size={14} /> : <WifiOff size={14} />}
            {isConnected ? 'Real-Time Sync' : 'Reconnecting...'}
          </span>
        </div>
      </div>

      {/* Editor Area */}
      <div className="relative bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden font-mono text-xs">
        <textarea
          value={code}
          onChange={(e) => updateCode(e.target.value)}
          className="w-full h-80 bg-slate-950 p-4 text-slate-200 resize-none outline-none font-mono leading-relaxed"
          spellCheck={false}
        />
      </div>

      {/* Action Buttons & Execution Output */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleRunCode}
          disabled={running}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition shadow-md"
        >
          {running ? <RefreshCw className="animate-spin" size={14} /> : <Play size={14} />}
          Run Solution Tests
        </button>
      </div>

      {output && (
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs space-y-1">
          <span className="text-[10px] text-slate-500 font-bold uppercase block">Execution Output</span>
          <pre className="text-emerald-400 whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
};

export default CollaborativeEditor;
