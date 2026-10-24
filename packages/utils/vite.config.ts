/// <reference types="vitest/config" />
import { defaultServerConditions, defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import * as packageJson from './package.json'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    dts({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.app.json',
    })
  ],
  build: {
    sourcemap: true,
    lib: {
      formats: ['es'],
      entry: resolve(__dirname, './src/index.ts'),
      fileName: (_, entryName) => {
        return `${entryName}.js`
      }
    },
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      external: Object.keys(packageJson.dependencies),
      output: {
        preserveModules: true,
      },
    },
  },
  ssr: {
    resolve: { conditions: ['source', ...defaultServerConditions] },
  },
  test: {
    env: { LANG: 'en_US.UTF-8', TZ: 'UTC' },
  },
})
