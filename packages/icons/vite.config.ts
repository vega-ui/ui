import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';

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
      entry: resolve(__dirname, './src/index.ts'),
      fileName: (_, entryName) => {
        return `${entryName}.js`;
      },
      name: 'AdaraCloudUI',
    },
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', '@floating-ui/react', 'react-remove-scroll', '@adara-cs/utils', '@adara-cs/hooks', '@adara-cs/types'],
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
