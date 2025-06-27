import { createRequire } from 'node:module';
const nodeRequire = createRequire(import.meta.url);
const superenum = nodeRequire('../dist/index.cjs').superenum;

import { superenumTests } from './superenum-test';

describe('NodeJS CommonJS build', () => {
  superenumTests(superenum);
});
