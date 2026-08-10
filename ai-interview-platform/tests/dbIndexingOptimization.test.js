const Interview = require('../server/models/Interview');
const CustomQuestionSet = require('../server/models/CustomQuestionSet');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadESMAsCommonJS(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const transformed = code
    .replace(/import\s+mongoose\s+from\s+'mongoose';?/g, "const mongoose = require('mongoose');")
    .replace(/export\s+default\s+(\w+);?/g, 'module.exports = $1;');
  const context = { module: {}, exports: {}, require: require, console };
  vm.createContext(context);
  vm.runInContext(transformed, context);
  return context.module.exports;
}

describe('Database Index Optimization Verification', () => {
  test('Interview schema indexes contain compound query index', () => {
    const indexes = Interview.schema.indexes();
    const hasStatusIndex = indexes.some(idx => idx[0].status === 1 && idx[0].createdAt === -1);
    expect(hasStatusIndex).toBe(true);
  });

  test('CustomQuestionSet schema indexes contain compound user active index', () => {
    const indexes = CustomQuestionSet.schema.indexes();
    const hasUserActiveIndex = indexes.some(idx => idx[0].userId === 1 && idx[0].isActive === 1);
    expect(hasUserActiveIndex).toBe(true);
  });

  test('ProctorLog schema indexes contain compound interview violation index', () => {
    const ProctorLog = loadESMAsCommonJS(path.join(__dirname, '../server/models/ProctorLog.js'));
    const indexes = ProctorLog.schema.indexes();
    const hasViolationIndex = indexes.some(idx => idx[0].interviewId === 1 && idx[0].violationType === 1);
    expect(hasViolationIndex).toBe(true);
  });
});
