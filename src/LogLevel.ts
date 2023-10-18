/*
  Copyright © 2021 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/

import { defaultLevels, Factory, MethodFactory, type FactoryLevels } from './MethodFactory';
import { PrefixFactory, PrefixFactoryOptions } from './PrefixFactory';

type SomeLevel = number | string;

export interface LogLevelIndex {
  [key: string]: any;
}

export interface LogLevelOptions {
  factory?: Factory;
  id?: string;
  level?: number | string;
  name?: string;
  prefix?: PrefixFactoryOptions;
}

const defaults: LogLevelOptions = {
  factory: void 0,
  level: 'warn',
  name: (+new Date()).toString(),
  prefix: void 0
};

export class LogLevel<TLevels extends FactoryLevels = typeof defaultLevels>
  implements LogLevelIndex
{
  [key: string]: any;
  public name: string;

  public type: string;
  private currentLevel!: TLevels[keyof TLevels];
  private methodFactory: Factory | undefined;
  private options: LogLevelOptions;

  constructor(options: LogLevelOptions) {
    // implement for some _very_ loose type checking. avoids getting into a
    // circular require between MethodFactory and LogLevel
    this.type = 'LogLevel';
    this.options = Object.assign({}, defaults, options);
    this.methodFactory = options.factory;

    if (!(this as any).methodFactory) {
      const factory = options.prefix
        ? new PrefixFactory(this as any, options.prefix)
        : new MethodFactory(this as any);
      this.methodFactory = factory as any;
    }

    if (!this.methodFactory!.logger) {
      this.methodFactory!.logger = this as any;
    }

    this.name = options.name || '<unknown>';

    // this.level is a setter, do this after setting up the factory
    this.level = this.options.level ?? 'trace';
  }

  get level(): TLevels[keyof TLevels] {
    return this.currentLevel;
  }

  get levels(): TLevels {
    // eslint-disable-line class-methods-use-this
    return this.methodFactory!.levels as unknown as TLevels;
  }

  get factory() {
    return this.methodFactory as Factory<TLevels>;
  }

  set factory(factory) {
    // eslint-disable-next-line no-param-reassign
    factory.logger = this as any;
    this.methodFactory = factory;
    this.methodFactory.replaceMethods(this.level as number);
  }

  set level(logLevel: SomeLevel) {
    const level = this.methodFactory!.distillLevel(logLevel);

    if (level === false || level == null) {
      throw new RangeError(`loglevelnext: setLevel() called with invalid level: ${logLevel}`);
    }

    this.currentLevel = level;
    this.methodFactory!.replaceMethods(level);

    const max = Math.max(...Object.values<number>(this.levels));

    if (typeof console === 'undefined') {
      process.stdout.write('loglevelnext: console is undefined. The log will produce no output.\n');
    } else if (level > max) {
      // eslint-disable-next-line no-console
      console.warn(
        `The log level has been set to a value greater than 'silent'. The log will produce no output.`
      );
    }
  }

  disable() {
    const levels = this.levels;
    if (levels.SILENT) {
      this.level = levels.SILENT;
    } else {
      // eslint-disable-next-line no-console
      console.warn(
        `loglevelnext: no 'silent' level defined. The log cannot be disabled. You may want to override the 'disable' method.`
      );
    }
  }

  enable() {
    const levels = this.levels;
    if (typeof levels.TRACE !== 'undefined') {
      this.level = levels.TRACE;
    } else {
      // eslint-disable-next-line no-console
      console.warn(
        `loglevelnext: no 'trace' level defined. The log cannot be enabled. You may want to override the 'trace' method.`
      );
    }
  }
}
