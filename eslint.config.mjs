import { globalIgnores } from "eslint/config";

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

import storybook from 'eslint-plugin-storybook'
import reactHooks from 'eslint-plugin-react-hooks'
import components from './eslint/components.mjs'

export default tseslint.config([
  globalIgnores(['**/dist', 'storybook-static', 'coverage', 'apps/docs/.next', 'apps/docs/out', 'apps/docs/next-env.d.ts', 'apps/docs/generated']),
  storybook.configs['flat/recommended'],
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: { 'react-hooks': reactHooks },
    rules: {
      quotes: ['error', 'single'],
      'object-curly-spacing': ['error', 'always'],
      'jsx-quotes': ['error', 'prefer-single'],
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off'
    },
  },
  {
    files: ['packages/ui/src/**/*.ts', 'packages/ui/src/**/*.tsx'],
    plugins: { components },
    rules: {
      'components/boundaries': 'error',
      'components/cycles': 'error',
    },
  },
  {
    files: ['packages/widgets/src/**/*.ts'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [{ group: ['react', 'react/*', 'react-dom', 'react-dom/*'], message: 'Widgets stay framework-free.' }],
      }],
    },
  },
  {
    files: ['packages/core/src/**/*.ts', 'packages/widgets/src/**/*.ts'],
    ignores: ['packages/core/src/dom/**', '**/__tests__/**'],
    rules: {
      'no-restricted-globals': ['error', ...[
        'window', 'document', 'navigator', 'location', 'localStorage', 'sessionStorage',
        'getComputedStyle', 'matchMedia', 'requestAnimationFrame', 'cancelAnimationFrame',
        'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'queueMicrotask',
        'Node', 'Element', 'HTMLElement', 'Event', 'ResizeObserver', 'MutationObserver', 'IntersectionObserver',
      ].map((name) => ({ name, message: 'Pure code reaches the browser only through inputs and actions.' }))],
    },
  },
  {
    // Storybook CSF `render` functions use hooks but are not named like components
    files: ['**/*.stories.tsx', '**/*.stories.ts'],
    rules: {
      'react-hooks/rules-of-hooks': 'off',
    },
  }
]);