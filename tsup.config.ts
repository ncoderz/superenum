import { defineConfig } from 'tsup';

export default defineConfig([
  // Node builds (CJS + ESM)
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    target: 'es2020',
    outDir: 'dist',
    dts: true,
    sourcemap: true,
    clean: true,
    minify: false,
    splitting: false,
  },
  // Browser build (IIFE + minified)
  {
    entry: { superenum: 'src/index.ts' },
    format: 'iife',
    globalName: 'superenum', // Replace with your desired global
    outDir: 'dist/browser',
    sourcemap: true,
    minify: true,
    clean: false, // prevent removing CJS/ESM outputs
    shims: true, // Include shims for browser compatibility
    target: 'es6',
  },
]);
