'use strict';

const assert = require('assert');
const log = require('../../');
const LogLevel = require('../../lib/LogLevel');
const MethodFactory = require('../../lib/MethodFactory');
const PrefixFactory = require('../../factory/PrefixFactory');

describe('Default Logger API', () => {
  it('has extended methods', () => {
    assert.equal(typeof log.loggers, 'object');
    assert.equal(typeof log.getLogger, 'function');
    assert.equal(typeof log.noConflict, 'function');
  });

  it('returns factories', () => {
    assert(log.factories);
    assert.deepEqual(log.factories.MethodFactory, MethodFactory);
    assert.deepEqual(log.factories.PrefixFactory, PrefixFactory);
  });

  it('returns loggers cache', () => {
    assert(log.loggers);
    assert.deepEqual(log.loggers.default, log);
  });

  it('gets a new logger', () => {
    const child = log.getLogger('child');
    assert(child);
    assert.notDeepEqual(child, log);
    assert(child instanceof LogLevel);
    assert.equal(typeof child.getLogger, 'undefined');
    assert.equal(typeof child.noConflict, 'undefined');
    assert(log.loggers.child);
  });

  it('getLogger() returns the same instance', () => {
    const child1 = log.getLogger('new');
    const child2 = log.getLogger('new');

    assert.deepEqual(child1, child2);
  });

  it('getLogger() returns different instances', () => {
    const child1 = log.getLogger({ name: 'newer', id: +new Date() });
    const child2 = log.getLogger({ name: 'newer', id: +new Date() + 1 });

    assert.notDeepEqual(child1, child2);
  });

  it('getLogger() throws if called with no name / empty name', () => {
    assert.throws(() => { log.getLogger(); });
    assert.throws(() => { log.getLogger(''); });
    assert.throws(() => { log.getLogger(true); });
  });

  it('child logger created with the same level', () => {
    log.level = 'error';
    const child = log.getLogger('child2');
    assert.equal(child.level, log.level);
  });

  it('other loggers do not change when the default logger\'s level is changed', () => {
    const child = log.getLogger('child');

    child.level = 'warn';
    log.level = 'silent';

    assert.equal(log.level, 5);
    assert.equal(child.level, 3);
  });

  it('confirm noConflict() does bubkis on node', () => {
    const logger = log.noConflict();
    assert.deepEqual(logger, log);
  });
});
