import type { Metadata } from 'next';
import { getDictionary, localize, type Locale } from './i18n';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vega-ui.github.io/ui').replace(/\/$/, '');

export const SITE_NAME = 'Vega UI';

export const TEST_RUNS_URL = 'https://github.com/vega-ui/ui/actions/workflows/release.yml';

export const THEME_COLOR = '#0a0a0a';

export const OG_SIZE = { width: 1200, height: 630 };

export const siteUrl = (path: string) => `${SITE_URL}${path}`;

export const getMarkdownPath = (path: string) => /^(\/ru)?\/(components\/[^/]+|docs)\//.test(path) ? `${path}index.md` : undefined;

export const withSiteName = (title: string) => `${title} — ${SITE_NAME}`;

export const getAlternates = (path: string) => ({
  en: siteUrl(path),
  ru: siteUrl(localize('ru', path)),
  'x-default': siteUrl(path),
});

export const getPageMetadata = (locale: Locale, path: string, title: string, description: string, image = '/og.png'): Metadata => {
  const url = siteUrl(localize(locale, path));
  const markdown = getMarkdownPath(path);
  const images = [{ url: siteUrl(localize(locale, image)), ...OG_SIZE, alt: title, type: 'image/png' }];

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: getAlternates(path), ...(markdown && { types: { 'text/markdown': siteUrl(localize(locale, markdown)) } }) },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: getDictionary(locale).meta.ogLocale,
      url,
      title,
      description,
      images,
    },
    twitter: { card: 'summary_large_image', title, description, images },
  };
};
