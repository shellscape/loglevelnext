import { describe, it, expect } from 'vitest';

import log from '../dist/index.js';
import { LogLevel } from '../dist/LogLevel.js';

const levels = Object.keys(log.levels)
  .map((key) => key.toLowerCase())
  .filter((key) => key !== 'silent');

// console.debug is aliased to console.log
levels.push('log');

describe('Methods', () => {
  it('exists', () => {
    expect(log).toBeTruthy();
    expect(log instanceof LogLevel).toBe(true);
  });

  it('has logging methods', () => {
    for (const level of levels) {
      expect(typeof log[level]).toBe('function');
    }
  });
});
