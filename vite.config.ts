import { defineConfig } from 'vite'
import { resolve } from 'path'
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
      tsconfigPath: './tsconfig.app.json'
    }),
    libInjectCss(),
    svgr()
  ],
  assetsInclude: ['**/*.woff2', '**/*.ttf'],
  build: {
    sourcemap: true,
    lib: {
      formats: ['es', 'umd'],
      entry: resolve(__dirname, 'src/'),
      name: 'AdaraCloudUI',
      fileName: (format) => `index.${format}.js`,
    },
    commonjsOptions: {
      sourceMap: false
    },
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
  },
})
