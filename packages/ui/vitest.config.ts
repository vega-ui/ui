import { defineConfig, Plugin } from 'vitest/config'
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
  plugins: [
    tsconfigPaths({root: '../../'}) as unknown as Plugin,
    svgr() as unknown  as Plugin,
    react() as unknown  as Plugin
  ]
})