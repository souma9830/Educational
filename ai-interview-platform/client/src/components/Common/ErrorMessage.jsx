import React from 'react';

export function ErrorMessage({ message = 'Something went wrong.', onRetry, className = '', style = {} }) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`flex items-center justify-between p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-sm shadow-md ${className}`}
      style={style}
    >
      <div className="flex items-center space-x-3">
        <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="font-medium">{message}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="ml-4 px-3 py-1.5 bg-red-900/50 hover:bg-red-800/60 text-red-200 font-medium text-xs rounded-lg transition-colors border border-red-700/50 flex items-center space-x-1"
          aria-label="Retry operation"
        >
          <span>Retry</span>
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
