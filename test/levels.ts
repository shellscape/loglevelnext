import chalk from 'chalk';
import sinon from 'sinon';
import test from 'ava';

import log from '../src';

const sandbox = sinon.createSandbox();
const spyMethods = Object.keys(log.levels)
  .map((key) => key.toLowerCase())
  .filter((key) => key !== 'silent');

interface ConsoleIndex {
  [key: string]: Function;
}

const con = console as unknown as ConsoleIndex;

test.before(() => {
  for (const method of spyMethods) {
    if (con[method]) {
      // curiously, node 6 doesn't have console.debug
      sandbox.spy(con, method as any);
    }
  }
  sandbox.spy(con, 'log');
});

test.afterEach(() => {
  for (const method of spyMethods) {
    if (con[method]) {
      (con[method] as sinon.SinonSpy).resetHistory();
    }
  }
  (con.log as sinon.SinonSpy).resetHistory();
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
  const levelName: Uppercase<string> = name as any;
  const { [levelName]: level } = log.levels;

  test.serial(`sets level ${name}`, (t) => {
    log.level = name;
    t.is(log.level, level);
  });

  test.serial(`logs only levels >= ${name}`, (t) => {
    for (const method of spyMethods) {
      let expected = 1;

      // NOTE: the [object Object] + stack output to console is part of the 'trace' test. fret not.
      log[method](chalk.black(`test ${method}`));

      if (level > log.levels[method.toUpperCase() as Uppercase<string>]) {
        expected = 0;
      }

      // This was true for earlier node versions
      // if (method === 'error' && name === 'TRACE' && expected === 1) {
      //   expected = 2;
      // }

      t.is((con[method] as sinon.SinonSpy).callCount, expected);
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
    (log as any).level = null;
  });
  t.throws(() => {
    // eslint-disable-next-line no-undefined
    (log as any).level = undefined;
  });
  t.throws(() => {
    log.level = -1;
  });
  t.throws(() => {
    log.level = 'foo';
  });
});
