const test = require('ava');

const log = require('../');
const LogLevel = require('../lib/LogLevel');
const MethodFactory = require('../lib/MethodFactory');
const PrefixFactory = require('../factory/PrefixFactory');

test('has extended methods', (t) => {
  t.is(typeof log.loggers, 'object');
  t.is(typeof log.getLogger, 'function');
});

test('returns factories', (t) => {
  t.truthy(log.factories);
  t.deepEqual(log.factories.MethodFactory, MethodFactory);
  t.deepEqual(log.factories.PrefixFactory, PrefixFactory);
});

test('returns loggers cache', (t) => {
  t.truthy(log.loggers);
  t.deepEqual(log.loggers.default, log);
});

test('gets a new logger', (t) => {
  const child = log.getLogger('child');
  t.truthy(child);
  t.notDeepEqual(child, log);
  t.truthy(child instanceof LogLevel);
  t.is(typeof child.getLogger, 'undefined');
  t.truthy(log.loggers.child);
});

test('getLogger() returns the same instance', (t) => {
  const child1 = log.getLogger('new');
  const child2 = log.getLogger('new');

  t.deepEqual(child1, child2);
});

test('getLogger() returns different instances', (t) => {
  const child1 = log.getLogger({ name: 'newer', id: +new Date() });
  const child2 = log.getLogger({ name: 'newer', id: +new Date() + 1 });

  t.notDeepEqual(child1, child2);
});

test('getLogger() throws if called with no name / empty name', (t) => {
  t.throws(() => {
    log.getLogger();
  });
  t.throws(() => {
    log.getLogger('');
  });
  t.throws(() => {
    log.getLogger(true);
  });
});

test('child logger created with the same level', (t) => {
  log.level = 'error';
  const child = log.getLogger('child2');
  t.is(child.level, log.level);
});

test("other loggers do not change when the default logger's level is changed", (t) => {
  const child = log.getLogger('child');

  child.level = 'warn';
  log.level = 'silent';

  t.is(log.level, 5);
  t.is(child.level, 3);
});
