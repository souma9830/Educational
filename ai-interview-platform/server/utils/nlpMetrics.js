/**
 * NLP & Speech Analytics Utility
 * Calculates WPM, detects filler words, and estimates technical depth scores
 */

const COMMON_FILLER_WORDS = ['um', 'uh', 'like', 'you know', 'basically', 'actually', 'sort of', 'kind of', 'i mean'];

const analyzeTranscriptText = (transcriptText = '', durationSeconds = 120) => {
  if (!transcriptText || typeof transcriptText !== 'string') {
    return {
      wordsPerMinute: 0,
      totalWords: 0,
      fillerWords: [],
      totalFillerCount: 0,
      technicalDepthScore: 50,
      confidenceIndex: 75,
      clarityRating: 'Optimal'
    };
  }

  const cleanText = transcriptText.toLowerCase().replace(/[^\w\s]/gi, ' ');
  const words = cleanText.split(/\s+/).filter(Boolean);
  const totalWords = words.length;

  const durationMinutes = Math.max(0.1, durationSeconds / 60);
  const wordsPerMinute = Math.round(totalWords / durationMinutes);

  // Count filler occurrences
  const fillerCounts = {};
  COMMON_FILLER_WORDS.forEach(filler => {
    const regex = new RegExp(`\\b${filler}\\b`, 'gi');
    const matches = transcriptText.match(regex);
    if (matches && matches.length > 0) {
      fillerCounts[filler] = matches.length;
    }
  });

  const fillerWords = Object.entries(fillerCounts).map(([word, count]) => ({ word, count }));
  const totalFillerCount = fillerWords.reduce((acc, curr) => acc + curr.count, 0);

  // Evaluate technical depth via keywords
  const techKeywords = ['algorithm', 'complexity', 'database', 'async', 'distributed', 'cache', 'thread', 'latency', 'api', 'schema'];
  const techHits = techKeywords.filter(kw => cleanText.includes(kw)).length;
  const technicalDepthScore = Math.min(100, Math.max(30, 60 + techHits * 8));

  // Determine clarity rating
  let clarityRating = 'Optimal';
  if (wordsPerMinute > 170) clarityRating = 'Fast Pace';
  else if (wordsPerMinute < 100) clarityRating = 'Slow Pace';
  if (totalFillerCount > 15) clarityRating = 'Needs Improvement';

  const confidenceIndex = Math.max(40, Math.min(99, 95 - totalFillerCount * 2));

  return {
    wordsPerMinute,
    totalWords,
    fillerWords,
    totalFillerCount,
    technicalDepthScore,
    confidenceIndex,
    clarityRating
  };
};

module.exports = {
  analyzeTranscriptText
};
