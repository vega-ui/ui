'use client';

import NextLink from 'next/link';
import { Button, Heading, Icon, Text } from '@vega-ui/react';
import { ChevronRight } from '@vega-ui/icons';
import { HeroLab } from './HeroLab';
import { HomeAccess } from './HomeAccess';
import { HomeAi } from './HomeAi';
import { HomeCatalog, type CatalogCategory } from './HomeCatalog';
import { HomeComposable } from './HomeComposable';
import { HomeKeyboard } from './HomeKeyboard';
import { HomeNav } from './HomeNav';
import { HomePlatform } from './HomePlatform';
import { HomeStart } from './HomeStart';
import { HomeTemplates } from './HomeTemplates';
import { HomeWorld } from './HomeWorld';
import type { KeyboardRow } from '@/lib/content';
import { localize, type Locale } from '@/lib/i18n';
import { useDictionary, useLocale } from './LocaleProvider';
import styles from './Home.module.css';

const SHOWCASE = 'inbox';

interface HomeProps {
  version: string
  categories: CatalogCategory[]
  keyboard: Record<Locale, KeyboardRow[]>
  keyboardCount: number
  ai: { preview: string[], pages: number, size: number }
  snippets: { tsx: string, css: string }[]
}

export const Home = ({ version, categories, keyboard, keyboardCount, ai, snippets }: HomeProps) => {
  const locale = useLocale();
  const t = useDictionary();
  const sizes = categories.flatMap((category) => category.components.map((component) => component.gzip)).sort((a, b) => a - b);
  const facts = [
    { value: String(sizes.length), label: t.home.facts.components },
    { value: new Intl.NumberFormat(locale).format(sizes[Math.floor(sizes.length / 2)]), label: t.home.facts.size },
    { value: '3', label: t.home.facts.engines },
    { value: String(keyboardCount), label: t.home.facts.keyboard },
  ];

  return (
    <main id='content' tabIndex={-1} className={styles.main}>
      <section className={`site-frame ${styles.hero}`}>
        <HeroLab
          template={SHOWCASE}
          intro={(
            <div className={styles.intro}>
              <NextLink href={localize(locale, `/changelog/#v${version.replace(/\./g, '-')}`)} className={styles.announce}>
                {`v${version} · ${t.home.whatsNew}`}
                <Icon size='xs'><ChevronRight /></Icon>
              </NextLink>
              <Heading as='h1' fontWeight={700} className={styles.title}>Vega UI</Heading>
              <Text className={styles.tagline}>{t.home.tagline}</Text>
              <Text className={styles.lead}>{t.home.lead}</Text>
              <div className={styles.actions}>
                <Button asChild size='md' className={styles.pill}>
                  <NextLink href={localize(locale, '/docs/getting-started/')}>{t.home.start}</NextLink>
                </Button>
                <Button asChild size='md' appearance='transparent' className={styles.pill}>
                  <NextLink href={localize(locale, '/components/')}>
                    {t.home.browse}
                    <Icon size='xs'><ChevronRight /></Icon>
                  </NextLink>
                </Button>
              </div>
            </div>
          )}
          caption={(
            <figcaption className={styles.caption}>
              {t.home.showcase.replace('{name}', t.templates.items[SHOWCASE].title)}
              {' '}
              <NextLink href={localize(locale, `/templates/${SHOWCASE}/`)} className={styles.captionLink}>
                {t.home.openTemplate}
                <Icon size='xs'><ChevronRight /></Icon>
              </NextLink>
            </figcaption>
          )}
        />
      </section>

      <dl aria-label={t.home.facts.label} className={`site-frame ${styles.facts}`}>
        {facts.map((fact) => (
          <div key={fact.label} className={styles.fact}>
            <dt className={styles.factLabel}>{fact.label}</dt>
            <dd className={styles.factValue}>{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className={`site-frame ${styles.shell}`}>
        <HomeNav />
        <div className={styles.screens}>
          <HomePlatform />
          <HomeComposable snippets={snippets} />
          <HomeKeyboard rows={keyboard} count={keyboardCount} />
          <HomeAccess />
          <HomeWorld />
          <HomeAi {...ai} />
          <HomeTemplates />
          <HomeCatalog categories={categories} />
        </div>
      </div>

      <HomeStart />
    </main>
  );
};
