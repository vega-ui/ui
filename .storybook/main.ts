import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import type { StorybookConfig } from '@storybook/react-vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr'

// @ts-expect-error: ignore
const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../packages/**/*.mdx', '../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-themes'),
    getAbsolutePath('@storybook/addon-designs'),
    getAbsolutePath('@storybook/addon-docs')
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      savePropValueAsString: true,
      shouldRemoveUndefinedFromOptional: true,
    },
  },
  async viteFinal(config) {
    config.plugins = [
      ...(config.plugins ?? []),
      tsconfigPaths({ root: '../' }),
      svgr({
        svgrOptions: {
          ref: true,
        }
      })
    ]
    if (config.build) config.build.sourcemap = false;
    return config;
  },
};
export default config;

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}
