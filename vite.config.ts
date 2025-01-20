import { defineConfig } from 'vite'
import { resolve } from 'path'
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import preserveDirectives from 'rollup-preserve-directives'
import fg from 'fast-glob'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.app.json',
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
      entry: [resolve(__dirname, 'src/index.ts'), ...fg.sync('src/**/*/index.ts')],
      fileName: (_, entryName) => {
        const path = `${entryName}.js`
        return path.startsWith('src') ? path.replace('src/', '') : path;
      },
      cssFileName: 'index',
      name: 'AdaraCloudUI',
    },
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', '@floating-ui/react', 'react-remove-scroll'],
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
