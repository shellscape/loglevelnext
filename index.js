/*
  Copyright © 2018 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/

const LogLevel = require('./lib/LogLevel');
const MethodFactory = require('./lib/MethodFactory');
const PrefixFactory = require('./factory/PrefixFactory');

const defaultLogger = new LogLevel({ name: 'default' });
const cache = { default: defaultLogger };

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

  getLogger(opts) {
    let options;

    if (typeof opts === 'string') {
      options = { name: opts };
    } else {
      options = Object.assign({}, opts);
    }

    if (!options.id) {
      options.id = options.name;
    }

    const { name, id } = options;
    const defaults = { level: defaultLogger.level };

    if (typeof name !== 'string' || !name || !name.length) {
      throw new TypeError('You must supply a name when creating a logger.');
    }

    let logger = cache[id];
    if (!logger) {
      logger = new LogLevel(Object.assign({}, defaults, options));
      cache[id] = logger;
    }
    return logger;
  }
});

// TypeScript fix
module.exports.default = module.exports;
