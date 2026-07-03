import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

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
      output: {
        preserveModules: true,
      },
    },
  },
})
