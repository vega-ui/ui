import { defineConfig } from 'vitest/config'
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
  plugins: [
    // @ts-expect-error: ignore plugin lint
    svgr(),
    // @ts-expect-error: ignore plugin lint
    react()
  ]
})