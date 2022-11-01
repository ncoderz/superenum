const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const terser = require('rollup-plugin-terser').terser;
const pkg = require('./package.json');

module.exports = [
  {
    // input: 'scripts/build/superenum-browser.js',
    input: 'dist/cjs/superenum.js',
    output: {
      name: 'superenum',
      file: pkg.browser,
      format: 'iife',
      exports: 'named',
      sourcemap: true,
    },
    plugins: [resolve(), commonjs(), terser()],
    // plugins: [resolve(), commonjs()],
  },
];
