import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    tsconfigPaths({ root: '../../' }),
    dts({
      insertTypesEntry: true,
      tsconfigPath: resolve(__dirname, 'tsconfig.app.json'),
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      formats: ['es'],
      entry: { index: resolve(__dirname, './src/index.ts'), test: resolve(__dirname, './src/test/index.ts') },
      fileName: (_, entryName) => {
        return `${entryName}.js`;
      },
      name: 'VegaUI',
    },
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      output: {
        preserveModules: true,
      },
    },
  },
})
