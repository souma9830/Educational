import React from 'react';
import { Clock } from 'lucide-react';

export default function TimerWidget({ timeLeft, isActive }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeLeft < 300;

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-mono transition-colors ${
        isLowTime
          ? 'bg-red-950/40 border-red-500/50 text-red-400 animate-pulse'
          : 'bg-gray-800/80 border-gray-700 text-gray-200'
      }`}
    >
      <Clock size={16} className={isLowTime ? 'text-red-400' : 'text-blue-400'} />
      <span>{formatTime(timeLeft)}</span>
      {isActive && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
    </div>
  );
}
