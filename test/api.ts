import test from 'ava';

import log from '../src';
import { LogLevel } from '../src/LogLevel';
import { MethodFactory } from '../src/MethodFactory';
import { PrefixFactory } from '../src/PrefixFactory';

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
  t.deepEqual(log.loggers.default, log as any);
});

test('gets a new logger', (t) => {
  const child = log.create('child');
  t.truthy(child);
  t.notDeepEqual(child, log as any);
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
  const child1 = log.create({ id: (+new Date()).toString(), name: 'newer' });
  const child2 = log.create({ id: (+new Date() + 1).toString(), name: 'newer' });

  t.notDeepEqual(child1, child2);
});

test('create() throws if called with no name / empty name', (t) => {
  t.throws(() => {
    (log as any).create();
  });
  t.throws(() => {
    log.create('');
  });
  t.throws(() => {
    (log as any).create(true);
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
