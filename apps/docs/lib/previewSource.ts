import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const source = readFileSync(join(process.cwd(), 'components/ComponentPreviews.tsx'), 'utf8');

const LAYOUT_STYLES: Record<string, string> = {
  row: 'style={{ display: \'flex\', alignItems: \'center\', gap: 10 }}',
  column: 'style={{ display: \'grid\', gap: 8 }}',
  wide: 'style={{ width: \'100%\' }}',
  scroller: 'style={{ width: 240, gap: 12 }}',
};

const HELPERS = [
  { name: 'WEEK', pattern: /^const WEEK = .+;$/m },
  { name: 'IndexedSlide', pattern: /^const IndexedSlide = [\s\S]+?\n};$/m },
];

const ICONS = source.match(/import \{([^}]+)\} from '@vega-ui\/icons';/)?.[1].split(',').map((name) => name.trim()) ?? [];

const readEntries = () => {
  const entries = new Map<string, string>();

  for (const [, slug, body] of source.matchAll(/^ {2}'?([\w-]+)'?: \{\n {4}node: \(\n([\s\S]*?)\n {4}\),\n {2}\},$/gm)) {
    entries.set(slug, body.split('\n').map((line) => line.slice(6)).join('\n'));
  }

  for (const [, slug, body] of source.matchAll(/^ {2}'?([\w-]+)'?: \{ node: (.+) \},$/gm)) {
    entries.set(slug, body);
  }

  return entries;
};

const entries = readEntries();

const cleanClasses = (code: string) => code.replace(/ className=\{styles\.(\w+)\}/g, (_, name: string) => LAYOUT_STYLES[name] ? ` ${LAYOUT_STYLES[name]}` : '');

const formatImport = (names: string[], from: string) => {
  if (names.length <= 3) return `import { ${names.join(', ')} } from '${from}';`;

  return `import {\n${names.map((name) => `  ${name},`).join('\n')}\n} from '${from}';`;
};

export const getPreviewSource = (slug: string) => {
  const jsx = entries.get(slug);
  if (!jsx) return null;

  const helpers = HELPERS.filter((helper) => jsx.includes(helper.name)).map((helper) => cleanClasses(source.match(helper.pattern)?.[0] ?? ''));
  const body = [...helpers, cleanClasses(jsx)].join('\n\n');
  const helperNames = HELPERS.map((helper) => helper.name);
  const used = [...new Set([...body.matchAll(/<([A-Z]\w*)|\b(use[A-Z]\w*)\(/g)].map((match) => match[1] ?? match[2]))]
    .filter((name) => !helperNames.includes(name))
    .sort();
  const icons = used.filter((name) => ICONS.includes(name));
  const components = used.filter((name) => !ICONS.includes(name));
  const imports = [formatImport(components, '@vega-ui/react'), icons.length > 0 && formatImport(icons, '@vega-ui/icons')].filter(Boolean);

  return `${imports.join('\n')}\n\n${body}`;
};
