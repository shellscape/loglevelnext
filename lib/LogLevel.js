'use strict';

/* global window: true */

const MethodFactory = require('./MethodFactory');

const { warn } = console; // eslint-disable-line no-console
const defaults = {
  factory: null,
  level: 'warn',
  name: +new Date(),
  persist: false
};

module.exports = class LogLevel {
  constructor(options) {
    this.options = Object.assign({}, defaults, options);
    this.options.storageKey = `loglevel-${this.options.name}`;
    this.methodFactory = options.factory || new MethodFactory(this);

    if (!this.methodFactory.logger) {
      this.methodFactory.logger = this;
    }

    // implement for some _very_ loose type checking. avoids getting into a
    // circular require between MethodFactory and LogLevel
    this.type = 'LogLevel';
    this.level = this.options.level;
  }

  get factory() {
    return this.methodFactory;
  }

  set factory(factory) {
    this.methodFactory = factory;
  }

  disable(persist) {
    this.options.persist = persist;
    this.level = this.levels.SILENT;
  }

  disableAll(...args) {
    warn('loglevelnext: `disableAll` is deprecated in favor of `disable`');
    this.disable(...args);
  }

  enable(persist) {
    this.options.persist = persist;
    this.level = this.levels.TRACE;
  }

  enableAll(...args) {
    warn('loglevelnext: `enableAll` is deprecated in favor of `enable`');
    this.enable(...args);
  }

  get level() {
    return this.currentLevel;
  }

  set level(logLevel) {
    const level = this.methodFactory.distillLevel(logLevel);

    if (level == null) {
      throw new Error(`loglevelnext: setLevel() called with invalid level: ${logLevel}`);
    }

    this.currentLevel = level;
    this.methodFactory.replaceMethods(level);

    if (typeof console === 'undefined' && level < this.levels.SILENT) {
      // eslint-disable-next-line no-console
      console.warn('loglevelnext: console is undefined. The log will produce no output.');
    }
  }

  get levels() { // eslint-disable-line class-methods-use-this
    return this.methodFactory.levels;
  }
};
