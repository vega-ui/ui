'use client';

import { useSyncExternalStore, type ReactNode } from 'react';
import { getDictionary, LOCALES, type Locale } from '@/lib/i18n';
import { withSiteName } from '@/lib/site';
import styles from './NotFound.module.css';

const subscribe = () => () => {};

const readLocale = () => document.documentElement.lang;

export const NotFoundTitle = () => {
  const lang = useSyncExternalStore(subscribe, readLocale, () => 'en');
  const locale = LOCALES.find((entry) => entry === lang) ?? 'en';

  return <title>{withSiteName(getDictionary(locale).notFound.title)}</title>;
};

export const NotFoundChrome = ({ chrome }: { chrome: Record<Locale, ReactNode> }) => {
  const locale = useSyncExternalStore(subscribe, readLocale, () => '');
  const shown = LOCALES.filter((entry) => !locale || entry === locale);

  return shown.map((entry) => (
    <div key={entry} lang={entry} data-locale={entry} className={styles.chrome}>
      {chrome[entry]}
    </div>
  ));
};
