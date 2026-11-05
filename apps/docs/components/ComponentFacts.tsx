'use client';

import { useState } from 'react';
import NextLink from 'next/link';
import { Badge, Button, Collapsible, CollapsibleContent, CollapsibleTrigger, Icon, Popover, PopoverContent, PopoverTrigger, Text, VisuallyHidden } from '@vega-ui/react';
import { ChevronDown, CircleCheck, CircleX, Info } from '@vega-ui/icons';
import CI from '@/generated/ci.json';
import { ENGINES } from '@/lib/engines';
import { localize } from '@/lib/i18n';
import { TEST_RUNS_URL } from '@/lib/site';
import { useDictionary, useLocale } from './LocaleProvider';
import styles from './ComponentFacts.module.css';

interface Release {
  version: string
  id: string | null
}

interface Feature {
  id: string
  name: string
  mdn: string
  required: boolean
  note: string | null
}

interface Size {
  minified: number
  gzip: number
  brotli: number
}

export interface ComponentFactsData {
  entry: string
  baseline: string
  year: string | null
  browsers: Record<string, string | null>
  features: Feature[]
  size: { gzip: number, brotli: number, js: Size, css: Size }
  tests: number
  added: Release | null
  changed: Release | null
}

interface Ci {
  date: string | null
  engines: Record<string, { passed: boolean, url: string } | null>
}

const ci = CI as Ci | null;

const BADGE_VARIANTS: Record<string, string> = { widely: 'success', newly: 'info', limited: 'warning' };

const PREVIEW_COUNT = 3;

export const ComponentFacts = ({ facts }: { facts: ComponentFactsData }) => {
  const t = useDictionary();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const format = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
  const fill = (template: string, values: Record<string, string>) => template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? '');
  const preview = facts.features.filter((feature) => feature.required && feature.note === null).slice(0, PREVIEW_COUNT);
  const rest = facts.features.length - preview.length;
  const baseline = fill(t.facts.baseline[facts.baseline], { year: facts.year ?? '' });
  const size = fill(t.facts.gzip, { size: format.format(facts.size.gzip) });
  const testCount = fill(t.facts.testCount[new Intl.PluralRules(locale).select(facts.tests)] ?? '', { count: String(facts.tests) });
  const passed = ci !== null && Object.values(ci.engines).every((engine) => engine?.passed);

  const renderRelease = (template: string, release: Release) => {
    const [before, after] = template.split('{version}');
    const label = `v${release.version}`;

    return (
      <>
        {before}
        {release.id ? <NextLink href={localize(locale, `/changelog/#${release.id}`)} className={styles.link}>{label}</NextLink> : label}
        {after}
      </>
    );
  };

  return (
    <section aria-label={t.facts.label} className={styles.facts} data-expanded={expanded}>
      <Button size='sm' variant='secondary' appearance='transparent' className={styles.trigger} data-compact aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
        <span className={styles.summary}>
          {[baseline, size, facts.tests > 0 && testCount].filter(Boolean).join(' · ')}
          {facts.tests > 0 && passed && <Icon size='xs' className={styles.passed}><CircleCheck /></Icon>}
        </span>
        <Icon size='xs' className={styles.chevron} data-open={expanded}><ChevronDown /></Icon>
      </Button>
      <dl className={styles.list}>
        <div className={styles.item}>
          <dt className={styles.term}>{t.facts.support}</dt>
          <dd className={styles.value}>
            <Badge size='sm' variant={BADGE_VARIANTS[facts.baseline]}>{baseline}</Badge>
            <ul className={styles.browsers}>
              {Object.entries(facts.browsers).map(([browser, version]) => (
                <li key={browser}>
                  {t.facts.browsers[browser]} <span className={styles.version}>{version ?? t.facts.unsupported}</span>
                </li>
              ))}
            </ul>
          </dd>
        </div>
        <div className={styles.item}>
          <dt className={styles.term}>{t.facts.size}</dt>
          <dd className={styles.value}>
            <Popover role='dialog' placement='bottom-start'>
              <PopoverTrigger asChild>
                <Button size='sm' variant='secondary' appearance='transparent' className={styles.size}>
                  {size}
                  <Icon size='xs'><Info /></Icon>
                </Button>
              </PopoverTrigger>
              <PopoverContent aria-label={t.facts.size} className={styles.popover}>
                <Text size={2}>
                  {fill(t.facts.sizeHint, {
                    entry: facts.entry,
                    js: format.format(facts.size.js.gzip),
                    css: format.format(facts.size.css.gzip),
                    brotli: format.format(facts.size.brotli),
                  })}
                </Text>
              </PopoverContent>
            </Popover>
          </dd>
        </div>
        {facts.tests > 0 && (
          <div className={styles.item}>
            <dt className={styles.term}>{t.facts.tests}</dt>
            <dd className={styles.value}>
              <ul className={styles.browsers}>
                {Object.entries(ENGINES).map(([engine, logo]) => {
                  const status = ci?.engines[engine];

                  return (
                    <li key={engine}>
                      <a href={status?.url ?? TEST_RUNS_URL} className={styles.engine}>
                        <svg viewBox='0 0 24 24' aria-hidden='true' className={styles.logo}><path d={logo} /></svg>
                        {t.facts.engines[engine]}
                        {status && <Icon size='xs' className={status.passed ? styles.passed : styles.failed}>{status.passed ? <CircleCheck /> : <CircleX />}</Icon>}
                        {status && <VisuallyHidden>{status.passed ? t.facts.passed : t.facts.failed}</VisuallyHidden>}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <span className={styles.version}>
                {testCount}
                {ci?.date && ` · ${new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(new Date(ci.date))}`}
              </span>
            </dd>
          </div>
        )}
        {facts.added && (
          <div className={styles.item}>
            <dt className={styles.term}>{t.facts.history}</dt>
            <dd className={styles.value}>
              <span>
                {renderRelease(t.facts.added, facts.added)}
                {facts.changed && facts.changed.version !== facts.added.version && <>, {renderRelease(t.facts.changed, facts.changed)}</>}
              </span>
            </dd>
          </div>
        )}
      </dl>
      {facts.features.length > 0 && (
        <div className={styles.uses}>
          <Collapsible open={open} onChangeOpen={setOpen}>
            <CollapsibleTrigger asChild>
              <Button size='sm' variant='secondary' appearance='transparent' className={styles.trigger}>
                <span className={styles.summary}>
                  {t.facts.uses}: {preview.map((feature) => feature.name).join(', ')}
                  {rest > 0 && ` ${fill(t.facts.more, { count: String(rest) })}`}
                </span>
                <Icon size='xs' className={styles.chevron} data-open={open}><ChevronDown /></Icon>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ul className={styles.features}>
                {facts.features.map((feature) => (
                  <li key={feature.id} className={styles.feature}>
                    <a href={feature.mdn} className={styles.link}>{feature.name}</a>
                    {feature.note && <span className={styles.note}> — {t.facts.notes[feature.note]}</span>}
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}
    </section>
  );
};
