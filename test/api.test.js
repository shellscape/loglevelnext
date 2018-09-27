const test = require('ava');

const log = require('../lib');
const LogLevel = require('../lib/LogLevel');
const MethodFactory = require('../lib/factory/MethodFactory');
const PrefixFactory = require('../lib/factory/PrefixFactory');

test('has extended methods', (t) => {
  t.is(typeof log.loggers, 'object');
  t.is(typeof log.create, 'function');
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
  const child = log.create('child');
  t.truthy(child);
  t.notDeepEqual(child, log);
  t.truthy(child instanceof LogLevel);
  t.is(typeof child.create, 'undefined');
  t.truthy(log.loggers.child);
});

test('create() returns the same instance', (t) => {
  const child1 = log.create('new');
  const child2 = log.create('new');

  t.deepEqual(child1, child2);
});

test('create() returns different instances', (t) => {
  const child1 = log.create({ name: 'newer', id: +new Date() });
  const child2 = log.create({ name: 'newer', id: +new Date() + 1 });

  t.notDeepEqual(child1, child2);
});

test('create() throws if called with no name / empty name', (t) => {
  t.throws(() => {
    log.create();
  });
  t.throws(() => {
    log.create('');
  });
  t.throws(() => {
    log.create(true);
  });
});

test('child logger created with the same level', (t) => {
  log.level = 'error';
  const child = log.create('child2');
  t.is(child.level, log.level);
});

test("other loggers do not change when the default logger's level is changed", (t) => {
  const child = log.create('child');

  child.level = 'warn';
  log.level = 'silent';

  t.is(log.level, 5);
  t.is(child.level, 3);
});
