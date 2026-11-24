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
    optimizeDeps: { include: ['react-dom/server', 'react-dom/client'] },
    test: {
      maxWorkers: 1,
      css: true,
      setupFiles: ['../tokens/src/index.css', './vitest.motion.css'],
      browser: {
        enabled: true,
        headless: true,
        provider: playwright({ contextOptions: { locale: 'en-US', timezoneId: 'UTC' } }),
        screenshotFailures: false,
        commands: {
          emulateReducedMotion: ({ page }, reducedMotion: 'reduce' | 'no-preference') => page.emulateMedia({ reducedMotion }),
          mouseClick: async ({ page, iframe }, selector: string) => {
            const box = await iframe.locator(selector).boundingBox()
            if (!box) return
            await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
          },
          mouseDrag: async ({ page, iframe }, selector: string, distance: number) => {
            const box = await iframe.locator(selector).boundingBox()
            if (!box) return
            const centerX = box.x + box.width / 2
            const centerY = box.y + box.height / 2
            await page.mouse.move(centerX, centerY)
            await page.mouse.down()
            await page.mouse.move(centerX, centerY + distance, { steps: 10 })
            await page.mouse.up()
          },
        },
        instances: [
          { browser: 'chromium' },
          { browser: 'firefox' },
          { browser: 'webkit' },
        ],
      },
    }
  })
)