import { notFound } from 'next/navigation';
import { DocPage } from '@/components/DocPage';
import { Markdown } from '@/components/Markdown';
import { PageFooter } from '@/components/PageFooter';
import { Pager } from '@/components/Pager';
import { getGuideSource } from '@/lib/content';
import { getGuideFile, getGuides } from '@/lib/guides';
import { codeKey } from '@/lib/code';
import { getHighlightStyles, highlightMarkdown } from '@/lib/highlight';
import { getDictionary, localize, type Locale } from '@/lib/i18n';
import { resolveHref } from '@/lib/resolveHref';
import { getPageMetadata, withSiteName } from '@/lib/site';
import { getToc } from '@/lib/toc';

export interface GuideParams {
  slug: string[]
}

export const getGuideParams = (): GuideParams[] => getGuides('en').map((guide) => ({ slug: guide.slug.split('/') }));

const findGuide = async (locale: Locale, params: Promise<GuideParams>) => {
  const { slug } = await params;

  return getGuides(locale).find((guide) => guide.slug === slug.join('/'));
};

export const getGuideMetadata = async (locale: Locale, params: Promise<GuideParams>) => {
  const guide = await findGuide(locale, params);
  if (!guide) return {};

  return getPageMetadata(locale, guide.href, withSiteName(guide.title), guide.summary);
};

export const GuideScreen = async ({ locale, params }: { locale: Locale, params: Promise<GuideParams> }) => {
  const { slug } = await params;
  const guides = getGuides(locale);
  const index = guides.findIndex((entry) => entry.slug === slug.join('/'));
  const guide = guides[index];
  if (!guide) notFound();

  const base = guide.file.replace(/[^/]+$/, '');
  const source = getGuideSource(guide.file).replace(/\]\(([^)\s]+)\)/g, (_, href: string) => `](${resolveHref(href, locale, undefined, base)})`);
  const toc = getToc(source, getGuideSource(getGuideFile(guide.slug, 'en')));

  const toLink = (entry?: { href: string, title: string }) => entry && { href: localize(locale, entry.href), label: entry.title };
  const highlighted = await highlightMarkdown(source);
  const highlightStyles = getHighlightStyles(Object.values(highlighted));

  return (
    <DocPage title={guide.title} description={guide.summary} toc={toc}>
      <style href={`code-highlight-${codeKey(highlightStyles)}`} precedence='default'>{highlightStyles}</style>
      <Markdown source={source} headings={toc} highlighted={highlighted} />
      <Pager label={getDictionary(locale).doc.pagerPage} previous={toLink(guides[index - 1])} next={toLink(guides[index + 1])} />
      <PageFooter locale={locale} path={guide.file} />
    </DocPage>
  );
};
