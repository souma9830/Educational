/**
 * Interview Slot Scheduling Controller with UTC Timezone Normalization
 */

export const scheduleInterviewSlot = async (req, res, next) => {
  try {
    const { recruiterId, candidateId, scheduledTime, durationMinutes = 60, timezone = 'UTC' } = req.body;

    const rawStart = new Date(scheduledTime);
    const startUtc = new Date(Date.UTC(rawStart.getUTCFullYear(), rawStart.getUTCMonth(), rawStart.getUTCDate(), rawStart.getUTCHours(), rawStart.getUTCMinutes()));
    const endUtc = new Date(startUtc.getTime() + durationMinutes * 60000);

    res.status(201).json({
      success: true,
      message: `Interview slot scheduled in UTC: ${startUtc.toISOString()} to ${endUtc.toISOString()}`,
      slot: {
        scheduledTimeUtc: startUtc.toISOString(),
        endTimeUtc: endUtc.toISOString(),
        timezone
      }
    });
  } catch (error) {
    next(error);
  }
};
