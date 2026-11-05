import fs from 'node:fs';
import path from 'node:path';

const examplesDir = path.join(process.cwd(), '../../docs/examples');
const packagesDir = path.join(process.cwd(), '../../packages');
const output = path.join(process.cwd(), 'generated/examples.ts');

const PUBLISHED = ['react', '@vega-ui/react', '@vega-ui/icons', '@vega-ui/utils'];

const readPackage = (file: string) => JSON.parse(fs.readFileSync(file, 'utf8'));
const ui = readPackage(path.join(packagesDir, 'ui/package.json'));
const icons = readPackage(path.join(packagesDir, 'icons/package.json'));
const utils = readPackage(path.join(packagesDir, 'utils/package.json'));
const theme = readPackage(path.join(packagesDir, 'theme/package.json'));
const docs = readPackage(path.join(process.cwd(), 'package.json'));

const sandboxPackage = {
  dependencies: {
    '@vega-ui/icons': `^${icons.version}`,
    '@vega-ui/react': `^${ui.version}`,
    '@vega-ui/theme-core': `^${theme.version}`,
    '@vega-ui/utils': `^${utils.version}`,
    'react': ui.peerDependencies.react,
    'react-dom': ui.peerDependencies['react-dom'],
  },
  devDependencies: {
    '@types/react': docs.devDependencies['@types/react'],
    '@types/react-dom': docs.devDependencies['@types/react-dom'],
    '@vitejs/plugin-react': icons.devDependencies['@vitejs/plugin-react'],
    'typescript': docs.devDependencies.typescript,
    'vite': icons.devDependencies.vite,
  },
};

const entries = fs.readdirSync(examplesDir, { recursive: true, encoding: 'utf8' })
  .filter((file) => file.endsWith('.tsx'))
  .filter((file) => /^export default /m.test(fs.readFileSync(path.join(examplesDir, file), 'utf8')))
  .sort();

const getStyles = (entry: string, source: string) => {
  const specifiers = [...source.matchAll(/^import (?:[^;]*? from )?'([^']+)';$/gm)].map((match) => match[1]);
  const styles: Record<string, string> = {};

  for (const specifier of specifiers) {
    if (PUBLISHED.includes(specifier)) continue;
    if (!/^\.\/[\w-]+\.css$/.test(specifier)) return undefined;

    styles[specifier.slice(2)] = fs.readFileSync(path.join(examplesDir, path.dirname(entry), specifier), 'utf8');
  }

  return styles;
};

const getMeta = (entry: string) => {
  const source = fs.readFileSync(path.join(examplesDir, entry), 'utf8');
  const locales = source.match(/^export const locales = (\[[^\]]*\]);$/m)?.[1];
  const meta: Record<string, unknown> = {};

  if (locales) meta.locales = JSON.parse(locales.replaceAll('\'', '"'));
  if (/^export const layout = 'wide';$/m.test(source)) meta.wide = true;

  const styles = getStyles(entry, source);
  if (styles) meta.sandbox = styles;

  return meta;
};

const lines = entries.map((entry) => `  '${entry}': dynamic(() => import('../../../docs/examples/${entry.replace(/\.tsx$/, '')}'), { ssr: false }),`);
const meta = entries.map((entry) => `  '${entry}': ${JSON.stringify(getMeta(entry))},`);

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

export type ExampleMeta = { locales?: string[], wide?: boolean, sandbox?: Record<string, string> };

export const EXAMPLES: Record<string, ComponentType<{ locale?: string }>> = {
${lines.join('\n')}
};

export const EXAMPLE_META: Record<string, ExampleMeta> = {
${meta.join('\n')}
};

export const SANDBOX_PACKAGE = ${JSON.stringify(sandboxPackage, null, 2)};
`);

console.log(`Generated ${entries.length} live example(s).`);
