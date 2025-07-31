import { describe, it, expect } from 'vitest';

import log from '../dist/index.js';
import { LogLevel } from '../dist/LogLevel.js';
import { MethodFactory } from '../dist/MethodFactory.js';
import { PrefixFactory } from '../dist/PrefixFactory.js';

describe('API', () => {
  it('has extended methods', () => {
    expect(typeof log.loggers).toBe('object');
    expect(typeof log.create).toBe('function');
  });

  it('returns factories', () => {
    expect(log.factories).toBeTruthy();
    expect(log.factories.MethodFactory).toEqual(MethodFactory);
    expect(log.factories.PrefixFactory).toEqual(PrefixFactory);
  });

  it('returns loggers cache', () => {
    expect(log.loggers).toBeTruthy();
    expect(log.loggers.default).toEqual(log as any);
  });

  it('gets a new logger', () => {
    const child = log.create('child');
    expect(child).toBeTruthy();
    expect(child).not.toEqual(log as any);
    expect(child instanceof LogLevel).toBeTruthy();
    expect(typeof child.create).toBe('undefined');
    expect(log.loggers.child).toBeTruthy();
  });

  it('create() returns the same instance', () => {
    const child1 = log.create('new');
    const child2 = log.create('new');

    expect(child1).toEqual(child2);
  });

  it('create() returns different instances', () => {
    const child1 = log.create({ id: (+new Date()).toString(), name: 'newer' });
    const child2 = log.create({ id: (+new Date() + 1).toString(), name: 'newer' });

    expect(child1).not.toEqual(child2);
  });

  it('create() throws if called with no name / empty name', () => {
    expect(() => {
      (log as any).create();
    }).toThrow();
    expect(() => {
      log.create('');
    }).toThrow();
    expect(() => {
      (log as any).create(true);
    }).toThrow();
  });

  it('child logger created with the same level', () => {
    log.level = 'error';
    const child = log.create('child2');
    expect(child.level).toBe(log.level);
  });

  it("other loggers do not change when the default logger's level is changed", () => {
    const child = log.create('child');

    child.level = 'warn';
    log.level = 'silent';

    expect(log.level).toBe(5);
    expect(child.level).toBe(3);
  });
});
