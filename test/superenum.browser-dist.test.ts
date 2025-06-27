import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';

import { type Superenum } from '../src';
import { superenumTests } from './superenum-test';

describe('Browser IIFE build', () => {
  const code = readFileSync('./dist/browser/superenum.global.js', 'utf8');
  const context = {};

  const script = new Script(code);
  script.runInNewContext(context);
  const { superenum } = context as {
    superenum: {
      superenum: Superenum;
    };
  };

  it('attaches superenum to window', () => {
    expect(superenum).toBeDefined();
    expect(typeof superenum.superenum).toBe('function');
  });

  // Run tests on dist (TS compiled, rollup bundled and minified file)
  superenumTests(superenum.superenum);
});
