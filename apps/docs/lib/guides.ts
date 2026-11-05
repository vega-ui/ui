import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Locale } from './i18n';

export type GuideSection = 'start' | 'guides' | 'families';

export interface Guide {
  slug: string
  section: GuideSection
  title: string
  summary: string
  href: string
  file: string
}

export const GUIDES: { section: GuideSection, slugs: string[] }[] = [
  { section: 'start', slugs: ['getting-started'] },
  { section: 'guides', slugs: ['styling', 'styling/themes', 'styling/tokens', 'styling/css-variables', 'forms', 'nextjs', 'i18n', 'architecture', 'glossary'] },
  { section: 'families', slugs: ['families', 'families/selection-controls', 'families/text-inputs', 'families/date-inputs', 'families/overlays', 'families/data-displays', 'families/status-feedback', 'families/layout-primitives'] },
];

const SECTIONS = ['styling', 'families'];

const root = join(process.cwd(), '../..');

export const getGuideFile = (slug: string, locale: Locale) => {
  const name = SECTIONS.includes(slug) ? `${slug}/README.md` : `${slug}.md`;
  const translation = `docs/${locale}/${name}`;
  if (existsSync(join(root, translation))) return translation;

  return `docs/en/${name}`;
};

const plain = (text: string) => text
  .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  .replace(/[`*_]/g, '')
  .replace(/\s+/g, ' ')
  .trim();

export const getGuides = (locale: Locale): Guide[] => GUIDES.flatMap(({ section, slugs }) => slugs.map((slug) => {
  const file = getGuideFile(slug, locale);
  const markdown = readFileSync(join(root, file), 'utf8');
  const title = markdown.match(/^# (.+)$/m)?.[1] ?? slug;
  const summary = markdown.replace(/^# .+\n+/, '').split(/\n\s*\n/)[0];

  return { slug, section, title, summary: plain(summary), href: `/docs/${slug}/`, file };
}));

export const getGuideSections = (locale: Locale) => {
  const guides = getGuides(locale);

  return GUIDES.map(({ section }) => ({ section, guides: guides.filter((guide) => guide.section === section) }));
};
