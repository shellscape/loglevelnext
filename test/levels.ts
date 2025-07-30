import chalk from 'chalk';
import sinon from 'sinon';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';

import log from '../dist/index.js';

const sandbox = sinon.createSandbox();
const spyMethods = Object.keys(log.levels)
  .map((key) => key.toLowerCase())
  .filter((key) => key !== 'silent');

interface ConsoleIndex {
  [key: string]: Function;
}

const con = console as unknown as ConsoleIndex;

beforeAll(() => {
  for (const method of spyMethods) {
    if (con[method]) {
      // curiously, node 6 doesn't have console.debug
      sandbox.spy(con, method as any);
    }
  }
  sandbox.spy(con, 'log');
});

afterEach(() => {
  for (const method of spyMethods) {
    if (con[method]) {
      (con[method] as sinon.SinonSpy).resetHistory();
    }
  }
  (con.log as sinon.SinonSpy).resetHistory();
});

afterAll(() => {
  sandbox.restore();
});

describe('LogLevel levels', () => {
  it('can set all levels', () => {
    log.level = log.levels.TRACE;
    log.level = log.levels.DEBUG;
    log.level = log.levels.INFO;
    log.level = log.levels.WARN;
    log.level = log.levels.ERROR;
    log.level = log.levels.SILENT;

    expect(true).toBe(true);
  });

  for (const name of Object.keys(log.levels)) {
    const levelName: Uppercase<string> = name as any;
    const { [levelName]: level } = log.levels;

    it(`sets level ${name}`, () => {
      log.level = name;
      expect(log.level).toBe(level);
    });

    it(`logs only levels >= ${name}`, () => {
      for (const method of spyMethods) {
        let expected = 1;

        // NOTE: the [object Object] + stack output to console is part of the 'trace' test. fret not.
        log[method](chalk.black(`test ${method}`));

        if (level > log.levels[method.toUpperCase() as Uppercase<string>]) {
          expected = 0;
        }

        if (method === 'error' && name === 'TRACE' && expected === 1) {
          expected = 2;
        }

        expect((con[method] as sinon.SinonSpy).callCount).toBe(expected);
      }
    });
  }

  it('disable() sets SILENT', () => {
    log.disable();
    expect(log.level).toBe(log.levels.SILENT);
  });

  it('enable() sets TRACE', () => {
    log.enable();
    expect(log.level).toBe(log.levels.TRACE);
  });

  it('throws on invalid levels', () => {
    expect(() => {
      (log as any).level = null;
    }).toThrow();
    expect(() => {
      // eslint-disable-next-line no-undefined
      (log as any).level = undefined;
    }).toThrow();
    expect(() => {
      log.level = -1;
    }).toThrow();
    expect(() => {
      log.level = 'foo';
    }).toThrow();
  });
});
