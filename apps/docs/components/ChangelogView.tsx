'use client';

import { type ReactNode, useEffect, useSyncExternalStore } from 'react';
import { Badge, Button, Heading, Icon, SegmentedControl, SegmentedControlIndicator, SegmentedControlItem, SegmentedControlItemInput, Text } from '@vega-ui/react';
import { GitCommitHorizontal, Rss, TriangleAlert } from '@vega-ui/icons';
import type { ChangelogPackage, ChangelogRelease, ReleaseType } from '@/lib/changelog';
import { DocPage } from './DocPage';
import { Markdown } from './Markdown';
import { useDictionary } from './LocaleProvider';
import styles from './ChangelogView.module.css';

const BADGE_VARIANTS: Record<ReleaseType, string> = { major: 'error', minor: 'info', patch: 'success' };

const subscribe = (onChange: () => void) => {
  window.addEventListener('hashchange', onChange);

  return () => window.removeEventListener('hashchange', onChange);
};

const readHash = () => decodeURIComponent(window.location.hash.slice(1));

const Release = ({ release }: { release: ChangelogRelease }) => {
  const t = useDictionary();
  const title = release.unreleased ? `${t.changelog.unreleased} (${release.version})` : release.version;

  return (
    <section aria-labelledby={release.id} className={styles.release}>
      <header className={styles.releaseHeader}>
        <Heading as='h2' fontWeight={600} id={release.id} className={styles.version}>
          <a href={`#${release.id}`} className={styles.anchor}>{title}</a>
        </Heading>
        <Badge size='sm' variant={BADGE_VARIANTS[release.type]} appearance={release.breaking ? 'fill' : 'ghost'}>{t.changelog.types[release.type]}</Badge>
        {release.breaking && (
          <Text className={styles.breaking}>
            <Icon size='xs'><TriangleAlert /></Icon>
            {t.changelog.breaking}
          </Text>
        )}
      </header>
      {release.unreleased && <Text className={styles.note}>{t.changelog.unreleasedNote}</Text>}
      {release.dependenciesOnly && <Text className={styles.note}>{t.changelog.dependencies}</Text>}
      {!release.dependenciesOnly && release.sections.length === 0 && <Text className={styles.note}>{t.changelog.empty}</Text>}
      {release.sections.map((section) => (
        <div key={section.type} className={styles.section}>
          <Heading as='h3' fontWeight={600} className={styles.sectionTitle}>{t.changelog.sections[section.type]}</Heading>
          <ul className={styles.entries}>
            {section.entries.map((entry, index) => (
              <li key={entry.commit ?? index} className={styles.entry}>
                <Markdown source={entry.body} highlighted={{}} />
                {entry.commit && (
                  <a
                    href={`https://github.com/vega-ui/ui/commit/${entry.commit}`}
                    className={styles.commit}
                    aria-label={t.changelog.commit.replace('{hash}', entry.commit)}
                  >
                    <Icon size='xs'><GitCommitHorizontal /></Icon>
                    {entry.commit}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export const ChangelogView = ({ packages, footers, feed }: { packages: ChangelogPackage[], footers: Record<string, ReactNode>, feed: string }) => {
  const t = useDictionary();
  const hash = useSyncExternalStore(subscribe, readHash, () => '');
  const active = packages.find((item) => hash === item.slug || hash.startsWith(`${item.slug}-v`) || hash === `${item.slug}-unreleased`) ?? packages[0];

  useEffect(() => {
    if (!hash) return;

    document.getElementById(hash)?.scrollIntoView();
  }, [hash]);

  const releases = active.unreleased ? [active.unreleased, ...active.releases] : active.releases;
  const toc = releases.map((release) => ({ id: release.id, title: release.unreleased ? `${t.changelog.unreleased} (${release.version})` : release.version, depth: 2 }));

  return (
    <DocPage
      title={t.changelog.title}
      description={t.changelog.description}
      toc={toc}
      actions={(
        <Button asChild size='xs' variant='secondary' appearance='ghost'>
          <a href={feed} type='application/atom+xml' aria-label={t.changelog.feedLabel}>
            <Icon size='xs'><Rss /></Icon>
            {t.changelog.feed}
          </a>
        </Button>
      )}
    >
      <div className={styles.switch}>
        <SegmentedControl
          size='xs'
          variant='primary'
          name='changelog-package'
          aria-label={t.changelog.package}
          value={active.slug}
          onChange={(event) => window.location.replace(`#${event.target.value}`)}
        >
          {packages.map((item) => (
            <SegmentedControlItem key={item.slug} value={item.slug}>
              <SegmentedControlItemInput />
              {item.label}
            </SegmentedControlItem>
          ))}
          <SegmentedControlIndicator />
        </SegmentedControl>
      </div>
      <Text className={styles.package}>{active.name}</Text>
      <div className={styles.releases}>
        {releases.map((release) => <Release key={release.id} release={release} />)}
      </div>
      {active.releases.length > 0 && footers[active.slug]}
    </DocPage>
  );
};
