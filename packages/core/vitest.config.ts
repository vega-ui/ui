import { defineConfig, mergeConfig } from 'vitest/config'
import { defaultClientConditions } from 'vite'
import { playwright } from '@vitest/browser-playwright'
import configShared from '../../vitest.shared'

export default mergeConfig(
  configShared,
  defineConfig({
    resolve: { conditions: ['source', ...defaultClientConditions] },
    test: {
      projects: [
        {
          extends: true,
          test: {
            name: 'node',
            include: ['src/**/*.test.ts'],
            exclude: ['src/**/*.browser.test.ts'],
            environment: 'node',
          },
        },
        {
          extends: true,
          test: {
            name: 'browser',
            include: ['src/**/*.browser.test.ts'],
            browser: {
              enabled: true,
              headless: true,
              provider: playwright(),
              screenshotFailures: false,
              instances: [{ browser: 'chromium', name: 'chromium' }, { browser: 'firefox', name: 'firefox' }, { browser: 'webkit', name: 'webkit' }],
            },
          },
        },
      ],
    },
  })
)
