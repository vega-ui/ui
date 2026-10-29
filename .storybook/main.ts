// This file has been automatically migrated to valid ESM format by Storybook.
import { execFileSync } from 'node:child_process';
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
    getAbsolutePath('@storybook/addon-themes'),
    getAbsolutePath('@storybook/addon-designs'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-a11y'),
  ],
  features: {
    sidebarOnboardingChecklist: false,
  },
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  experimental_indexers: (indexers = []) => {
    const unreleased = getUnreleasedComponents();

    return indexers.map((indexer) => ({
      ...indexer,
      createIndex: async (fileName, options) => {
        const entries = await indexer.createIndex(fileName, options);
        const component = fileName.match(/packages\/ui\/src\/([^/]+)\//)?.[1];
        if (!component || !unreleased.has(component)) return entries;

        return entries.map((entry) => ({ ...entry, tags: [...(entry.tags ?? []), 'unreleased'] }));
      },
    }));
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
      }),
    ]
    if (config.build) config.build.sourcemap = false;
    return config;
  },
};
export default config;

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}

function getUnreleasedComponents(): Set<string> {
  try {
    const tag = execFileSync('git', ['describe', '--tags', '--abbrev=0', '--match', '@vega-ui/react@*'], { encoding: 'utf8' }).trim();
    const files = execFileSync('git', ['diff', '--name-only', tag, '--', 'packages/ui/src'], { encoding: 'utf8' }).split('\n');
    const sources = files.filter((file) => file && !/\.stories\.tsx$|\/__tests__\/|\.mdx?$/.test(file));

    return new Set(sources.map((file) => file.split('/')[3]));
  } catch {
    return new Set();
  }
}
