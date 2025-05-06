import type { StorybookConfig } from '@storybook/react-vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr'

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../packages/**/*.mdx', '../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
    '@storybook/addon-designs'
  ],
  framework: {
    name: '@storybook/react-vite', 
    options: {
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
  }
};
export default config;
