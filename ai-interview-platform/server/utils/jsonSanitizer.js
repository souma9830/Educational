function extractCleanJson(rawString) {
  if (!rawString || typeof rawString !== 'string') return null;
  try {
    const cleaned = rawString.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (err) {
    const match = rawString.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (innerErr) {
        return null;
      }
    }
    return null;
  }
}

module.exports = { extractCleanJson };
