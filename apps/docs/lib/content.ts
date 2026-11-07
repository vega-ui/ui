import { existsSync, readdirSync, readFileSync as readFileFromDisk } from 'node:fs';
import { join, relative } from 'node:path';
import { getDictionary, type Locale } from './i18n.ts';
import { VIEWS } from './views.ts';

const fileCache = process.env.NODE_ENV === 'production' ? new Map<string, string>() : undefined;

const readFileSync = (file: string, encoding: 'utf8') => {
  if (!fileCache) return readFileFromDisk(file, encoding);

  let text = fileCache.get(file);
  if (text === undefined) {
    text = readFileFromDisk(file, encoding);
    fileCache.set(file, text);
  }

  return text;
};

const root = join(process.cwd(), '../..');
const docsDir = join(root, 'docs');
const componentsDir = join(docsDir, 'en/components');
const examplesDir = join(docsDir, 'examples');

const SECTIONS: Record<Locale, { profile: string, summary: string, related: string }> = {
  en: { profile: 'Doc Profile', summary: 'Summary', related: 'Related Docs' },
  ru: { profile: 'Профиль документа', summary: 'Кратко', related: 'Связанные документы' },
};

const localized = (locale: Locale, file: string) => {
  const translation = join(docsDir, locale, file);
  if (locale !== 'en' && existsSync(translation)) return { file: translation, translated: true };

  return { file: join(docsDir, 'en', file), translated: locale === 'en' };
};
const uiDir = join(root, 'packages/ui/src');

export const PAGE_TITLES: Record<string, string> = {
  index: 'Overview',
  examples: 'Examples',
  patterns: 'Patterns',
  anatomy: 'Anatomy',
  api: 'API',
  styling: 'Styling',
  accessibility: 'Accessibility',
  comparison: 'Comparison',
  troubleshooting: 'Troubleshooting',
};

const CATEGORY_ORDER = ['Actions', 'Form', 'Overlay', 'Navigation', 'Data', 'Feedback', 'Display', 'Typography', 'Utils'];

export interface ComponentEntry {
  slug: string
  title: string
  summary: string
  category: string
  pages: string[]
  files: string[]
  storybook?: string
  source?: string
  figma?: string
}

interface StoryInfo {
  category: string
  storybook: string
  source: string
  figma?: string
}

const toKebab = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const readStories = () => {
  const stories = new Map<string, StoryInfo>();

  for (const dir of readdirSync(uiDir)) {
    const story = join(uiDir, dir, `${dir}.stories.tsx`);
    if (!existsSync(story)) continue;

    const source = readFileSync(story, 'utf8');
    const title = source.match(/title: '([^']+)'/)?.[1];
    if (!title) continue;

    stories.set(toKebab(dir), {
      category: title.split('/')[0],
      storybook: `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}--docs`,
      source: `https://github.com/vega-ui/ui/tree/main/packages/ui/src/${dir}`,
      figma: source.match(/url: '(https:\/\/www\.figma\.com\/[^']+)'/)?.[1],
    });
  }

  return stories;
};

const readSection = (markdown: string, heading: string) => markdown.split(`## ${heading}\n`)[1]?.split('\n## ')[0]?.trim() ?? '';

