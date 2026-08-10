const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadESMAsCommonJS(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const transformed = code
    .replace(/export\s+class\s+(\w+)/g, 'class $1')
    .replace(/export\s+const\s+(\w+)\s*=/g, 'const $1 =')
    .replace(/export\s+(async\s+)?function\s+(\w+)/g, '$1function $2')
    .replace(/export\s+default\s+(\w+);?/g, '');
  
  const context = {
    exports: {},
    localStorage: { getItem: () => null, setItem: () => {} },
    console
  };
  vm.createContext(context);
  vm.runInContext(transformed + '\nexports.OfflineQueue = OfflineQueue;', context);
  return context.exports;
}

describe('PWA Offline Queue Event Dispatch and Message Relay', () => {
  let OfflineQueue;

  beforeEach(() => {
    const filePath = path.join(__dirname, '../client/src/utils/offlineQueue.js');
    const exports = loadESMAsCommonJS(filePath);
    OfflineQueue = exports.OfflineQueue;
  });

  test('should enqueue requests with serialized payloads correctly', () => {
    const queue = new OfflineQueue();
    queue.clear();
    const item = queue.enqueue('/api/interview/submit', { answer: 'React hooks' }, { method: 'POST' });
    expect(item).toBeDefined();
    expect(item.url).toBe('/api/interview/submit');
    expect(queue.getQueue().length).toBe(1);
  });

  test('should flush queued requests successfully when connection is online', async () => {
    const queue = new OfflineQueue();
    queue.clear();
    queue.enqueue('/api/interview/submit', { answer: 'Jest test' }, { method: 'POST' });
    
    const mockFetch = jest.fn().mockResolvedValue({ ok: true, status: 200 });
    const result = await queue.flush(mockFetch);

    expect(result.synced).toBe(1);
    expect(result.failed).toBe(0);
    expect(queue.getQueue().length).toBe(0);
  });
});
