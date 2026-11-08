'use client';

import { useId, useState, type FocusEvent, type KeyboardEvent } from 'react';
import NextLink from 'next/link';
import { Icon, Listbox, ListboxOption, Text } from '@vega-ui/react';
import { ChevronRight } from '@vega-ui/icons';
import type { KeyboardRow } from '@/lib/content';
import { localize, type Locale } from '@/lib/i18n';
import { useDictionary, useLocale } from './LocaleProvider';
import { HomeTitle } from './HomeTitle';
import section from './HomeSection.module.css';
import styles from './HomeKeyboard.module.css';

const LABELS = [
  'bug', 'feature', 'documentation', 'design', 'performance', 'security',
  'accessibility', 'good first issue', 'help wanted', 'needs triage', 'wontfix', 'duplicate',
];

const KEY_LABELS: Record<string, string> = {
  ArrowUp: '↑',
  ArrowDown: '↓',
  ArrowLeft: '←',
  ArrowRight: '→',
  PageUp: 'Page Up',
  PageDown: 'Page Down',
  ' ': 'Space',
};

const matchRow = (rows: KeyboardRow[], key: string) => {
  const label = KEY_LABELS[key] ?? key;
  const exact = rows.findIndex((row) => row.keys.includes(label));
  if (exact !== -1 || label.length !== 1) return exact;

  return rows.findIndex((row) => row.keys.some((rowKey) => rowKey.length === 1));
};

interface HomeKeyboardProps {
  rows: Record<Locale, KeyboardRow[]>
  count: number
}

export const HomeKeyboard = ({ rows, count }: HomeKeyboardProps) => {
  const locale = useLocale();
  const t = useDictionary().home.keyboard;
  const id = useId();
  const [selected, setSelected] = useState<string | null>('bug');
  const [pressed, setPressed] = useState(-1);
  const table = rows[locale];

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const row = matchRow(table, event.key);
    if (row !== -1) setPressed(row);
  };

  const onFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.matches(':focus-visible')) return;

    setPressed(matchRow(table, 'Tab'));
  };

  return (
    <section id='keyboard' className={`${section.section} ${styles.keyboard}`} aria-labelledby={`${id}-title`}>
      <div className={section.intro}>
        <Text className={section.eyebrow}>{t.eyebrow}</Text>
        <HomeTitle id={`${id}-title`} text={t.title} />
        <Text className={section.text}>{t.text.replace('{count}', String(count))}</Text>
        <NextLink href={localize(locale, '/components/listbox/accessibility/')} className={section.link}>
          {t.link}
          <Icon size='xs'><ChevronRight /></Icon>
        </NextLink>
      </div>
      <div className={`${section.frame} ${section.card}`} data-label='@vega-ui/react/Listbox'>
        <div className={styles.stage}>
          <Text id={`${id}-hint`} className={styles.hint}>{t.hint}</Text>
          <Listbox
            aria-label={t.list}
            aria-describedby={`${id}-hint`}
            value={selected}
            onChangeValue={setSelected}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            className={styles.listbox}
          >
            {LABELS.map((label) => (
              <ListboxOption key={label} value={label}>{label}</ListboxOption>
            ))}
          </Listbox>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope='col'>{t.key}</th>
              <th scope='col'>{t.action}</th>
            </tr>
          </thead>
          <tbody>
            {table.map((row, index) => (
              <tr key={row.keys.join()} data-pressed={pressed === index} className={styles.row}>
                <td className={styles.keys}>
                  {row.keys.map((key) => <kbd key={key} className={styles.kbd}>{key}</kbd>)}
                </td>
                <td>
                  {row.text.split('`').map((part, partIndex) => partIndex % 2 === 1 ? <code key={partIndex}>{part}</code> : part)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
