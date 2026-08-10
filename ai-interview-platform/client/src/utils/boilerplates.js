/**
 * Coding challenge boilerplate templates organized by Role and Language.
 * Provides realistic class skeletons, functions, and standard IO formats.
 */

export const LANGUAGE_BOILERPLATES = {
  javascript: {
    ext: 'js',
    label: 'JavaScript',
    'Frontend Engineer': `class EventEmitter {
  constructor() {
    this.events = {};
  }

  /**
   * Registers a callback for the given eventName.
   * Returns an object with a release() method to unsubscribe.
   */
  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
    
    return {
      release: () => {
        if (!this.events[eventName]) return;
        this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
      }
    };
  }

  /**
   * Executes all registered callbacks for the given eventName.
   */
  emit(eventName, ...args) {
    if (!this.events[eventName]) return;
    this.events[eventName].forEach(callback => callback(...args));
  }
}

// Example verification:
const emitter = new EventEmitter();
const sub = emitter.subscribe('click', (msg) => console.log('Clicked:', msg));
emitter.emit('click', 'emitter is working!');
sub.release();
`,
    'Backend Engineer': `class TokenBucket {
  /**
   * @param {number} capacity - Max tokens the bucket can hold
   * @param {number} refillRate - Tokens added per second
   */
  constructor(capacity, refillRate) {
    this.capacity = capacity;
    this.refillRate = refillRate;
    this.tokens = capacity;
    this.lastRefilled = Date.now();
  }

  /**
   * Lazy-refills the bucket and checks if tokensRequired can be consumed.
   * @param {number} tokensRequired
   * @returns {boolean}
   */
  allowRequest(tokensRequired) {
    const now = Date.now();
    const elapsedSeconds = (now - this.lastRefilled) / 1000;
    this.lastRefilled = now;

    // Refill tokens
    this.tokens = Math.min(this.capacity, this.tokens + elapsedSeconds * this.refillRate);

    if (this.tokens >= tokensRequired) {
      this.tokens -= tokensRequired;
      return true;
    }
    return false;
  }
}

// Test verification:
const bucket = new TokenBucket(10, 2);
console.log('Request allowed (1 token):', bucket.allowRequest(1));
`,
    'Fullstack Engineer': `/**
 * Wrapper client with retry logic and abortable timeouts.
 */
async function fetchWithRetry(url, options = {}, maxRetries = 3, timeoutMs = 2000) {
  let attempt = 0;
  
  while (attempt < maxRetries) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response;
    } catch (err) {
      clearTimeout(timeoutId);
      attempt++;
      if (attempt >= maxRetries) throw err;
      console.warn(\`Attempt \${attempt} failed. Retrying...\`);
    }
  }
}

console.log('FetchWithRetry helper ready.');
`,
    'AI / ML Engineer': `/**
 * Calculates the Cosine Similarity between vector A and vector B.
 */
function cosineSimilarity(vecA, vecB) {
  if (vecA.length !== vecB.length) return 0;
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

console.log('Similarity:', cosineSimilarity([1, 2, 3], [1, 2, 3]));
`
  },
  python: {
    ext: 'py',
    label: 'Python',
    'Frontend Engineer': `# Implement custom EventEmitter class in Python
class EventEmitter:
    def __init__(self):
        self.events = {}

    def subscribe(self, event_name, callback):
        if event_name not in self.events:
            self.events[event_name] = []
        self.events[event_name].append(callback)
        
        class Subscription:
            def __init__(self, events, name, cb):
                self.events = events
                self.name = name
                self.cb = cb
            def release(self):
                if self.name in self.events:
                    self.events[self.name].remove(self.cb)
                    
        return Subscription(self.events, event_name, callback)

    def emit(self, event_name, *args, **kwargs):
        if event_name in self.events:
            for callback in self.events[event_name]:
                callback(*args, **kwargs)

if __name__ == '__main__':
    emitter = EventEmitter()
    sub = emitter.subscribe('click', lambda msg: print('Clicked:', msg))
    emitter.emit('click', 'emitter working!')
    sub.release()
`,
    'Backend Engineer': `# TokenBucket Rate Limiter implementation
import time

class TokenBucket:
    def __init__(self, capacity: float, refill_rate: float):
        self.capacity = capacity
        self.refill_rate = refill_rate
        self.tokens = capacity
        self.last_refilled = time.time()

    def allow_request(self, tokens_required: float) -> bool:
        now = time.time()
        elapsed = now - self.last_refilled
        self.last_refilled = now
        
        # Lazy refill
        self.tokens = min(self.capacity, self.tokens + elapsed * self.refill_rate)
        
        if self.tokens >= tokens_required:
            self.tokens -= tokens_required
            return True
        return False

if __name__ == '__main__':
    bucket = TokenBucket(10, 2)
    print('Request allowed:', bucket.allow_request(1))
`,
    'Fullstack Engineer': `# Fetch timeout simulator in Python
import urllib.request
import socket

def fetch_with_retry(url, max_retries=3, timeout=2.0):
    for attempt in range(max_retries):
        try:
            with urllib.request.urlopen(url, timeout=timeout) as response:
                return response.read().decode('utf-8')
        except (urllib.error.URLError, socket.timeout) as e:
            if attempt == max_retries - 1:
                raise e
            print(f"Attempt {attempt+1} failed. Retrying...")

if __name__ == '__main__':
    print("FetchRetry helper initialized.")
`,
    'AI / ML Engineer': `# Vector cosine similarity semantic ranker
import math

def cosine_similarity(vec_a, vec_b):
    if len(vec_a) != len(vec_b):
        return 0.0
    dot_product = sum(a * b for a, b in zip(vec_a, vec_b))
    norm_a = sum(a * a for a in vec_a)
    norm_b = sum(b * b for b in vec_b)
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return dot_product / (math.sqrt(norm_a) * math.sqrt(norm_b))

if __name__ == '__main__':
    print('Similarity:', cosine_similarity([1, 2, 3], [1, 2, 3]))
`
  },
  cpp: {
    ext: 'cpp',
    label: 'C++',
    'Frontend Engineer': `// Custom Event Emitter in C++
#include <iostream>
#include <unordered_map>
#include <vector>
#include <functional>
#include <string>

class EventEmitter {
public:
    void subscribe(const std::string& event, std::function<void(const std::string&)> cb) {
        listeners[event].push_back(cb);
    }
    void emit(const std::string& event, const std::string& data) {
        for (auto& cb : listeners[event]) {
            cb(data);
        }
    }
private:
    std::unordered_map<std::string, std::vector<std::function<void(const std::string&)>>> listeners;
};

int main() {
    EventEmitter emitter;
    emitter.subscribe("click", [](const std::string& msg) {
        std::cout << "Clicked: " << msg << std::endl;
    });
    emitter.emit("click", "C++ emitter active!");
    return 0;
}
`,
    'Backend Engineer': `// TokenBucket Rate Limiter in C++
#include <iostream>
#include <chrono>
#include <algorithm>

class TokenBucket {
private:
    double capacity;
    double refillRate;
    double tokens;
    std::chrono::steady_clock::time_point lastRefilled;
public:
    TokenBucket(double cap, double rate) : capacity(cap), refillRate(rate), tokens(cap), lastRefilled(std::chrono::steady_clock::now()) {}
    
    bool allowRequest(double tokensRequired) {
        auto now = std::chrono::steady_clock::now();
        double elapsed = std::chrono::duration<double>(now - lastRefilled).count();
        lastRefilled = now;
        
        tokens = std::min(capacity, tokens + elapsed * refillRate);
        if (tokens >= tokensRequired) {
            tokens -= tokensRequired;
            return true;
        }
        return false;
    }
};

int main() {
    TokenBucket bucket(10.0, 2.0);
    std::cout << "Request allowed: " << (bucket.allowRequest(1.0) ? "true" : "false") << std::endl;
    return 0;
}
`,
    'Fullstack Engineer': `// C++ Request Orchestrator Skeletons
#include <iostream>
#include <string>

class RequestOrchestrator {
public:
    static bool executeWithRetry(int maxRetries) {
        std::cout << "Executing request with retries: " << maxRetries << std::endl;
        return true;
    }
};

int main() {
    RequestOrchestrator::executeWithRetry(3);
    return 0;
}
`,
    'AI / ML Engineer': `// Cosine Similarity Ranker in C++
#include <iostream>
#include <vector>
#include <cmath>

double cosineSimilarity(const std::vector<double>& vecA, const std::vector<double>& vecB) {
    if (vecA.size() != vecB.size()) return 0.0;
    double dotProduct = 0.0, normA = 0.0, normB = 0.0;
    for (size_t i = 0; i < vecA.size(); ++i) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    if (normA == 0.0 || normB == 0.0) return 0.0;
    return dotProduct / (std::sqrt(normA) * std::sqrt(normB));
}

int main() {
    std::vector<double> v1 = {1.0, 2.0, 3.0};
    std::vector<double> v2 = {1.0, 2.0, 3.0};
    std::cout << "Similarity: " << cosineSimilarity(v1, v2) << std::endl;
    return 0;
}
`
  },
  java: {
    ext: 'java',
    label: 'Java',
    'Frontend Engineer': `// Custom Event Emitter in Java
import java.util.*;

public class EventEmitter {
    private final Map<String, List<Runnable>> listeners = new HashMap<>();

    public void subscribe(String event, Runnable cb) {
        listeners.computeIfAbsent(event, k -> new ArrayList<>()).add(cb);
    }

    public void emit(String event) {
        List<Runnable> cbs = listeners.get(event);
        if (cbs != null) {
            for (Runnable cb : cbs) cb.run();
        }
    }

    public static void main(String[] args) {
        EventEmitter emitter = new EventEmitter();
        emitter.subscribe("click", () -> System.out.println("Java EventEmitter active!"));
        emitter.emit("click");
    }
}
`,
    'Backend Engineer': `// TokenBucket Limiter in Java
import java.time.Instant;

public class TokenBucket {
    private final double capacity;
    private final double refillRate;
    private double tokens;
    private Instant lastRefilled;

    public TokenBucket(double capacity, double refillRate) {
        this.capacity = capacity;
        this.refillRate = refillRate;
        this.tokens = capacity;
        this.lastRefilled = Instant.now();
    }

    public synchronized boolean allowRequest(double tokensRequired) {
        Instant now = Instant.now();
        double elapsed = java.time.Duration.between(lastRefilled, now).toNanos() / 1_000_000_000.0;
        lastRefilled = now;

        tokens = Math.min(capacity, tokens + elapsed * refillRate);

        if (tokens >= tokensRequired) {
            tokens -= tokensRequired;
            return true;
        }
        return false;
    }

    public static void main(String[] args) {
        TokenBucket bucket = new TokenBucket(10, 2);
        System.out.println("Request allowed: " + bucket.allowRequest(1));
    }
}
`,
    'Fullstack Engineer': `// Java Retry Handler Skeletons
public class RetryHandler {
    public static boolean executeWithRetry(int maxRetries) {
        System.out.println("Executing Java retry handler with maxRetries=" + maxRetries);
        return true;
    }

    public static void main(String[] args) {
        executeWithRetry(3);
    }
}
`,
    'AI / ML Engineer': `// Cosine Similarity Ranker in Java
public class SemanticRanker {
    public static double cosineSimilarity(double[] vecA, double[] vecB) {
        if (vecA.length != vecB.length) return 0.0;
        double dotProduct = 0.0, normA = 0.0, normB = 0.0;
        for (int i = 0; i < vecA.length; i++) {
            dotProduct += vecA[i] * vecB[i];
            normA += vecA[i] * vecA[i];
            normB += vecB[i] * vecB[i];
        }
        if (normA == 0.0 || normB == 0.0) return 0.0;
        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }

    public static void main(String[] args) {
        double[] v1 = {1.0, 2.0, 3.0};
        double[] v2 = {1.0, 2.0, 3.0};
        System.out.println("Similarity: " + cosineSimilarity(v1, v2));
    }
}
`
  }
};

/**
 * Helper to safely retrieve boilerplate template code for a given language and role.
 *
 * @param {string} language - Target programming language key (e.g. 'javascript', 'python')
 * @param {string} role - Target engineering role (e.g. 'Backend Engineer')
 * @returns {string} Boilerplate source template code string
 */
export function getBoilerplate(language, role) {
  const langConfig = LANGUAGE_BOILERPLATES[language?.toLowerCase()];
  if (!langConfig) return '';
  return langConfig[role] || Object.values(langConfig).find(val => typeof val === 'string') || '';
}

/**
 * Returns an array of all supported language keys.
 *
 * @returns {string[]}
 */
export function getSupportedLanguages() {
  return Object.keys(LANGUAGE_BOILERPLATES);
}

export default LANGUAGE_BOILERPLATES;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = LANGUAGE_BOILERPLATES;
  module.exports.getBoilerplate = getBoilerplate;
  module.exports.getSupportedLanguages = getSupportedLanguages;
  module.exports.LANGUAGE_BOILERPLATES = LANGUAGE_BOILERPLATES;
}
