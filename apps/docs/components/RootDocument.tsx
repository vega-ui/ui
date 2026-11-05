import type { ReactNode } from 'react';
import '@vega-ui/theme-core';
import '@vega-ui/react/style.css';
import '@/app/globals.css';
import { getDictionary, type Locale } from '@/lib/i18n';
import { SITE_NAME, SITE_URL, THEME_COLOR } from '@/lib/site';
import { DocumentLang } from './DocumentLang';
import { LocaleProvider } from './LocaleProvider';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

export const getRootMetadata = (locale: Locale) => ({
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: { default: getDictionary(locale).meta.title, template: `%s — ${SITE_NAME}` },
  description: getDictionary(locale).meta.description,
  twitter: { card: 'summary_large_image' as const },
});

export const rootViewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: THEME_COLOR },
  ],
};

export const themeScript = 'try { const root = document.documentElement; root.classList.add(localStorage.getItem("theme") ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")); const accent = localStorage.getItem("accent"); if (accent) root.dataset.accent = accent; const radius = localStorage.getItem("radius"); if (radius) root.dataset.radius = radius; matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => { if (localStorage.getItem("theme")) return; root.classList.remove("light", "dark"); root.classList.add(event.matches ? "dark" : "light"); }); const css = localStorage.getItem("theme-css"); if (css) { const style = document.createElement("style"); style.id = "site-theme"; style.textContent = css; document.head.append(style); } } catch { document.documentElement.classList.add("light"); }';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const localeScript = `if (/^${basePath.replace(/\//g, '\\/')}\\/ru(\\/|$)/.test(location.pathname)) { document.documentElement.lang = 'ru'; }`;

export const RootDocument = ({ children }: { children: ReactNode }) => (
  <html lang='en' suppressHydrationWarning>
    <head>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <script dangerouslySetInnerHTML={{ __html: localeScript }} />
    </head>
    <body>{children}</body>
  </html>
);

export const LocaleDocument = ({ locale, children }: { locale: Locale, children: ReactNode }) => (
  <LocaleProvider locale={locale}>
    <DocumentLang locale={locale} />
    <a href='#content' className='site-skip'>{getDictionary(locale).nav.skip}</a>
    <SiteHeader locale={locale} />
    {children}
    <SiteFooter locale={locale} />
  </LocaleProvider>
);
