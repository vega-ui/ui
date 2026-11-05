import type { MetadataRoute } from 'next';
import { getComponents } from '@/lib/content';
import { getGuides } from '@/lib/guides';
import { LOCALES, localize } from '@/lib/i18n';
import { getAlternates, siteUrl } from '@/lib/site';
import { TEMPLATES } from '@/lib/templates';

export const dynamic = 'force-static';

const getPaths = () => [
  '/',
  ...getGuides('en').map((guide) => guide.href),
  '/docs/theme/',
  '/components/',
  ...getComponents().flatMap((component) => component.pages.map((page) => `/components/${component.slug}/${page === 'index' ? '' : `${page}/`}`)),
  '/templates/',
  ...TEMPLATES.map((name) => `/templates/${name}/`),
  '/changelog/',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return getPaths().flatMap((path) => LOCALES.map((locale) => ({
    url: siteUrl(localize(locale, path)),
    alternates: { languages: getAlternates(path) },
  })));
}
