'use client';

import { useId } from 'react';
import NextLink from 'next/link';
import { Icon, Text } from '@vega-ui/react';
import { ChevronRight } from '@vega-ui/icons';
import { localize } from '@/lib/i18n';
import { useDictionary, useLocale } from './LocaleProvider';
import { HomeTitle } from './HomeTitle';
import { TemplateThumbnail } from './TemplateThumbnail';
import section from './HomeSection.module.css';
import styles from './HomeTemplates.module.css';

const PICKS = ['analytics', 'checkout', 'booking'];

export const HomeTemplates = () => {
  const locale = useLocale();
  const dictionary = useDictionary();
  const t = dictionary.home.templates;
  const items = dictionary.templates.items;
  const id = useId();

  return (
    <section id='templates' className={section.section} aria-labelledby={`${id}-title`}>
      <div className={section.intro}>
        <Text className={section.eyebrow}>{t.eyebrow}</Text>
        <HomeTitle id={`${id}-title`} text={t.title} />
        <Text className={section.text}>{t.text.replace('{count}', String(Object.keys(items).length))}</Text>
        <NextLink href={localize(locale, '/templates/')} className={section.link}>
          {t.link}
          <Icon size='xs'><ChevronRight /></Icon>
        </NextLink>
      </div>
      <ul className={styles.grid}>
        {PICKS.map((name) => (
          <li key={name} className={`${section.frame} ${styles.template}`}>
            <NextLink href={localize(locale, `/templates/${name}/`)} className={styles.link}>
              <span className={section.legend}>{`templates/${name}.tsx`}</span>
              <TemplateThumbnail name={name} />
              <span className={styles.body}>
                <span className={styles.title}>{items[name].title}</span>
                <span className={styles.description}>{items[name].description}</span>
              </span>
            </NextLink>
          </li>
        ))}
      </ul>
    </section>
  );
};
