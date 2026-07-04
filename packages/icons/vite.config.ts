import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
import * as packageJson from './package.json';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tsconfigPaths({ root: '../../' }),
    dts({
      rollupTypes: true,
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.app.json'
    }),
    svgr()
  ],
  build: {
    sourcemap: true,
    lib: {
      formats: ['es'],
      entry: resolve(__dirname, './src/index.ts'),
      fileName: (_, entryName) => {
        return `${entryName}.js`;
      },
      name: 'AdaraCloudUI',
    },
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      external: [...Object.keys(packageJson.dependencies), ...Object.keys(packageJson.peerDependencies), 'react/jsx-runtime'],
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
