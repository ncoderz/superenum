import { describe } from 'vitest';

import { Enum } from '../dist';
import { superenumTests } from './superenum-test';

describe('NodeJS ESM build', () => {
  superenumTests(Enum);
});
