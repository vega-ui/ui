import { ChangelogView } from '@/components/ChangelogView';
import { PageFooter } from '@/components/PageFooter';
import { CHANGELOG_PACKAGES, getChangelog } from '@/lib/changelog';
import { FEED_PATH } from '@/lib/feed';
import { getDictionary, type Locale } from '@/lib/i18n';
import { getPageMetadata, siteUrl } from '@/lib/site';

export const getChangelogMetadata = (locale: Locale) => {
  const t = getDictionary(locale).changelog;

  const metadata = getPageMetadata(locale, '/changelog/', t.metaTitle, t.description);

  return { ...metadata, alternates: { ...metadata.alternates, types: { 'application/atom+xml': siteUrl(FEED_PATH) } } };
};

export const ChangelogScreen = ({ locale }: { locale: Locale }) => {
  const footers = Object.fromEntries(CHANGELOG_PACKAGES.map((item) => [item.slug, <PageFooter locale={locale} path={`packages/${item.dir}/CHANGELOG.md`} />]));

  return <ChangelogView packages={getChangelog()} footers={footers} feed={`${process.env.NEXT_PUBLIC_BASE_PATH}${FEED_PATH}`} />;
};
