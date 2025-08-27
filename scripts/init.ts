import { fileURLToPath } from 'node:url';

import fs from 'fs-extra';

import { createPackageInfo } from './create_package_info.ts';

// Get the root directory of the project
const rootDir = new URL('..', import.meta.url);
const srcDir = new URL('./src/_generated/', rootDir);

async function init() {
  console.log(`Root directory: ${rootDir}`);

  // Change to the root directory
  process.chdir(fileURLToPath(rootDir));

  // Create the _generated directory if it doesn't exist
  await fs.mkdir(srcDir, { recursive: true });

  // Create the package info file
  await createPackageInfo(rootDir, srcDir);
}

await init();
console.log('Init completed successfully.');
