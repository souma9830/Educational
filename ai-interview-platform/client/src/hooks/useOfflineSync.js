import { useState, useEffect, useCallback } from 'react';
import { offlineQueue } from '../utils/offlineQueue';

export function useOfflineSync() {
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [unsyncedCount, setUnsyncedCount] = useState(offlineQueue.getQueue().length);
  const [isSyncing, setIsSyncing] = useState(false);

  const syncQueue = useCallback(async () => {
    if (!navigator.onLine || isSyncing) return;
    setIsSyncing(true);
    try {
      await offlineQueue.flush();
      setUnsyncedCount(offlineQueue.getQueue().length);
    } catch (e) {
      console.error('[useOfflineSync] Sync failed:', e);
    } finally {
      setIsSyncing(false);
    }
  }, [isSyncing]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncQueue();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    const handleSwMessage = (event) => {
      if (event.data && event.data.type === 'QUEUE_OFFLINE_REQUEST') {
        const { url, method, body, contentType, headers } = event.data;
        const parsedBody = body && contentType?.includes('application/json') ? JSON.parse(body) : body;
        offlineQueue.enqueue(url, parsedBody, {
          method: method || 'POST',
          headers: Object.fromEntries(headers || []),
        });
        setUnsyncedCount(offlineQueue.getQueue().length);
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', handleSwMessage);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('message', handleSwMessage);
      }
    };
  }, [syncQueue]);

  const enqueueFailedRequest = (url, payload, options) => {
    offlineQueue.enqueue(url, payload, options);
    setUnsyncedCount(offlineQueue.getQueue().length);
  };

  return {
    isOnline,
    unsyncedCount,
    isSyncing,
    syncQueue,
    enqueueFailedRequest
  };
}
