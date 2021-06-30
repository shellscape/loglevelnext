/*
  Copyright © 2021 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/

import { LogLevel, LogLevelOptions } from './LogLevel';
import { MethodFactory } from './MethodFactory';
import { PrefixFactory } from './PrefixFactory';

export * from './LogLevel';
export * from './MethodFactory';
export * from './PrefixFactory';

const factories = Symbol('log-factories');

class DefaultLogger extends LogLevel {
  private cache: Record<string, LogLevel>;

  constructor() {
    super({ name: 'default' });

    this.cache = { default: this };
    // TS can't handle symbols as index types
    this[factories as any] = { MethodFactory, PrefixFactory };
  }

  get factories() {
    return this[factories as any];
  }

  get loggers() {
    return this.cache;
  }

  create(opts: LogLevelOptions | string) {
    let options: LogLevelOptions;

    if (typeof opts === 'string') {
      options = { name: opts };
    } else {
      options = Object.assign({}, opts);
    }

    if (!options.id) {
      options.id = options.name!.toString();
    }

    const { name, id } = options;
    const defaults = { level: this.level };

    if (typeof name !== 'string' || !name || !name.length) {
      throw new TypeError('You must supply a name when creating a logger.');
    }

    let logger = this.cache[id];
    if (!logger) {
      logger = new LogLevel(Object.assign({}, defaults, options));
      this.cache[id] = logger;
    }
    return logger;
  }
}

// eslint-disable-next-line import/no-default-export
export default new DefaultLogger();
