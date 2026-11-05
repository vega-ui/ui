import { getCategories, getComponentPage, getComponents, getGuideSource, type ComponentEntry } from './content';
import { getGuides, type Guide } from './guides';
import { getDictionary, localize, type Locale } from './i18n';
import { resolveHref } from './resolveHref';
import { SITE_NAME, siteUrl } from './site';
import { getView } from './views';

export const MARKDOWN_HEADERS = { 'Content-Type': 'text/markdown; charset=utf-8' };

export const TEXT_HEADERS = { 'Content-Type': 'text/plain; charset=utf-8' };

const FENCE_RE = /(^```[\s\S]*?^```$)/m;

const toAbsolute = (href: string, locale: Locale, slug?: string, base?: string) => {
  const resolved = resolveHref(href, locale, slug, base);
  if (!resolved.startsWith('/')) return resolved;

  return siteUrl(localize(locale, resolved));
};

const clean = (markdown: string, locale: Locale, slug?: string, base?: string) => markdown
  .split(FENCE_RE)
  .map((part, index) => {
    if (index % 2 === 1) return part.replace(/^(```\w+) example=\S+/, '$1');

    return part
      .replace(/^<!--.*-->\n/gm, '')
      .replace(/\]\(([^)\s]+)\)/g, (_, href: string) => `](${toAbsolute(href, locale, slug, base)})`);
  })
  .join('')
  .replace(/\n{3,}/g, '\n\n')
  .trim();

export const getMarkdownHref = (href: string) => `${href}index.md`;

const getComponentHref = (slug: string, page: string) => `/components/${slug}/${page === 'index' ? '' : `${page}/`}`;

const getComponentPageTitle = (locale: Locale, component: ComponentEntry, page: string) => {
  if (page === 'index') return component.title;

  return getDictionary(locale).meta.componentPage.replace('{component}', component.title).replace('{page}', getDictionary(locale).pages[page]);
};

const renderComponentPage = (locale: Locale, component: ComponentEntry, page: string) => {
  const { source } = getComponentPage(component.slug, page, locale);

  return `# ${getComponentPageTitle(locale, component, page)}\n\n${clean(source, locale, component.slug)}\n`;
};

const renderGuide = (locale: Locale, guide: Guide) => {
  const base = guide.file.replace(/[^/]+$/, '');

  return `# ${guide.title}\n\n${guide.summary}\n\n${clean(getGuideSource(guide.file), locale, undefined, base)}\n`;
};

export const getComponentMarkdownParams = () => getComponents().flatMap((component) => [...new Set([...component.pages, ...component.files])]
  .filter((page) => page !== 'index')
  .map((page) => ({ slug: component.slug, page })));

export const getComponentIndexMarkdownParams = () => getComponents().map((component) => ({ slug: component.slug }));

export const getComponentMarkdown = (locale: Locale, slug: string, page = 'index') => {
  const component = getComponents(locale).find((entry) => entry.slug === slug);
  if (!component || ![...component.pages, ...component.files].includes(page)) return new Response('Not found', { status: 404 });

  return new Response(renderComponentPage(locale, component, getView(page)), { headers: MARKDOWN_HEADERS });
};

export const getGuideMarkdownParams = (depth: number) => getGuides('en')
  .map((guide) => guide.slug.split('/'))
  .filter((segments) => segments.length === depth)
  .map(([slug, page]) => page ? { slug, page } : { slug });

export const getGuideMarkdown = (locale: Locale, slug: string) => {
  const guide = getGuides(locale).find((entry) => entry.slug === slug);
  if (!guide) return new Response('Not found', { status: 404 });

  return new Response(renderGuide(locale, guide), { headers: MARKDOWN_HEADERS });
};

const toLink = (title: string, href: string, description: string) => `- [${title}](${siteUrl(getMarkdownHref(href))}): ${description}`;

export const getLlmsText = () => {
  const t = getDictionary('en');
  const guides = getGuides('en').map((guide) => toLink(guide.title, guide.href, guide.summary));
  const categories = getCategories('en').map((category) => {
    const links = category.components.flatMap((component) => component.pages.map((page) => {
      const description = page === 'index' ? component.summary : t.meta.pages[page].replace('{component}', component.title);

      return toLink(getComponentPageTitle('en', component, page), getComponentHref(component.slug, page), description);
    }));

    return `## Components: ${category.name}\n\n${links.join('\n')}`;
  });

  return [
    `# ${SITE_NAME}`,
    `> ${t.meta.description}`,
    `Install with \`pnpm add @vega-ui/react @vega-ui/theme-core @vega-ui/icons\`. Every link below is the Markdown version of a docs page. The whole English documentation in one file: ${siteUrl('/llms-full.txt')}`,
    `## Guides\n\n${guides.join('\n')}`,
    ...categories,
    `## Optional\n\n- [${t.changelog.title}](${siteUrl('/changelog/')}): ${t.changelog.description}`,
  ].join('\n\n').concat('\n');
};

export const getLlmsFullText = () => {
  const guides = getGuides('en').map((guide) => renderGuide('en', guide));
  const components = getCategories('en').flatMap((category) => category.components.flatMap((component) => component.pages.map((page) => renderComponentPage('en', component, page))));

  return [`# ${SITE_NAME}\n\n> ${getDictionary('en').meta.description}\n`, ...guides, ...components].join('\n---\n\n');
};
