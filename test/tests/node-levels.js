'use strict';

const assert = require('assert');
const chalk = require('chalk');
const sinon = require('sinon');
const log = require('../../');

describe('Levels', () => {
  const sandbox = sinon.sandbox.create();
  const spyMethods = Object.keys(log.levels)
    .map(key => key.toLowerCase())
    .filter(key => key !== 'silent');

  before(() => {
    for (const method of spyMethods) {
      sandbox.spy(console, method);
    }
    sandbox.spy(console, 'log');
  });

  afterEach(() => {
    for (const method of spyMethods) {
      console[method].reset();
    }
    console.log.reset();
  });

  after(() => {
    sandbox.restore();
  });

  it('can set all levels', () => {
    log.level = log.levels.TRACE;
    log.level = log.levels.DEBUG;
    log.level = log.levels.INFO;
    log.level = log.levels.WARN;
    log.level = log.levels.ERROR;
    log.level = log.levels.SILENT;
  });

  for (const name of Object.keys(log.levels)) {
    const { [name]: level } = log.levels;

    it(`sets level ${name}`, () => {
      log.level = name;
      assert.equal(log.level, level);
    });

    it(`logs only levels >= ${name}`, () => {
      for (let method of spyMethods) {
        let expected = 1;

        log[method](chalk.black(`test ${method}`));

        if (level > log.levels[method.toUpperCase()]) {
          expected = 0;
        }

        if (method === 'error' && name === 'TRACE' && expected === 1) {
          expected = 2;
        }

        if (method === 'debug') {
          method = 'log';
        }
        assert.equal(console[method].callCount, expected);
      }
    });
  }

  it('disable() sets SILENT', () => {
    log.disable();
    assert.equal(log.level, log.levels.SILENT);
  });

  it('throws on invalid levels', () => {
    assert.throws(() => { log.level = null; });
    assert.throws(() => { log.level = undefined; }); // eslint-disable-line no-undefined
    assert.throws(() => { log.level = -1; });
    assert.throws(() => { log.level = 'foo'; });
  });
});
