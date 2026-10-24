import { defineProject, mergeConfig } from 'vitest/config'
import { defaultClientConditions } from 'vite'
import { playwright } from '@vitest/browser-playwright';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react'
import configShared from '../../vitest.shared'

export default mergeConfig(
  configShared,
  defineProject({
    plugins: [svgr(), react()],
    resolve: { conditions: ['source', ...defaultClientConditions] },
    test: {
      maxWorkers: 1,
      browser: {
        enabled: true,
        headless: true,
        provider: playwright({ contextOptions: { locale: 'en-US', timezoneId: 'UTC' } }),
        screenshotFailures: false,
        instances: [
          { browser: 'chromium' },
          { browser: 'firefox' },
          { browser: 'webkit' },
        ],
      },
    }
  })
)