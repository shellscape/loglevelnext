import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import * as sinon from 'sinon';

import { LogLevel } from '../dist/LogLevel.js';
import { MethodFactory } from '../dist/MethodFactory.js';

/* eslint-disable sort-keys */
const levels = {
  TRACE: 0,
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  SILENT: 5
};
/* eslint-enable sort-keys */

const methods = ['trace', 'debug', 'info', 'warn', 'error'];

const factory = new MethodFactory();
const sandbox = sinon.createSandbox();
let log: LogLevel;
let spy: sinon.SinonSpy;

beforeAll(() => {
  spy = sandbox.spy(factory, 'make');
});

afterAll(() => {
  sandbox.restore();
});

describe('MethodFactory', () => {
  it('gets levels', () => {
    expect(factory.levels).toEqual(levels);
  });

  it('gets methods', () => {
    expect(factory.methods).toEqual(methods);
  });

  it('throws on replaceMethods() with invalid level', () => {
    expect(() => {
      factory.replaceMethods(null as any);
    }).toThrow();
  });

  it('throws on replaceMethods() with no logger defined', () => {
    expect(() => {
      factory.replaceMethods(0);
    }).toThrow();
  });

  it('equals the log factory', () => {
    log = new LogLevel({
      factory,
      level: 'trace',
      name: 'test'
    });
    expect(log.factory).toEqual(factory);
  });

  it('calls make() for each method', () => {
    expect(spy.callCount).toBe(factory.methods.length);

    const calls = spy.getCalls();

    for (const [index, method] of factory.methods.entries()) {
      expect(calls[index].args[0]).toBe(method);
    }

    spy.resetHistory();
  });

  it('calls make() for appropriate levels', () => {
    log.level = 'info';

    expect(spy.callCount).toBe(factory.levels.INFO + 1);

    const calls = spy.getCalls();
    const checkMethods = factory.methods.slice(factory.levels.INFO);

    for (const [index, method] of checkMethods.entries()) {
      expect(calls[index].args[0]).toBe(method);
    }
  });

  it('sets the factory and calls make()', () => {
    const newFactory = new MethodFactory(log);

    const newSpy = sandbox.spy(newFactory, 'make');
    log.factory = newFactory;

    expect(log.factory).toEqual(newFactory);
    expect(newSpy.callCount).toBe(factory.levels.INFO + 1);

    const calls = spy.getCalls();
    const checkMethods = factory.methods.slice(factory.levels.INFO);

    for (const [index, method] of checkMethods.entries()) {
      expect(calls[index].args[0]).toBe(method);
    }
  });
});
