'use strict';

/* global window: true */

const LogLevel = require('./lib/LogLevel');

const defaultLogger = new LogLevel({ name: 'default' });
const cache = { default: defaultLogger };

// Grab the current global log variable in case of overwrite
const existing = (typeof window !== 'undefined') ? window.log : null;

module.exports = Object.assign(defaultLogger, {

  get loggers() {
    return cache;
  },

  getLogger: function getLogger(name, factory) {
    if (typeof name !== 'string' || !name || !name.length) {
      throw new TypeError('You must supply a name when creating a logger.');
    }

    let logger = cache[name];
    if (!logger) {
      logger = new LogLevel({
        name,
        level: defaultLogger.level,
        // do not inherit the MethodFactory
        factory
      });
      cache[name] = logger;
    }
    return logger;
  },

  noConflict: function noConflict() {
    if (typeof window !== 'undefined' && window.log === defaultLogger) {
      window.log = existing;
    }

    return defaultLogger;
  }
});
