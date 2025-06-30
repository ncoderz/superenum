import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';

import { describe, expect, test } from 'vitest';

import { type EnumFunc } from '../src';
import { superenumTests } from './superenum-test';

describe('Browser IIFE build', () => {
  const code = readFileSync('./dist/browser/superenum.global.js', 'utf8');
  const context = {};

  const script = new Script(code);
  script.runInNewContext(context);
  const { superenum } = context as {
    superenum: {
      Enum: EnumFunc;
    };
  };

  test('attaches superenum to window', () => {
    expect(superenum).toBeDefined();
    expect(typeof superenum.Enum).toBe('function');
  });

  // Run tests on dist (TS compiled, rollup bundled and minified file)
  superenumTests(superenum.Enum);
});
