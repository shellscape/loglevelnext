'use strict';

const assert = require('assert');
const sinon = require('sinon');
const LogLevel = require('../../lib/LogLevel');
const PrefixFactory = require('../../factory/PrefixFactory');

describe('PrefixFactory', () => {
  const sandbox = sinon.sandbox.create();

  let log;
  let factory;

  before(() => {
    sandbox.spy(console, 'info');
    log = new LogLevel({
      level: 'trace',
      name: 'test',
      prefix: {}
    });
    factory = log.factory; // eslint-disable-line
  });

  afterEach(() => {
    console.info.reset();
  });

  after(() => {
    sandbox.restore();
  });

  it('created a PrefixFactory', () => {
    assert(factory instanceof PrefixFactory);
  });

  it('prefixes output', () => {
    log.info('foo');

    const [first] = console.info.firstCall.args;

    assert.equal(console.info.callCount, 1);
    assert(/\d{2}:\d{2}:\d{2}\s\[info\]\sfoo/.test(first));
  });

  it('prefixes output with custom options', () => {
    const options = {
      level: opts => `[${opts.level.substring(1)}]`,
      name: opts => opts.logger.name.toUpperCase(),
      template: '{{time}} {{level}} ({{name}})-',
      time: () => `[${new Date().getHours()}]`
    };
    const customPrefix = new PrefixFactory(log, options);

    log.factory = customPrefix;
    log.info('foo');

    const [first] = console.info.firstCall.args;

    assert.equal(console.info.callCount, 1);
    assert(/\[\d{2}\]\s\[nfo\]\s\(TEST\)-foo/.test(first));
  });

  it('supports different prefixes per logger', () => {
    const log2 = new LogLevel({
      level: 'trace',
      name: 'test',
      prefix: { template: 'baz ' }
    });

    log.info('foo');
    log2.info('foo');

    const [first] = console.info.firstCall.args;
    const [last] = console.info.lastCall.args;

    assert.equal(console.info.callCount, 2);
    assert.notEqual(first, last);
  });
});
