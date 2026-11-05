'use client';

import { useId, useState } from 'react';
import NextLink from 'next/link';
import { createCalendarSystem } from '@vega-ui/i18n';
import {
  Calendar,
  CalendarContent,
  CalendarDay,
  CalendarDays,
  CalendarHeader,
  CalendarMonthLabel,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYearLabel,
  Icon,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  Text,
} from '@vega-ui/react';
import { ChevronRight } from '@vega-ui/icons';
import { localize } from '@/lib/i18n';
import { useDictionary, useLocale } from './LocaleProvider';
import { HomeTitle } from './HomeTitle';
import section from './HomeSection.module.css';
import styles from './HomeWorld.module.css';

const PRESETS = [
  { locale: 'en-US', name: 'English', calendar: 'gregory', dir: 'ltr', previous: 'Previous month', next: 'Next month' },
  { locale: 'de-DE', name: 'Deutsch', calendar: 'gregory', dir: 'ltr', previous: 'Vorheriger Monat', next: 'Nächster Monat' },
  { locale: 'ja-JP', name: '日本語', calendar: 'japanese', dir: 'ltr', previous: '前の月', next: '次の月' },
  { locale: 'he-IL', name: 'עברית', calendar: 'hebrew', dir: 'rtl', previous: 'החודש הקודם', next: 'החודש הבא' },
  { locale: 'ar-SA', name: 'العربية', calendar: 'islamic-umalqura', dir: 'rtl', previous: 'الشهر السابق', next: 'الشهر التالي' },
  { locale: 'fa-IR', name: 'فارسی', calendar: 'persian', dir: 'rtl', previous: 'ماه قبل', next: 'ماه بعد' },
];

const CALENDARS = Object.fromEntries(PRESETS.filter((preset) => preset.calendar !== 'gregory').map((preset) => [preset.calendar, createCalendarSystem(preset.calendar)]));

export const HomeWorld = () => {
  const locale = useLocale();
  const t = useDictionary().home.world;
  const id = useId();
  const [preset, setPreset] = useState(PRESETS[0]);
  const [date, setDate] = useState<string | undefined>('2026-10-23');
  const shown = date ? new Intl.DateTimeFormat(preset.locale, { calendar: preset.calendar, dateStyle: 'long', timeZone: 'UTC' }).format(new Date(date)) : '—';
  const rows = [
    { name: t.value, value: date ?? '—' },
    { name: t.locale, value: preset.locale },
    { name: t.calendar, value: preset.calendar },
    { name: t.direction, value: preset.dir },
  ];

  return (
    <section id='world' className={`${section.section}`} aria-labelledby={`${id}-title`}>
      <div className={section.intro}>
        <Text className={section.eyebrow}>{t.eyebrow}</Text>
        <HomeTitle id={`${id}-title`} text={t.title} />
        <Text className={section.text}>{t.text}</Text>
        <NextLink href={localize(locale, '/docs/i18n/')} className={section.link}>
          {t.link}
          <Icon size='xs'><ChevronRight /></Icon>
        </NextLink>
      </div>
      <div className={`${section.frame} ${section.card}`} data-label='Intl.DateTimeFormat'>
        <div className={styles.stage}>
          <SegmentedControl size='xs' variant='secondary' className={styles.locales} name={`${id}-locale`} role='radiogroup' aria-label={t.locales} value={preset.locale} onChange={(event) => setPreset(PRESETS.find((entry) => entry.locale === event.target.value) ?? PRESETS[0])}>
            {PRESETS.map((entry) => (
              <SegmentedControlItem key={entry.locale} value={entry.locale}>
                <SegmentedControlItemInput />
                <span lang={entry.locale}>{entry.name}</span>
              </SegmentedControlItem>
            ))}
            <SegmentedControlIndicator />
          </SegmentedControl>
          <Calendar
            key={preset.locale}
            lang={preset.locale}
            dir={preset.dir}
            locale={preset.locale}
            calendar={CALENDARS[preset.calendar]}
            value={date}
            onChangeValue={setDate}
            className={styles.calendar}
          >
            <CalendarHeader>
              <CalendarPrevButton aria-label={preset.previous} />
              <Text fontWeight={600}><CalendarMonthLabel /> <CalendarYearLabel /></Text>
              <CalendarNextButton aria-label={preset.next} />
            </CalendarHeader>
            <CalendarContent>
              <CalendarDays>
                <CalendarWeekdays format='narrow'>
                  <CalendarWeekday />
                </CalendarWeekdays>
                <CalendarWeeks>
                  <CalendarDay />
                </CalendarWeeks>
              </CalendarDays>
            </CalendarContent>
          </Calendar>
        </div>
        <div className={section.readout}>
          <span className={section.readoutLabel}>{t.readout}</span>
          <dl className={section.states}>
            {rows.map((row) => (
              <div key={`${row.name}-${row.value}`} className={section.state}>
                <dt>{row.name}</dt>
                <dd data-value={row.name === t.value}>{row.value}</dd>
              </div>
            ))}
            <div key={shown} className={section.state}>
              <dt>{t.shown}</dt>
              <dd lang={preset.locale} dir={preset.dir} className={styles.shown}>{shown}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};
