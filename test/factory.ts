import test from 'ava';
import sinon from 'sinon';

import { LogLevel } from '../src/LogLevel';
import { MethodFactory } from '../src/MethodFactory';

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

test.before(() => {
  spy = sandbox.spy(factory, 'make');
});

test.after(() => {
  sandbox.restore();
});

test.serial('gets levels', (t) => {
  t.deepEqual(factory.levels, levels);
});

test.serial('gets methods', (t) => {
  t.deepEqual(factory.methods, methods);
});

test.serial('throws on replaceMethods() with invalid level', (t) => {
  t.throws(() => {
    factory.replaceMethods(null as any);
  });
});

test.serial('throws on replaceMethods() with no logger defined', (t) => {
  t.throws(() => {
    factory.replaceMethods(0);
  });
});

test.serial('equals the log factory', (t) => {
  log = new LogLevel({
    factory,
    level: 'trace',
    name: 'test'
  });
  t.deepEqual(log.factory, factory);
});

test.serial('calls make() for each method', (t) => {
  t.is(spy.callCount, factory.methods.length);

  const calls = spy.getCalls();

  for (const [index, method] of factory.methods.entries()) {
    t.is(calls[index].args[0], method);
  }

  spy.resetHistory();
});

test.serial('calls make() for appropriate levels', (t) => {
  log.level = 'info';

  t.is(spy.callCount, factory.levels.INFO + 1);

  const calls = spy.getCalls();
  const checkMethods = factory.methods.slice(factory.levels.INFO);

  for (const [index, method] of checkMethods.entries()) {
    t.is(calls[index].args[0], method);
  }
});

test.serial('sets the factory and calls make()', (t) => {
  const newFactory = new MethodFactory(log);

  const newSpy = sandbox.spy(newFactory, 'make');
  log.factory = newFactory;

  t.deepEqual(log.factory, newFactory);
  t.is(newSpy.callCount, factory.levels.INFO + 1);

  const calls = spy.getCalls();
  const checkMethods = factory.methods.slice(factory.levels.INFO);

  for (const [index, method] of checkMethods.entries()) {
    t.is(calls[index].args[0], method);
  }
});
