import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      rollupTypes: true,
      tsconfigPath: './tsconfig.app.json'
    }),
  ],
  build: {
    copyPublicDir: false,
    sourcemap: true,
    lib: {
      formats: ['es', 'umd'],
      entry: resolve(__dirname, 'src/components/index.ts'),
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
