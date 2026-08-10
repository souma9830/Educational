import React from 'react';
import Toast from './Toast';

export default function ToastNotificationContainer({ toasts = [], dismiss }) {
  if (!toasts.length) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-5 right-5 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none p-4"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto transition-all transform duration-300 ease-in-out">
          <Toast toast={toast} dismiss={() => dismiss(toast.id)} />
        </div>
      ))}
    </div>
  );
}
