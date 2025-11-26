import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths';
import * as packageJson from './package.json';

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
      entry: resolve(__dirname, './src/index.ts'),
      fileName: (_, entryName) => {
        return `${entryName}.js`;
      },
      name: 'VegaUI',
    },
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      external: [...Object.keys(packageJson.dependencies), 'react/jsx-runtime'],
      output: {
        preserveModules: true,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime'
        },
      },
    },
  },
})
