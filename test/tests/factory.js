'use strict';

const assert = require('assert');
const sinon = require('sinon');
const LogLevel = require('../../lib/LogLevel');
const MethodFactory = require('../../lib/MethodFactory');

const levels = {
  TRACE: 0,
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  SILENT: 5
};

const methods = [
  'trace',
  'debug',
  'info',
  'warn',
  'error'
];

describe('MethodFactory', () => {
  const factory = new MethodFactory();
  const sandbox = sinon.sandbox.create();
  let log;

  before(() => {
    sandbox.spy(factory, 'make');
    log = new LogLevel({
      name: 'test',
      level: 'trace',
      factory
    });
  });

  after(() => {
    sandbox.restore();
  });

  it('gets levels', () => {
    assert.deepEqual(factory.levels, levels);
  });

  it('gets methods', () => {
    assert.deepEqual(factory.methods, methods);
  });

  it('equals the log factory', () => {
    assert.deepEqual(log.factory, factory);
  });

  it('calls make() for each method', () => {
    assert.equal(factory.make.callCount, factory.methods.length);

    const calls = factory.make.getCalls();

    for (const [index, method] of factory.methods.entries()) {
      assert.equal(calls[index].args[0], method);
    }

    factory.make.reset();
  });

  it('calls make() for appropriate levels', () => {
    log.level = 'info';

    assert.equal(factory.make.callCount, factory.levels.INFO + 1);

    const calls = factory.make.getCalls();
    const checkMethods = factory.methods.slice(factory.levels.INFO);

    for (const [index, method] of checkMethods.entries()) {
      assert.equal(calls[index].args[0], method);
    }
  });

  it('sets the factory and calls make()', () => {
    const newFactory = new MethodFactory(log);

    sandbox.spy(newFactory, 'make');
    log.factory = newFactory;

    assert.deepEqual(log.factory, newFactory);
    assert.equal(newFactory.make.callCount, factory.levels.INFO + 1);

    const calls = factory.make.getCalls();
    const checkMethods = factory.methods.slice(factory.levels.INFO);

    for (const [index, method] of checkMethods.entries()) {
      assert.equal(calls[index].args[0], method);
    }
  });
});
