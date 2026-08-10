const STORAGE_KEY = 'camsense_offline_queue';

export function enqueueOfflineSubmission(data) {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existing.push({ ...data, queuedAt: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.error('Failed to enqueue offline submission:', err);
  }
}

export function getOfflineQueue() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function clearOfflineQueue() {
  localStorage.removeItem(STORAGE_KEY);
}
