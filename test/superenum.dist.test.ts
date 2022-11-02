/* eslint-disable @typescript-eslint/no-var-requires */
const { superenum } = require('../dist/browser/superenum.min');

import { superenumTests } from './superenum-test';

// Run tests on dist (TS compiled, rollup bundled and minified file)
superenumTests(superenum);
