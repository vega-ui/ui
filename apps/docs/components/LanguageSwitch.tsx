'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Icon, Select, SelectCombobox, SelectListbox, SelectOption } from '@vega-ui/react';
import { Languages } from '@vega-ui/icons';
import { delocalize, localize, LOCALES, type Locale } from '@/lib/i18n';
import { useDictionary, useLocale } from './LocaleProvider';
import styles from './LanguageSwitch.module.css';

const readHash = () => {
  const hash = window.location.hash;
  if (!hash) return '';

  const target = document.getElementById(decodeURIComponent(hash.slice(1)));
  const heading = target?.closest('h2, h3');
  if (!heading?.id) return hash;

  return `#${heading.id}`;
};

export const LanguageSwitch = () => {
  const { languages } = useDictionary();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const choose = (next: Locale | undefined) => {
    if (!next || next === locale) return;

    router.push(`${localize(next, delocalize(pathname))}${readHash()}`, { scroll: false });
  };

  return (
    <Select<Locale> variant='inline' size='xs' value={locale} onChangeValue={choose}>
      <SelectCombobox aria-label={languages.label} className={styles.trigger}>
        <Icon size='xs'><Languages /></Icon>
      </SelectCombobox>
      <SelectListbox>
        {LOCALES.map((value) => (
          <SelectOption key={value} value={value} lang={value}>{languages[value]}</SelectOption>
        ))}
      </SelectListbox>
    </Select>
  );
};
