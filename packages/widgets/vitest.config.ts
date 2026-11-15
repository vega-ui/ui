import { defineConfig, mergeConfig } from 'vitest/config'
import { defaultServerConditions } from 'vite'
import configShared from '../../vitest.shared'

export default mergeConfig(
  configShared,
  defineConfig({
    ssr: { resolve: { conditions: ['source', ...defaultServerConditions] } },
    test: {
      include: ['src/**/*.test.ts'],
      environment: 'node',
    },
  })
)
