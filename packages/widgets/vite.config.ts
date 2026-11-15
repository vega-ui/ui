import { defineConfig } from 'vite'
import { readdirSync } from 'fs'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths';

const entries = Object.fromEntries(
  readdirSync(resolve(__dirname, 'src'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => [`${entry.name}/index`, resolve(__dirname, 'src', entry.name, 'index.ts')]),
)

export default defineConfig({
  base: '/',
  plugins: [
    tsconfigPaths({ root: '../../' }),
    dts({
      entryRoot: resolve(__dirname, 'src'),
      tsconfigPath: resolve(__dirname, 'tsconfig.app.json'),
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      formats: ['es'],
      entry: entries,
      fileName: (_, entryName) => `${entryName}.js`,
    },
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      external: [/^@vega-ui\//],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
  },
})
