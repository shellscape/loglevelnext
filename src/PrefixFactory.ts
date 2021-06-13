/*
  Copyright © 2021 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/

import { LogLevel } from './LogLevel';
import { MethodFactory } from './MethodFactory';

export interface PrefixTemplateOptions {
  level: string;
  logger: LogLevel;
}

export type PrefixTemplateFn = (options: PrefixTemplateOptions) => string;

export interface PrefixFactoryOptions {
  [key: string]: PrefixTemplateFn | string | undefined;
  level?: PrefixTemplateFn;
  name?: PrefixTemplateFn;
  template?: string;
  time?: PrefixTemplateFn;
}

const defaults: PrefixFactoryOptions = {
  level: (opts) => `[${opts.level}]`,
  name: (opts) => opts.logger.name,
  template: '{{time}} {{level}} ',
  time: () => new Date().toTimeString().split(' ')[0]
};

export class PrefixFactory extends MethodFactory {
  private options: PrefixFactoryOptions;

  constructor(logger: LogLevel, options: PrefixFactoryOptions) {
    super(logger);
    this.options = Object.assign({}, defaults, options);
  }

  interpolate(level: string) {
    return this.options.template!.replace(/{{([^{}]*)}}/g, (stache: string, prop: string) => {
      const fn = this.options[prop];

      if (typeof fn === 'function') {
        return fn({ level, logger: this.logger });
      }

      return stache;
    });
  }

  make(methodName: string) {
    const og = super.make(methodName);

    return (...args: any[]) => {
      const output = this.interpolate(methodName);
      const [first] = args;

      if (typeof first === 'string') {
        // eslint-disable-next-line no-param-reassign
        args[0] = output + first;
      } else {
        args.unshift(output);
      }

      og(...args);
    };
  }
}
