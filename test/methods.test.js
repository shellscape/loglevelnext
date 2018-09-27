const test = require('ava');

const log = require('../lib');
const LogLevel = require('../lib/LogLevel');

const levels = Object.keys(log.levels)
  .map((key) => key.toLowerCase())
  .filter((key) => key !== 'silent');

// console.debug is aliased to console.log
levels.push('log');

test('exists', (t) => {
  t.truthy(log);
  t.true(log instanceof LogLevel);
});

test('has logging methods', (t) => {
  for (const level of levels) {
    t.is(typeof log[level], 'function');
  }
});
