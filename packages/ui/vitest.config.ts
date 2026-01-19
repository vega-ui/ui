import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tsconfigPaths({ root: '../../' }),
    svgr(),
    react()
  ],
  test: {
    maxWorkers: 1,
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      screenshotFailures: false,
      instances: [
        { browser: 'chromium' },
        { browser: 'firefox' },
        { browser: 'webkit' },
      ],
    },
  }
})