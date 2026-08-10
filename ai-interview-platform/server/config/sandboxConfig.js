const BLOCKED_MODULES = [
  'fs', 'child_process', 'cluster', 'net', 'dgram',
  'dns', 'http2', 'https', 'http', 'tls',
  'tty', 'readline', 'repl', 'vm', 'v8',
  'worker_threads', 'process', 'os', 'perf_hooks',
  'async_hooks', 'trace_events', 'inspector',
];

// ---------------------------------------------------------------------------
// FORBIDDEN_PATTERNS
//
// Each regex is written to survive common evasion techniques:
//
//  1. Whitespace injection: \s* is used between keyword and punctuation so
//     "require  (" or "eval  (" are caught.
//
//  2. Block-comment injection: [\s\S]*? spans across /* comment */ sequences
//     where meaningful so "require/*x*/(" is caught.  A lightweight
//     strip-comments pass in sandboxValidator.js runs BEFORE these patterns
//     as the primary defence; the hardened patterns are a belt-and-braces
//     second layer.
//
//  3. Bracket-notation property access: each dangerous dot-access also has a
//     companion bracket-notation variant, e.g.  process['env'] / process["env"]
//     so attackers cannot use string keys to bypass dot-based patterns.
//
//  4. Template-literal keys: bracket patterns also match backtick strings
//     (`env`) to close the template-literal vector.
// ---------------------------------------------------------------------------
const FORBIDDEN_PATTERNS = [
  // process.anything  OR  process['anything']  OR  process[`anything`]
  {
    label: 'process_access',
    pattern: /\bprocess\s*(?:\.\s*\w+|\[\s*['"`][^'"`]+['"`]\s*\])/,
  },
  // require(…) — allows optional whitespace and comment between keyword and paren
  {
    label: 'require_statement',
    pattern: /\brequire\s*(?:\/\*[\s\S]*?\*\/)?\s*\(/,
  },
  // ES module import (static or dynamic import())
  {
    label: 'import_statement',
    pattern: /(?:^\s*import\s+|(?:\bimport\s*\())/m,
  },
  // eval(…) — word boundary so "evaluate" is not matched
  {
    label: 'eval_usage',
    pattern: /\beval\s*(?:\/\*[\s\S]*?\*\/)?\s*\(/,
  },
  // Function("…") constructor — upper-case F only (JS class name)
  {
    label: 'function_constructor',
    pattern: /\bFunction\s*(?:\/\*[\s\S]*?\*\/)?\s*\(/,
  },
  // new Function(…)
  {
    label: 'new_function',
    pattern: /\bnew\s+Function\s*(?:\/\*[\s\S]*?\*\/)?\s*\(/,
  },
  // setTimeout / setInterval called with a string argument (code injection)
  {
    label: 'set_timeout_string',
    pattern: /\bsetTimeout\s*\(\s*['"`]/,
  },
  {
    label: 'set_interval_string',
    pattern: /\bsetInterval\s*\(\s*['"`]/,
  },
  // global.anything  OR  global['anything']
  {
    label: 'global_access',
    pattern: /\bglobal\s*(?:\.\s*\w+|\[\s*['"`][^'"`]+['"`]\s*\])/,
  },
  // window.anything  OR  window['anything']
  {
    label: 'window_access',
    pattern: /\bwindow\s*(?:\.\s*\w+|\[\s*['"`][^'"`]+['"`]\s*\])/,
  },
  // document.anything  OR  document['anything']
  {
    label: 'document_access',
    pattern: /\bdocument\s*(?:\.\s*\w+|\[\s*['"`][^'"`]+['"`]\s*\])/,
  },
  // fetch(…) — network call
  {
    label: 'fetch_call',
    pattern: /\bfetch\s*\(/,
  },
  // new XMLHttpRequest()
  {
    label: 'xml_http_request',
    pattern: /\bXMLHttpRequest\s*\(/,
  },
  // new WebSocket(…)
  {
    label: 'websocket',
    pattern: /\bWebSocket\s*\(/,
  },
  // localStorage.anything  OR  localStorage['anything']
  {
    label: 'local_storage',
    pattern: /\blocalStorage\s*(?:\.\s*\w+|\[\s*['"`][^'"`]+['"`]\s*\])/,
  },
  // process.env  OR  process['env']  OR  process[`env`]  (dedicated, stricter rule)
  {
    label: 'environment_variable',
    pattern: /\bprocess\s*(?:\.\s*env|\[\s*['"`]env['"`]\s*\])/,
  },
  // Bracket-notation require: require['call'] or similar meta tricks
  {
    label: 'bracket_require',
    pattern: /\brequire\s*\[\s*['"`][^'"`]*['"`]\s*\]/,
  },
];

// AST-MIGRATION NOTE:
// The patterns above are a hardened regex layer suitable for the current
// architecture.  For a future upgrade, consider supplementing with a
// lightweight AST parse (e.g. acorn) in sandboxValidator.js.  The AST
// approach handles obfuscated string concatenation and computed property
// names that no regex can reliably catch.  The FORBIDDEN_PATTERNS array
// should be kept as a first-pass fast-fail before any heavier AST traversal.

const SUPPORTED_LANGUAGES = ['javascript', 'cpp', 'java', 'python'];

const EXECUTION_LIMITS = {
  maxCodeLengthChars: 30000,
  maxExecutionTimeMs: 10000,
  maxMemoryMb: 256,
};

module.exports = {
  BLOCKED_MODULES,
  FORBIDDEN_PATTERNS,
  SUPPORTED_LANGUAGES,
  EXECUTION_LIMITS,
};
