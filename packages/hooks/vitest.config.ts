import { defineProject, mergeConfig } from 'vitest/config'
import { defaultClientConditions } from 'vite'
import { playwright } from '@vitest/browser-playwright'
import configShared from '../../vitest.shared'

export default mergeConfig(
  configShared,
  defineProject({
    resolve: { conditions: ['source', ...defaultClientConditions] },
    test: {
      browser: {
        enabled: true,
        headless: true,
        provider: playwright(),
        screenshotFailures: false,
        instances: [{ browser: 'chromium' }],
      },
    },
  })
)
