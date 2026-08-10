/**
 * Handles Gemini AI model fallback switching when encountering HTTP 429 Rate Limits or 503 Overload.
 */
class GeminiFallbackHandler {
  constructor(models = ['gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-1.0-pro']) {
    this.models = models;
    this.currentModelIndex = 0;
  }

  getCurrentModel() {
    return this.models[this.currentModelIndex];
  }

  async executeWithFallback(promptExecutor) {
    let lastError = null;
    const initialIndex = this.currentModelIndex;

    for (let attempt = 0; attempt < this.models.length; attempt++) {
      const model = this.getCurrentModel();
      try {
        const response = await promptExecutor(model);
        return { response, modelUsed: model };
      } catch (err) {
        lastError = err;
        const isRateLimit = err.status === 429 || (err.message && err.message.includes('429'));
        const isServiceUnavailable = err.status === 503 || (err.message && err.message.includes('503'));

        if (isRateLimit || isServiceUnavailable) {
          this.currentModelIndex = (this.currentModelIndex + 1) % this.models.length;
        } else {
          // Non-retryable error
          throw err;
        }
      }
    }

    throw new Error(`All Gemini fallback models exhausted. Last error: ${lastError ? lastError.message : 'Unknown'}`);
  }

  reset() {
    this.currentModelIndex = 0;
  }
}

module.exports = GeminiFallbackHandler;
