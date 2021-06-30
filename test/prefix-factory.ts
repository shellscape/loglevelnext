import test from 'ava';
import sinon from 'sinon';

import { LogLevel } from '../src/LogLevel';
import { Factory } from '../src/MethodFactory';
import { PrefixFactory } from '../src/PrefixFactory';

const sandbox = sinon.createSandbox();

let log: LogLevel;
let factory: Factory;
let spy: sinon.SinonSpy;

test.before(() => {
  spy = sandbox.spy(console, 'info');
  log = new LogLevel({
    level: 'trace',
    name: 'test',
    prefix: {}
  });
    factory = log.factory; // eslint-disable-line
});

test.afterEach(() => {
  spy.resetHistory();
});

test.after(() => {
  sandbox.restore();
});

test.serial('created a PrefixFactory', (t) => {
  t.truthy(factory instanceof PrefixFactory);
});

test.serial('gets the name from the base logger', (t) => {
  t.is(factory.options.name({ logger: log }), 'test');
});

test.serial('prefixes output', (t) => {
  log.info('foo');

  const [first] = spy.firstCall.args;

  t.is(spy.callCount, 1);
  t.truthy(/\d{2}:\d{2}:\d{2}\s\[info\]\sfoo/.test(first));
});

test.serial('prefixes output with custom options', (t) => {
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

  t.truthy(rOutput.test(terped));
  t.is(spy.callCount, 1);
  t.truthy(/\[\d{2}\]\s\[nfo\]\s\(TEST\)\s\{\{nope\}\}-foo/.test(first));

  // test the first argument when passing a non-string
  log.info({});

  const [last] = spy.lastCall.args;
  t.truthy(rOutput.test(last));
});

test.serial('supports different prefixes per logger', (t) => {
  const log2 = new LogLevel({
    level: 'trace',
    name: 'test',
    prefix: { template: 'baz ' }
  });

  log.info('foo');
  log2.info('foo');

  const [first] = spy.firstCall.args;
  const [last] = spy.lastCall.args;

  t.is(spy.callCount, 2);
  t.not(first, last);
});
