import React from 'react';
import { WifiOff } from 'lucide-react';

export default function OfflineBanner({ isOnline }) {
  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-amber-600 text-white text-xs font-semibold py-1.5 px-4 flex items-center justify-center gap-2 shadow-md">
      <WifiOff size={14} />
      <span>You are currently offline. Your interview responses will be saved locally and auto-synced upon reconnection.</span>
    </div>
  );
}
