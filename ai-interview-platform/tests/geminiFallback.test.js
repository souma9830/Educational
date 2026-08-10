const GeminiFallbackHandler = require('../server/services/geminiFallbackHandler');

describe('Gemini Fallback Handler Service', () => {
  test('uses primary model when call succeeds', async () => {
    const handler = new GeminiFallbackHandler();
    const executor = jest.fn().mockResolvedValue('AI Answer');

    const res = await handler.executeWithFallback(executor);
    expect(res.modelUsed).toBe('gemini-1.5-pro');
    expect(res.response).toBe('AI Answer');
    expect(executor).toHaveBeenCalledTimes(1);
  });

  test('switches to fallback model on 429 rate limit error', async () => {
    const handler = new GeminiFallbackHandler();
    const executor = jest.fn()
      .mockRejectedValueOnce({ status: 429, message: 'Quota exceeded' })
      .mockResolvedValueOnce('Fallback Answer');

    const res = await handler.executeWithFallback(executor);
    expect(res.modelUsed).toBe('gemini-1.5-flash');
    expect(res.response).toBe('Fallback Answer');
    expect(executor).toHaveBeenCalledTimes(2);
  });

  test('re-throws non-rate-limit errors without trying fallbacks', async () => {
    const handler = new GeminiFallbackHandler();
    const executor = jest.fn().mockRejectedValue({ status: 400, message: 'Bad request payload' });

    await expect(handler.executeWithFallback(executor)).rejects.toEqual({ status: 400, message: 'Bad request payload' });
    expect(executor).toHaveBeenCalledTimes(1);
  });
});
