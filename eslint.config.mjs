import { globalIgnores } from "eslint/config";

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

import storybook from 'eslint-plugin-storybook'
import reactHooks from 'eslint-plugin-react-hooks'

export default tseslint.config([
  globalIgnores(['packages/**/dist']),
  storybook.configs['flat/recommended'],
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['!.storybook'],
    plugins: { 'react-hooks': reactHooks },
    rules: {
      quotes: ['error', 'single'],
      'jsx-quotes': ['error', 'prefer-single'],
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off'
    },
  }
]);