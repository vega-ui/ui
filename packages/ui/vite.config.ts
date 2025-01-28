import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import preserveDirectives from 'rollup-preserve-directives'
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'node:path';
import { globSync } from 'node:fs';
import * as packageJson from './package.json';

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tsconfigPaths({ root: '../../' }),
    dts({
      insertTypesEntry: true,
      tsconfigPath: resolve(__dirname, 'tsconfig.app.json'),
      exclude: ['**/*/**.stories.(tsx|ts)', '**/*/__tests__/'],
    }),
    svgr({
      svgrOptions: {
        ref: true,
      }
    })
  ],
  build: {
    sourcemap: true,
    lib: {
      formats: ['es'],
      entry: [resolve(__dirname, 'src/index.ts'), ...globSync('src/**/*/index.ts')],
      fileName: (_, entryName) => {
        const path = `${entryName}.js`
        return path.startsWith('src') ? path.replace('src/', '') : path;
      },
      cssFileName: 'index',
      name: 'AdaraCloudUI',
    },
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      external: [...Object.keys(packageJson.dependencies), 'react/jsx-runtime', 'libphonenumber-js/min/metadata'],
      plugins: [
        preserveDirectives()
      ],
      output: {
        preserveModules: true,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
  },
})
