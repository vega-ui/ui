import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

import storybook from 'eslint-plugin-storybook'
import reactHooks from 'eslint-plugin-react-hooks'

export default tseslint.config([
    ...storybook.configs['flat/recommended'],
    {
      files: ['**/*.ts', '**/*.tsx'],
      ignores: ['!.storybook'],
      extends: [
        eslint.configs.recommended,
        tseslint.configs.recommended,
      ],
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