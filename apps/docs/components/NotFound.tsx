'use client';

import NextLink from 'next/link';
import { Button, Heading, Text } from '@vega-ui/react';
import { getDictionary, LOCALES, localize } from '@/lib/i18n';
import styles from './NotFound.module.css';

export const NotFound = () => (
  <main id='content' tabIndex={-1} className={`site-panel ${styles.panel}`}>
    {LOCALES.map((locale) => {
      const t = getDictionary(locale).notFound;

      return (
        <section key={locale} lang={locale} className={`site-frame ${styles.page}`} data-locale={locale}>
          <Text className={styles.code}>404</Text>
          <Heading as='h1' fontWeight={600} className={styles.title}>{t.title}</Heading>
          <Text className={styles.text}>{t.text}</Text>
          <Text className={styles.hint}>{t.hint}</Text>
          <div className={styles.actions}>
            <Button asChild className={styles.pill}>
              <NextLink href={localize(locale, '/')}>{t.home}</NextLink>
            </Button>
            <Button asChild variant='secondary' appearance='ghost' className={styles.pill}>
              <NextLink href={localize(locale, '/components/')}>{t.components}</NextLink>
            </Button>
          </div>
        </section>
      );
    })}
  </main>
);
