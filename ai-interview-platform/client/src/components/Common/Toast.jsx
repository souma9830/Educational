import React from 'react';

export default function Toast({ toast, dismiss }) {
  if (!toast) return null;

  const typeStyles = {
    success: {
      bg: 'bg-emerald-950/90 border-emerald-500/40 text-emerald-100',
      iconBg: 'bg-emerald-500/20 text-emerald-400',
      icon: '✓',
    },
    error: {
      bg: 'bg-rose-950/90 border-rose-500/40 text-rose-100',
      iconBg: 'bg-rose-500/20 text-rose-400',
      icon: '✕',
    },
    warning: {
      bg: 'bg-amber-950/90 border-amber-500/40 text-amber-100',
      iconBg: 'bg-amber-500/20 text-amber-400',
      icon: '!',
    },
    info: {
      bg: 'bg-indigo-950/90 border-indigo-500/40 text-indigo-100',
      iconBg: 'bg-indigo-500/20 text-indigo-400',
      icon: 'i',
    },
  };

  const style = typeStyles[toast.type] || typeStyles.info;

  return (
    <div
      role="alert"
      className={`flex items-start justify-between p-4 rounded-xl border backdrop-blur-md shadow-2xl ${style.bg}`}
    >
      <div className="flex items-center space-x-3">
        <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${style.iconBg}`}>
          {style.icon}
        </span>
        <p className="text-sm font-medium leading-snug">{toast.message}</p>
      </div>
      {dismiss && (
        <button
          onClick={dismiss}
          className="ml-4 text-slate-400 hover:text-slate-200 transition-colors rounded p-1 focus:outline-none focus:ring-2 focus:ring-slate-400"
          aria-label="Dismiss toast"
        >
          &times;
        </button>
      )}
    </div>
  );
}
