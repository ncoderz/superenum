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
    minify: 'terser',
    minifySyntax: true,
    minifyIdentifiers: true,
    minifyWhitespace: true,
    clean: false, // prevent removing CJS/ESM outputs
    shims: false,
    target: 'es6',

    // Enable Terser manually (tsup will detect this if installed)
    terserOptions: {
      compress: {
        passes: 1, // Number of times to run Terser
      },
      mangle: {
        properties: {
          // Use a regex to match internal-only properties
          // regex: /^_?([a-z])/i,
          regex: /^_/,
        },
      },
    },
  },
]);
