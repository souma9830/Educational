/**
 * UTC Timezone Normalization Utilities for Interview Scheduling
 */

export const normalizeTimeToUtc = (dateTimeString) => {
  if (!dateTimeString) return new Date().toISOString();
  const d = new Date(dateTimeString);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes())).toISOString();
};
