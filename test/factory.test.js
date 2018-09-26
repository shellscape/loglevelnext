const test = require('ava');
const sinon = require('sinon');

const LogLevel = require('../lib/LogLevel');
const MethodFactory = require('../lib/MethodFactory');

const levels = {
  TRACE: 0,
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  SILENT: 5
};

const methods = ['trace', 'debug', 'info', 'warn', 'error'];

const factory = new MethodFactory();
const sandbox = sinon.sandbox.create();
let log;

test.before(() => {
  sandbox.spy(factory, 'make');
});

test.after(() => {
  sandbox.restore();
});

test('gets levels', (t) => {
  t.deepEqual(factory.levels, levels);
});

test('gets methods', (t) => {
  t.deepEqual(factory.methods, methods);
});

test('throws on replaceMethods() with invalid level', (t) => {
  t.throws(() => {
    factory.replaceMethods(null);
  });
});

test('throws on replaceMethods() with no logger defined', (t) => {
  t.throws(() => {
    factory.replaceMethods(0);
  });
});

test('equals the log factory', (t) => {
  log = new LogLevel({
    name: 'test',
    level: 'trace',
    factory
  });

  t.deepEqual(log.factory, factory);
});

test('calls make() for each method', (t) => {
  t.is(factory.make.callCount, factory.methods.length);

  const calls = factory.make.getCalls();

  for (const [index, method] of factory.methods.entries()) {
    t.is(calls[index].args[0], method);
  }

  factory.make.resetHistory();
});

test('calls make() for appropriate levels', (t) => {
  log.level = 'info';

  t.is(factory.make.callCount, factory.levels.INFO + 1);

  const calls = factory.make.getCalls();
  const checkMethods = factory.methods.slice(factory.levels.INFO);

  for (const [index, method] of checkMethods.entries()) {
    t.is(calls[index].args[0], method);
  }
});

test('sets the factory and calls make()', (t) => {
  const newFactory = new MethodFactory(log);

  sandbox.spy(newFactory, 'make');
  log.factory = newFactory;

  t.deepEqual(log.factory, newFactory);
  t.is(newFactory.make.callCount, factory.levels.INFO + 1);

  const calls = factory.make.getCalls();
  const checkMethods = factory.methods.slice(factory.levels.INFO);

  for (const [index, method] of checkMethods.entries()) {
    t.is(calls[index].args[0], method);
  }
});
