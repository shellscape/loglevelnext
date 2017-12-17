'use strict';

/* global window: true */
const LogLevel = require('./lib/LogLevel');
const MethodFactory = require('./lib/MethodFactory');
const PrefixFactory = require('./factory/PrefixFactory');

const defaultLogger = new LogLevel({ name: 'default' });
const cache = { default: defaultLogger };

// Grab the current global log variable in case of overwrite
const existing = (typeof window !== 'undefined') ? window.log : null;

module.exports = Object.assign(defaultLogger, {

  get factories() {
    return {
      MethodFactory,
      PrefixFactory
    };
  },

  get loggers() {
    return cache;
  },

  getLogger(options) {
    if (typeof options === 'string') {
      options = { name: options };
    }

    const { name } = options;
    const defaults = { level: defaultLogger.level };

    if (typeof name !== 'string' || !name || !name.length) {
      throw new TypeError('You must supply a name when creating a logger.');
    }

    let logger = cache[name];
    if (!logger) {
      logger = new LogLevel(Object.assign({}, defaults, options));
      cache[name] = logger;
    }
    return logger;
  },

  noConflict() {
    if (typeof window !== 'undefined' && window.log === defaultLogger) {
      window.log = existing;
    }

    return defaultLogger;
  }
});
