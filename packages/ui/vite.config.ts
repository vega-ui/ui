import { defineConfig, Plugin } from 'vite'
import { resolve, join, basename } from 'path'
import { writeFile, copyFile } from 'fs'
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import preserveDirectives from 'rollup-preserve-directives'
import fg from 'fast-glob'
import { default as packageJson } from './package.json'

function createPackageJson(): Plugin {
  return {
    name: 'create-package-json',
    async generateBundle(outputOptions) {
      const output = outputOptions.dir

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { devDependencies, scripts, files, ...outputPackageJson } = packageJson

      if (!output) return

      try {
        writeFile(join(output, 'package.json'), JSON.stringify(outputPackageJson, null, 2), () => undefined)
      } catch (e) {
        console.error(e)
      }
    }
  }
}

function copyExternal(filePaths: string[]): Plugin {
  return {
    name: 'copy-external',
    async generateBundle(outputOptions) {
      const output = outputOptions.dir

      if (!output) return

      try {
        filePaths.forEach((path) => {
          const resolvedPath = resolve(__dirname, path)

          copyFile(resolvedPath, join(output, basename(path)), () => undefined)
        })
      } catch (e) {
        console.error(e)
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.app.json',
      exclude: ['**/*/**.stories.(tsx|ts)', '**/*/__tests__/']
    }),
    svgr({
      svgrOptions: {
        ref: true,
      }
    })
  ],
  resolve: {
    preserveSymlinks: true
  },
  build: {
    sourcemap: true,
    lib: {
      formats: ['es'],
      entry: [resolve(__dirname, './src/index.ts'), ...fg.globSync('./src/**/*/index.ts')],
      fileName: (_, entryName) => {
        const path = `${entryName}.js`
        return path.startsWith('src') ? path.replace('src/', '') : path;
      },
      cssFileName: 'index',
      name: 'AdaraCloudUI',
    },
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', '@floating-ui/react', 'react-remove-scroll', '@adara-cs/utils', '@adara-cs/hooks', '@adara-cs/types'],
      plugins: [
        createPackageJson(),
        preserveDirectives(),
        copyExternal(['README.md', 'LICENSE']),
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
