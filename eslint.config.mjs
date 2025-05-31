// @ts-check
import eslint from '@eslint/js';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: ['eslint.config.mjs'],
  },
  {
    languageOptions: {
      sourceType: 'commonjs',
    },
    rules: {} // Nenhuma regra ativa
  },
];
