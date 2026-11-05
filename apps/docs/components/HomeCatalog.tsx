'use client';

import { useId } from 'react';
import NextLink from 'next/link';
import { Icon, Text } from '@vega-ui/react';
import { ChevronRight } from '@vega-ui/icons';
import { localize } from '@/lib/i18n';
import { toId } from '@/lib/toc';
import { useDictionary, useLocale } from './LocaleProvider';
import { HomeTitle } from './HomeTitle';
import section from './HomeSection.module.css';
import styles from './HomeCatalog.module.css';

export interface CatalogCategory {
  name: string
  components: { slug: string, title: string, gzip: number }[]
}

export const HomeCatalog = ({ categories }: { categories: CatalogCategory[] }) => {
  const locale = useLocale();
  const dictionary = useDictionary();
  const t = dictionary.home.catalog;
  const count = categories.reduce((total, category) => total + category.components.length, 0);
  const size = new Intl.NumberFormat(locale, { style: 'unit', unit: 'kilobyte', maximumFractionDigits: 1 });
  const id = useId();

  return (
    <section id='catalog' className={`${section.section}`} aria-labelledby={`${id}-title`}>
      <div className={section.intro}>
        <Text className={section.eyebrow}>{t.eyebrow}</Text>
        <HomeTitle id={`${id}-title`} text={t.title} />
        <Text className={section.text}>{t.text.replace('{count}', String(count))}</Text>
        <NextLink href={localize(locale, '/components/')} className={section.link}>
          {t.link}
          <Icon size='xs'><ChevronRight /></Icon>
        </NextLink>
      </div>
      <ul className={styles.grid}>
        {categories.map((category) => (
          <li key={category.name} className={`${section.frame} ${styles.category}`}>
            <NextLink href={localize(locale, `/components/#${toId(category.name)}`)} className={`${section.legend} ${styles.legend}`}>
              {`${dictionary.categories[category.name] ?? category.name} · ${category.components.length}`}
            </NextLink>
            <ul className={styles.list}>
              {category.components.map((component) => (
                <li key={component.slug}>
                  <NextLink href={localize(locale, `/components/${component.slug}/`)} className={styles.row}>
                    <span>{component.title}</span>
                    <span className={styles.leader} />
                    <span className={styles.size}>{size.format(component.gzip)}</span>
                  </NextLink>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};
