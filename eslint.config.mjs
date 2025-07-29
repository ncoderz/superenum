import js from '@eslint/js';
import jsonPlugin from 'eslint-plugin-json';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: ['**/node_modules', '**/dist', '**/docs', '**/coverage', '**/*.d.ts'],
  },

  // Base JS rules
  js.configs.recommended,

  // Global config for both JS and TS
  {
    plugins: {
      prettier: prettierPlugin,
      json: jsonPlugin,
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'no-unused-vars': [
        1,
        {
          vars: 'all',
          args: 'none',
          caughtErrors: 'none',
        },
      ],
      'prettier/prettier': 'error',
    },
  },

  // TypeScript rules
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx'],
  })),

  // TS-specific overrides
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        1,
        {
          vars: 'all',
          args: 'none',
          caughtErrors: 'none',
        },
      ],
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-empty-object-type': [
        2,
        {
          allowInterfaces: 'always',
        },
      ],
      '@typescript-eslint/no-inferrable-types': [
        1,
        {
          ignoreParameters: true,
          ignoreProperties: true,
        },
      ],
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },
];
