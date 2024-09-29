import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import arca from 'eslint-plugin-arca';
import json from 'eslint-plugin-json';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

// eslint-disable-next-line arca/no-default-export
export default [
  {
    ignores: ['**/.yarn', '**/node_modules', '**/dist', '**/docs', '**/coverage'],
  },
  ...compat.extends('eslint:recommended', 'plugin:prettier/recommended', 'prettier'),
  {
    plugins: {
      prettier,
      json,
      arca,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      ecmaVersion: 2021,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: false,
        },
      },
    },

    settings: {
      react: {
        version: '16',
      },
    },

    rules: {
      'no-unused-vars': [
        1,
        {
          vars: 'all',
          args: 'none',
        },
      ],

      'arca/import-ordering': [
        2,
        {
          hoistOneliners: true,
        },
      ],

      'arca/newline-after-import-section': [
        2,
        {
          enableOnelinerSections: true,
        },
      ],

      'arca/no-default-export': [2],
    },
  },
  ...compat.extends('plugin:@typescript-eslint/recommended').map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx'],
  })),
  {
    files: ['**/*.ts', '**/*.tsx'],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: ['tsconfig.eslint.json'],
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

      '@typescript-eslint/no-unused-expressions': 0,

      '@typescript-eslint/no-empty-object-type': [
        2,
        {
          allowInterfaces: 'always',
          // allowObjectTypes?: 'always' | 'never';
          // allowWithName?: string;
        },
      ],

      '@typescript-eslint/no-inferrable-types': [
        1,
        {
          ignoreParameters: true,
          ignoreProperties: true,
        },
      ],

      '@typescript-eslint/no-floating-promises': ['error'],
    },
  },
];
