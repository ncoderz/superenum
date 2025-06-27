import { superenum } from '../dist';
import { superenumTests } from './superenum-test';

describe('NodeJS ESM build', () => {
  superenumTests(superenum);
});
