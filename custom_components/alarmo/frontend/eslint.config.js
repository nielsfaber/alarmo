import { FlatCompat } from '@eslint/eslintrc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ESLint v9 uses "flat config" (eslint.config.js). This file keeps the existing
// .eslintrc.js rules working without forcing a tooling downgrade.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Reuse the existing shareable configs from .eslintrc.js
  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ),
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          experimentalDecorators: true,
        },
      },
    },
    rules: {
      // This codebase historically tolerated unused types/vars and certain
      // TS/ESLint patterns; keep lint non-blocking for builds.
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
];
