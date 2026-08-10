import { useState } from 'react';
import { Play, Pause, Bookmark, Clock, Code, MessageSquare, AlertCircle } from 'lucide-react';

const TimelineMarkerPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(42);
  const duration = 300;

  const markers = [
    { time: 15, label: 'Lobby Identity Verified', type: 'security', color: 'bg-emerald-500' },
    { time: 65, label: 'Algorithm Question Introduced', type: 'question', color: 'bg-blue-500' },
    { time: 140, label: 'Code Solution Submitted', type: 'code', color: 'bg-purple-500' },
    { time: 210, label: 'System Design Scaling Trade-Off', type: 'design', color: 'bg-amber-500' }
  ];

  const handleMarkerClick = (time) => {
    setCurrentTime(time);
    setIsPlaying(true);
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs font-bold uppercase tracking-wider mb-1">
            <Bookmark size={14} />
            Time-Stamped Session Replay & Marker Nav
          </div>
          <h3 className="text-xl font-black text-white">Interview Video & Transcript Synchronization</h3>
        </div>

        <span className="text-xs font-mono text-slate-400">
          {Math.floor(currentTime / 60)}:{String(currentTime % 60).padStart(2, '0')} / {Math.floor(duration / 60)}:00
        </span>
      </div>

      <div className="relative bg-slate-950 rounded-2xl border border-slate-800 h-64 flex items-center justify-center overflow-hidden">
        <div className="text-center space-y-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center mx-auto transition shadow-lg"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
          </button>
          <p className="text-xs text-slate-400 font-bold">Synchronized HD Video Recording Replay</p>
        </div>

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <div className="relative w-full bg-slate-800 h-2 rounded-full cursor-pointer" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            setCurrentTime(Math.round(pos * duration));
          }}>
            <div style={{ width: `${(currentTime / duration) * 100}%` }} className="h-full bg-blue-500 rounded-full" />

            {markers.map((m, idx) => (
              <div
                key={idx}
                style={{ left: `${(m.time / duration) * 100}%` }}
                onClick={(e) => { e.stopPropagation(); handleMarkerClick(m.time); }}
                title={m.label}
                className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${m.color} ring-2 ring-slate-900 cursor-pointer transition-transform hover:scale-150`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {markers.map((m, idx) => (
          <button
            key={idx}
            onClick={() => handleMarkerClick(m.time)}
            className={`p-3 rounded-xl border text-left text-xs font-bold transition flex items-center justify-between ${
              currentTime === m.time ? 'bg-blue-600/20 border-blue-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <span className="truncate">{m.label}</span>
            <span className="font-mono text-[10px] text-blue-400 shrink-0 ml-2">
              {Math.floor(m.time / 60)}:{String(m.time % 60).padStart(2, '0')}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimelineMarkerPlayer;
