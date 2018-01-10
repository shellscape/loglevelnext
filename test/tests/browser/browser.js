'use strict';

/* global assert: true, sinon: true, window: true */

describe('Browser', () => {
  const sandbox = sinon.sandbox.create();
  let logger;

  before(() => {
    sandbox.spy(console, 'info');
  });

  afterEach(() => {
    console.info.resetHistory();
  });

  after(() => {
    sandbox.restore();
  });

  it('handles window.log conflict', () => {
    logger = window.log.noConflict();
    window.logger = logger;

    logger.level = 'trace';

    assert.equal(logger.name, 'default');
    assert.equal(logger.level, 0);
  });

  it('logs info', () => {
    logger.info('foo');

    const [first] = console.info.firstCall.args;

    assert.equal(console.info.callCount, 1);
    assert.equal(first, 'foo');
  });

  it('prefixes output', () => {
    const log = logger.getLogger({
      name: 'prefixLog',
      prefix: {}
    });

    assert.equal(log.name, 'prefixLog');

    log.info('foo');


    const [first] = console.info.firstCall.args;

    assert.equal(console.info.callCount, 1);
    assert(/\d{2}:\d{2}:\d{2}\s\[info\]\sfoo/.test(first));
  });

  it('doesn\'t log info', () => {
    logger.level = 'warn';

    logger.info('foo');
    assert.equal(console.info.callCount, 0);
  });
});
