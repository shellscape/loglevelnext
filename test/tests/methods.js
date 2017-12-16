'use strict';

const assert = require('assert');
const log = require('../../');
const LogLevel = require('../../lib/LogLevel');

describe('Methods', () => {
  const levels = Object.keys(log.levels)
    .map(key => key.toLowerCase())
    .filter(key => key !== 'silent');

  // console.debug is aliased to console.log
  levels.push('log');

  it('exists', () => {
    assert(log);
    assert(log instanceof LogLevel);
  });

  it('has logging methods', () => {
    for (const level of levels) {
      assert.equal(typeof log[level], 'function');
    }
  });
});
