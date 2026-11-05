import { getRootMetadata, localeScript, rootViewport, themeScript } from '@/components/RootDocument';
import { LocaleProvider } from '@/components/LocaleProvider';
import { NotFound } from '@/components/NotFound';
import { NotFoundChrome, NotFoundTitle } from '@/components/NotFoundChrome';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { getDictionary, type Locale } from '@/lib/i18n';

export const metadata = { ...getRootMetadata('en'), title: null };

export const viewport = rootViewport;

const Header = ({ locale }: { locale: Locale }) => (
  <LocaleProvider locale={locale}>
    <a href='#content' className='site-skip'>{getDictionary(locale).nav.skip}</a>
    <SiteHeader locale={locale} />
  </LocaleProvider>
);

const Footer = ({ locale }: { locale: Locale }) => (
  <LocaleProvider locale={locale}>
    <SiteFooter locale={locale} />
  </LocaleProvider>
);

export default function GlobalNotFound() {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <NotFoundTitle />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: localeScript }} />
        <NotFoundChrome chrome={{ en: <Header locale='en' />, ru: <Header locale='ru' /> }} />
        <NotFound />
        <NotFoundChrome chrome={{ en: <Footer locale='en' />, ru: <Footer locale='ru' /> }} />
      </body>
    </html>
  );
}
