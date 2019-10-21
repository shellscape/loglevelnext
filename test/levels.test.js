const test = require('ava');
const chalk = require('chalk');
const sinon = require('sinon');

const log = require('../lib');

const sandbox = sinon.createSandbox();
const spyMethods = Object.keys(log.levels)
  .map((key) => key.toLowerCase())
  .filter((key) => key !== 'silent');

test.before(() => {
  for (const method of spyMethods) {
    if (console[method]) {
      // curiously, node 6 doesn't have console.debug
      sandbox.spy(console, method);
    }
  }
  sandbox.spy(console, 'log');
});

test.afterEach(() => {
  for (const method of spyMethods) {
    if (console[method]) {
      console[method].resetHistory();
    }
  }
  console.log.resetHistory();
});

test.after(() => {
  sandbox.restore();
});

test.serial('can set all levels', (t) => {
  log.level = log.levels.TRACE;
  log.level = log.levels.DEBUG;
  log.level = log.levels.INFO;
  log.level = log.levels.WARN;
  log.level = log.levels.ERROR;
  log.level = log.levels.SILENT;

  t.pass();
});

for (const name of Object.keys(log.levels)) {
  const { [name]: level } = log.levels;

  test.serial(`sets level ${name}`, (t) => {
    log.level = name;
    t.is(log.level, level);
  });

  test.serial(`logs only levels >= ${name}`, (t) => {
    for (const method of spyMethods) {
      let expected = 1;

      // NOTE: the [object Object] + stack output to console is part of the 'trace' test. fret not.
      log[method](chalk.black(`test ${method}`));

      if (level > log.levels[method.toUpperCase()]) {
        expected = 0;
      }

      if (method === 'error' && name === 'TRACE' && expected === 1) {
        expected = 2;
      }

      t.is(console[method].callCount, expected);
    }
  });
}

test.serial('disable() sets SILENT', (t) => {
  log.disable();
  t.is(log.level, log.levels.SILENT);
});

test.serial('enable() sets TRACE', (t) => {
  log.enable();
  t.is(log.level, log.levels.TRACE);
});

test.serial('throws on invalid levels', (t) => {
  t.throws(() => {
    log.level = null;
  });
  t.throws(() => {
    log.level = undefined; // eslint-disable-line no-undefined
  });
  t.throws(() => {
    log.level = -1;
  });
  t.throws(() => {
    log.level = 'foo';
  });
});