export const getComponents = (locale: Locale = 'en'): ComponentEntry[] => {
  const stories = readStories();

  return readdirSync(componentsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_') && existsSync(join(componentsDir, entry.name, 'index.md')))
    .map((entry) => {
      const markdown = readFileSync(join(componentsDir, entry.name, 'index.md'), 'utf8');
      const summary = readFileSync(localized(locale, `components/${entry.name}/index.md`).file, 'utf8');
      const files = Object.keys(PAGE_TITLES).filter((page) => existsSync(join(componentsDir, entry.name, `${page}.md`)));
      const pages = Object.keys(VIEWS).filter((view) => VIEWS[view].some((file) => files.includes(file)));

      return {
        slug: entry.name,
        title: markdown.match(/^# (.+)$/m)?.[1] ?? entry.name,
        summary: (readSection(summary, SECTIONS[locale].summary) || readSection(markdown, SECTIONS.en.summary)).split('\n')[0].replace(/`/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').split(/(?<=\.) /)[0],
        category: stories.get(entry.name)?.category ?? 'Utils',
        pages,
        files,
        storybook: stories.get(entry.name)?.storybook,
        source: stories.get(entry.name)?.source,
        figma: stories.get(entry.name)?.figma,
      };
    });
};

export const getCategories = (locale: Locale = 'en') => {
  const components = getComponents(locale);

  return CATEGORY_ORDER
    .map((name) => ({ name, components: components.filter((component) => component.category === name) }))
    .filter((category) => category.components.length > 0);
};

const stripSections = (markdown: string) => {
  const hidden = Object.values(SECTIONS).flatMap((names) => [names.profile, names.related]);

  return markdown
    .split(/\n(?=## )/)
    .filter((section) => !hidden.some((name) => section.startsWith(`## ${name}\n`)))
    .join('\n');
};

const EXAMPLE_RE = /^<!-- example: (\S+) -->\n```(\w+)\n[\s\S]*?^```\n<!-- \/example -->$/gm;

const inlineExamples = (markdown: string) => markdown.replace(EXAMPLE_RE, (_, file: string, language: string) => {
  const code = readFileSync(join(examplesDir, file), 'utf8').trimEnd();

  return `\`\`\`${language} example=${file}\n${code}\n\`\`\``;
});

const readComponentFile = (slug: string, name: string, locale: Locale) => {
  const { file, translated } = localized(locale, `components/${slug}/${name}.md`);

  const source = inlineExamples(stripSections(readFileSync(file, 'utf8')))
    .replace(/^# .+\n/, '')
    .replace(/^<!-- AUTO-GENERATED:\S+ -->\n/gm, '');

  return { name, source, translated, path: relative(root, file) };
};

const demoteHeadings = (markdown: string) => markdown
  .split(/(^```[\s\S]*?^```$)/m)
  .map((part, index) => index % 2 === 1 ? part : part.replace(/^(#{2,3}) /gm, '#$1 '))
  .join('');

export const getComponentPage = (slug: string, view: string, locale: Locale) => {
  const titles = getDictionary(locale).pages;
  const parts = VIEWS[view]
    .filter((name) => existsSync(join(componentsDir, slug, `${name}.md`)))
    .map((name) => readComponentFile(slug, name, locale));

  const source = parts
    .map((part) => part.name === view ? part.source : `## ${titles[part.name]}\n\n${demoteHeadings(part.source)}`)
    .join('\n\n');

  return { source, translated: parts.every((part) => part.translated), files: parts.map((part) => ({ label: titles[part.name], path: part.path })) };
};

export const getGuide = (name: string, locale: Locale) => {
  const { file } = localized(locale, `${name}.md`);

  return inlineExamples(readFileSync(file, 'utf8')).replace(/^# .+\n/, '');
};

export const getGuideSource = (file: string) => inlineExamples(readFileSync(join(root, file), 'utf8')).replace(/^# .+\n+(?:.+\n)+\n*/, '');

export const getVersion = (): string => JSON.parse(readFileSync(join(root, 'packages/ui/package.json'), 'utf8')).version;

const KEYBOARD_START = '<!-- AUTO-GENERATED:KEYBOARD:start -->';
const KEYBOARD_END = '<!-- AUTO-GENERATED:KEYBOARD:end -->';

export interface PropRow {
  name: string
  type: string
  value: string
  required: boolean
  description: string
}

export interface KeyboardRow {
  keys: string[]
  text: string
}

const readKeyboardBlock = (file: string) => {
  if (!existsSync(file)) return '';

  const [, block = ''] = readFileSync(file, 'utf8').split(KEYBOARD_START);

  return block.split(KEYBOARD_END)[0];
};

export const getKeyboardExample = (slug: string) => {
  const spec = join(docsDir, 'keyboard', `${slug}.mts`);
  if (!existsSync(spec)) return undefined;

  return readFileSync(spec, 'utf8').match(/'([a-z0-9-]+\/[a-z0-9-]+\.tsx)'/)?.[1];
};

export const getKeyboard = (slug: string, locale: Locale): KeyboardRow[] => readKeyboardBlock(localized(locale, `components/${slug}/accessibility.md`).file)
  .split('\n')
  .filter((line) => line.startsWith('| <kbd>'))
  .map((line) => {
    const [keys, text] = line.slice(2, -2).split(/ (?<!\\)\| /);

    return {
      keys: keys.split(' / ').map((group) => [...group.matchAll(/<kbd>([^<]+)<\/kbd>/g)].map((match) => match[1]).join(' + ')),
      text: text.replaceAll('\\|', '|'),
    };
  });

export const countKeyboardTables = () => readdirSync(componentsDir)
  .filter((slug) => readKeyboardBlock(join(componentsDir, slug, 'accessibility.md')) !== '')
  .length;
