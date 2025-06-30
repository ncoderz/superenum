import { createRequire } from 'node:module';
const nodeRequire = createRequire(import.meta.url);
const Enum = nodeRequire('../dist/index.cjs').Enum;

import { describe } from 'vitest';

import { superenumTests } from './superenum-test';

describe('NodeJS CommonJS build', () => {
  superenumTests(Enum);
});
