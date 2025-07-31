import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import sinon from 'sinon';

import { LogLevel } from '../dist/LogLevel.js';
import { Factory } from '../dist/MethodFactory.js';
import { PrefixFactory } from '../dist/PrefixFactory.js';

const sandbox = sinon.createSandbox();

let log: LogLevel;
let factory: Factory;
let spy: sinon.SinonSpy;

beforeAll(() => {
  spy = sandbox.spy(console, 'info');
  log = new LogLevel({
    level: 'trace',
    name: 'test',
    prefix: {}
  });
  factory = log.factory; // eslint-disable-line
});

afterEach(() => {
  spy.resetHistory();
});

afterAll(() => {
  sandbox.restore();
});

describe('PrefixFactory', () => {
  it('created a PrefixFactory', () => {
    expect(factory instanceof PrefixFactory).toBeTruthy();
  });

  it('gets the name from the base logger', () => {
    expect(factory.options.name({ logger: log })).toBe('test');
  });

  it('prefixes output', () => {
    log.info('foo');

    const [first] = spy.firstCall.args;

    expect(spy.callCount).toBe(1);
    expect(/\d{2}:\d{2}:\d{2}\s\[info\]\sfoo/.test(first)).toBeTruthy();
  });

  it('prefixes output with custom options', () => {
    const options = {
      level: (opts: any) => `[${opts.level.substring(1)}]`,
      name: (opts: any) => opts.logger.name.toUpperCase(),
      template: '{{time}} {{level}} ({{name}}) {{nope}}-',
      time: () => `[${new Date().toTimeString().split(' ')[0].split(':')[0]}]`
    };
    const customPrefix = new PrefixFactory(log, options);

    log.factory = customPrefix;
    log.info('foo');

    const [first] = spy.firstCall.args;
    const terped = customPrefix.interpolate('info');
    const rOutput = /\[\d{2}\]\s\[nfo\]\s\(TEST\)\s\{\{nope\}\}-/;

    expect(rOutput.test(terped)).toBeTruthy();
    expect(spy.callCount).toBe(1);
    expect(/\[\d{2}\]\s\[nfo\]\s\(TEST\)\s\{\{nope\}\}-foo/.test(first)).toBeTruthy();

    // test the first argument when passing a non-string
    log.info({});

    const [last] = spy.lastCall.args;
    expect(rOutput.test(last)).toBeTruthy();
  });

  it('supports different prefixes per logger', () => {
    const log2 = new LogLevel({
      level: 'trace',
      name: 'test',
      prefix: { template: 'baz ' }
    });

    log.info('foo');
    log2.info('foo');

    const [first] = spy.firstCall.args;
    const [last] = spy.lastCall.args;

    expect(spy.callCount).toBe(2);
    expect(first).not.toBe(last);
  });
});
