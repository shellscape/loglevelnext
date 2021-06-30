/*
  Copyright © 2021 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/

import { LogLevel } from './LogLevel';

interface BindTarget {
  [key: string]: Function;
}

export interface FactoryLevels extends Record<Uppercase<string>, number> {
  SILENT: number;
}

export interface Factory {
  [key: string]: any;
  bindMethod: (obj: BindTarget, methodName: string) => any;
  distillLevel: (level: number | string) => any;

  levelValid: (level: number | string) => boolean;
  levels: FactoryLevels;
  logger: LogLevel;
  make: (methodName: string) => Function;
  methods?: string[];

  replaceMethods: (logLevel: number | string) => void;
}

const noop = () => {};
const levels = Symbol('log-levels');
const instance = Symbol('log-instance');

/* eslint-disable sort-keys */
export const MethodFactoryLevels: FactoryLevels = {
  TRACE: 0,
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  SILENT: 5
};
/* eslint-enable sort-keys */

export class MethodFactory implements Factory {
  constructor(logger?: LogLevel) {
    (this as any)[instance] = logger;
    (this as any)[levels] = MethodFactoryLevels;
  }

  get levels(): typeof MethodFactoryLevels {
    return (this as any)[levels];
  }

  get logger(): LogLevel {
    return (this as any)[instance];
  }

  set logger(logger: LogLevel) {
    (this as any)[instance] = logger;
  }

  get methods() {
    return Object.keys(this.levels)
      .map((key) => key.toLowerCase())
      .filter((key) => key !== 'silent');
  }

  // eslint-disable-next-line class-methods-use-this
  bindMethod(obj: BindTarget, methodName: string) {
    const method = obj[methodName];
    if (typeof method.bind === 'function') {
      return method.bind(obj);
    }

    try {
      return Function.prototype.bind.call(method, obj);
    } catch (e) {
      // Missing bind shim or IE8 + Modernizr, fallback to wrapping
      return function result() {
        // eslint-disable-next-line prefer-rest-params
        return Function.prototype.apply.apply(method, [obj, arguments]);
      };
    }
  }

  distillLevel(level: number | string) {
    let result = level;

    if (typeof result === 'string' && typeof this.levels[result.toUpperCase()] !== 'undefined') {
      result = this.levels[result.toUpperCase()];
    }

    if (this.levelValid(result)) {
      return result;
    }

    return null;
  }

  levelValid(level: number | string) {
    if (typeof level === 'number' && level >= 0 && level <= this.levels.SILENT) {
      return true;
    }

    return false;
  }

  /**
   * Build the best logging method possible for this env
   * Wherever possible we want to bind, not wrap, to preserve stack traces.
   * Since we're targeting modern browsers, there's no need to wait for the
   * console to become available.
   */
  // eslint-disable-next-line class-methods-use-this
  make(methodName: string): Function {
    /* eslint-disable no-console */
    const target = console as unknown as BindTarget;
    if (typeof target[methodName] !== 'undefined') {
      return this.bindMethod(target, methodName);
    } else if (typeof console.log !== 'undefined') {
      return this.bindMethod(target, 'log');
    }

    /* eslint-enable no-console */
    return noop;
  }

  replaceMethods(logLevel: number | string) {
    const level = this.distillLevel(logLevel);

    if (level === null) {
      throw new Error(`loglevelnext: replaceMethods() called with invalid level: ${logLevel}`);
    }

    if (!this.logger || this.logger.type !== 'LogLevel') {
      throw new TypeError(
        'loglevelnext: Logger is undefined or invalid. Please specify a valid Logger instance.'
      );
    }

    this.methods.forEach((methodName) => {
      const { [methodName.toUpperCase()]: methodLevel } = this.levels;

      this.logger[methodName] = methodLevel < level ? noop : this.make(methodName);
    });

    // Define log.log as an alias for log.debug
    this.logger.log = this.logger.debug;
  }
}
