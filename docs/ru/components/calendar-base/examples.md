# CalendarBase: примеры

## Базовый

### Базовый: календарь дней из базовых частей

`CalendarBase` — оболочка для календаря, который приложение собирает само: она передаёт `size` и `variant` кнопкам заголовка и подписям дней недели, а месяцем управляет приложение. Строка дней недели находится внутри `DayPicker`, потому что это строка сетки, и её порядок совпадает с `weekStartsOn` раскладки. `DayPicker` сохраняет активную ячейку при смене `month`, поэтому пример переносит `active` вместе с месяцем, чтобы в порядке табуляции оставалась ячейка.

<!-- example: calendar-base/day-calendar-from-base-parts.tsx -->
```tsx
import {
  CalendarBase,
  CalendarBaseControlIconButton,
  CalendarBaseHeader,
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  Icon,
  Text,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useState } from 'react';

const LOCALE = 'en-GB';
const WEEK_START = 1;
const weekdayFormat = new Intl.DateTimeFormat(LOCALE, { weekday: 'short', timeZone: 'UTC' });
const monthFormat = new Intl.DateTimeFormat(LOCALE, { month: 'long', year: 'numeric', timeZone: 'UTC' });
const weekdays = Array.from({ length: 7 }, (_, index) => weekdayFormat.format(Date.UTC(2026, 10, 1 + WEEK_START + index)));

function addMonths(month: string, amount: number) {
  const date = new Date(month);
  date.setUTCMonth(date.getUTCMonth() + amount);

  return date.toISOString().slice(0, 10);
}

export default function DayCalendarFromBaseParts() {
  const [month, setMonth] = useState('2026-11-01');
  const [active, setActive] = useState('2026-11-01');
  const [selected, setSelected] = useState<string | null>(null);

  const showMonth = (amount: number) => {
    const next = addMonths(month, amount);
    setMonth(next);
    setActive(next);
  };

  return (
    <CalendarBase compact>
      <CalendarBaseHeader>
        <CalendarBaseControlIconButton aria-label='Previous month' onClick={() => showMonth(-1)}>
          <Icon><ChevronLeft /></Icon>
        </CalendarBaseControlIconButton>
        <Text fontWeight={600} aria-live='polite' style={{ alignSelf: 'center' }}>
          {monthFormat.format(new Date(month))}
        </Text>
        <CalendarBaseControlIconButton aria-label='Next month' onClick={() => showMonth(1)}>
          <Icon><ChevronRight /></Icon>
        </CalendarBaseControlIconButton>
      </CalendarBaseHeader>
      <DayPicker
        aria-label={monthFormat.format(new Date(month))}
        locale={LOCALE}
        month={month}
        active={active}
        onChangeActive={setActive}
        selected={selected}
        onSelectCell={setSelected}
      >
        <CalendarBaseWeekLabels>
          {weekdays.map((weekday) => (
            <CalendarBaseWeekLabel key={weekday}>{weekday}</CalendarBaseWeekLabel>
          ))}
        </CalendarBaseWeekLabels>
        <DayPickerLayout weekStartsOn={WEEK_START}>
          <DayPickerCell />
        </DayPickerLayout>
      </DayPicker>
    </CalendarBase>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: заголовок с динамическими подписями

Одна `CalendarBasePickerButton` переключает дни и месяцы и сообщает состояние через `aria-pressed`; подписи кнопок «назад» / «вперёд» меняются вместе с видом, потому что те же кнопки шагают на месяц или на год.

<!-- example: calendar-base/header-with-dynamic-labels.tsx -->
```tsx
import {
  CalendarBase,
  CalendarBaseControlIconButton,
  CalendarBaseHeader,
  CalendarBasePickerButton,
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  Icon,
  MonthPicker,
  MonthPickerCell,
  MonthPickerLayout,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useState } from 'react';

export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];
const WEEK_START = 0;

function addMonths(month: string, amount: number) {
  const date = new Date(month);
  date.setUTCMonth(date.getUTCMonth() + amount);

  return date.toISOString().slice(0, 10);
}

export default function HeaderWithDynamicLabels({ locale = 'en-US' }: { locale?: string }) {
  const weekdayFormat = new Intl.DateTimeFormat(locale, { weekday: 'short', timeZone: 'UTC' });
  const monthFormat = new Intl.DateTimeFormat(locale, { month: 'long', timeZone: 'UTC' });
  const yearFormat = new Intl.DateTimeFormat(locale, { year: 'numeric', timeZone: 'UTC' });
  const weekdays = Array.from({ length: 7 }, (_, index) => weekdayFormat.format(Date.UTC(2026, 10, 1 + WEEK_START + index)));

  const [view, setView] = useState<'day' | 'month'>('day');
  const [month, setMonth] = useState('2026-11-01');
  const [active, setActive] = useState('2026-11-01');

  const step = view === 'day' ? 1 : 12;

  const showMonth = (next: string) => {
    setMonth(next);
    setActive(next);
  };

  const pickMonth = (next: string) => {
    showMonth(next);
    setView('day');
  };

  const toggleView = () => {
    setActive(month);
    setView(view === 'day' ? 'month' : 'day');
  };

  return (
    <CalendarBase compact>
      <CalendarBaseHeader>
        <CalendarBaseControlIconButton
          aria-label={view === 'day' ? 'Previous month' : 'Previous year'}
          onClick={() => showMonth(addMonths(month, -step))}
        >
          <Icon><ChevronLeft /></Icon>
        </CalendarBaseControlIconButton>
        <CalendarBasePickerButton aria-pressed={view === 'month'} onClick={toggleView}>
          {monthFormat.format(new Date(month))} {yearFormat.format(new Date(month))}
        </CalendarBasePickerButton>
        <CalendarBaseControlIconButton
          aria-label={view === 'day' ? 'Next month' : 'Next year'}
          onClick={() => showMonth(addMonths(month, step))}
        >
          <Icon><ChevronRight /></Icon>
        </CalendarBaseControlIconButton>
      </CalendarBaseHeader>
      {view === 'day' && (
        <DayPicker aria-label='Days' locale={locale} month={month} active={active} onChangeActive={setActive}>
          <CalendarBaseWeekLabels>
            {weekdays.map((weekday) => (
              <CalendarBaseWeekLabel key={weekday}>{weekday}</CalendarBaseWeekLabel>
            ))}
          </CalendarBaseWeekLabels>
          <DayPickerLayout weekStartsOn={WEEK_START}>
            <DayPickerCell />
          </DayPickerLayout>
        </DayPicker>
      )}
      {view === 'month' && (
        <MonthPicker
          aria-label='Months'
          locale={locale}
          year={month}
          active={active}
          onChangeActive={setActive}
          selected={month}
          onSelectCell={pickMonth}
        >
          <MonthPickerLayout format='short'>
            <MonthPickerCell />
          </MonthPickerLayout>
        </MonthPicker>
      )}
    </CalendarBase>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: два месяца в одной оболочке

Две `DayPickerLayout` внутри одного `DayPicker` позволяют диапазону пересечь границу месяца; разные `offset` сохраняют индексы строк уникальными. У каждого месяца своя строка дней недели и `aria-label` на группе строк, поэтому видимые заголовки месяцев можно скрыть от скринридера.

<!-- example: calendar-base/two-month-range.tsx -->
```tsx
import {
  CalendarBase,
  CalendarBaseControlIconButton,
  CalendarBaseHeader,
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  Icon,
  Text,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useState } from 'react';

export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];
const WEEK_START = 0;

function addMonths(month: string, amount: number) {
  const date = new Date(month);
  date.setUTCMonth(date.getUTCMonth() + amount);

  return date.toISOString().slice(0, 10);
}

export default function TwoMonthRange({ locale = 'en-US' }: { locale?: string }) {
  const weekdayFormat = new Intl.DateTimeFormat(locale, { weekday: 'narrow', timeZone: 'UTC' });
  const monthFormat = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric', timeZone: 'UTC' });
  const rangeFormat = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric', timeZone: 'UTC' });
  const weekdays = Array.from({ length: 7 }, (_, index) => weekdayFormat.format(Date.UTC(2026, 10, 1 + WEEK_START + index)));

  const [month, setMonth] = useState('2026-11-01');
  const [active, setActive] = useState('2026-11-01');
  const [range, setRange] = useState<string[]>([]);

  const nextMonth = addMonths(month, 1);
  const [start, end] = range;

  const showMonth = (amount: number) => {
    const next = addMonths(month, amount);
    setMonth(next);
    setActive(next);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <CalendarBase>
        <CalendarBaseHeader>
          <CalendarBaseControlIconButton aria-label='Previous month' onClick={() => showMonth(-1)}>
            <Icon><ChevronLeft /></Icon>
          </CalendarBaseControlIconButton>
          <CalendarBaseControlIconButton aria-label='Next month' onClick={() => showMonth(1)}>
            <Icon><ChevronRight /></Icon>
          </CalendarBaseControlIconButton>
        </CalendarBaseHeader>
        <DayPicker
          aria-label='Trip dates'
          locale={locale}
          selection='range'
          month={month}
          active={active}
          onChangeActive={setActive}
          selected={range}
          onSelectCell={setRange}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--spacing-16)', width: '100%' }}
        >
          {[month, nextMonth].map((visible, index) => (
            <div key={visible} role='presentation' style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
              <Text aria-hidden fontWeight={600} style={{ textAlign: 'center' }}>{monthFormat.format(new Date(visible))}</Text>
              <CalendarBaseWeekLabels>
                {weekdays.map((weekday, col) => (
                  <CalendarBaseWeekLabel key={col}>{weekday}</CalendarBaseWeekLabel>
                ))}
              </CalendarBaseWeekLabels>
              <DayPickerLayout
                aria-label={monthFormat.format(new Date(visible))}
                month={visible}
                offset={index}
                weekStartsOn={WEEK_START}
              >
                <DayPickerCell />
              </DayPickerLayout>
            </div>
          ))}
        </DayPicker>
      </CalendarBase>
      <Text aria-live='polite' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {start && end ? rangeFormat.formatRange(new Date(start), new Date(end)) : 'Pick departure and return'}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Отключённый

### Отключённый: навигация внутри окна

`from` и `to` у `DayPicker` отключают дни вне окна, а приложение отключает кнопки «назад» / «вперёд» на первом и последнем месяце. Правило написано рядом с сеткой и связано через `aria-describedby`.

<!-- example: calendar-base/navigation-within-a-window.tsx -->
```tsx
import {
  CalendarBase,
  CalendarBaseControlIconButton,
  CalendarBaseHeader,
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  HelperText,
  Icon,
  Text,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useId, useState } from 'react';

const LOCALE = 'en-US';
const WEEK_START = 0;
const FIRST_DAY = '2026-11-16';
const LAST_DAY = '2027-01-15';
const weekdayFormat = new Intl.DateTimeFormat(LOCALE, { weekday: 'short', timeZone: 'UTC' });
const monthFormat = new Intl.DateTimeFormat(LOCALE, { month: 'long', year: 'numeric', timeZone: 'UTC' });
const weekdays = Array.from({ length: 7 }, (_, index) => weekdayFormat.format(Date.UTC(2026, 10, 1 + WEEK_START + index)));

function addMonths(month: string, amount: number) {
  const date = new Date(month);
  date.setUTCMonth(date.getUTCMonth() + amount);

  return date.toISOString().slice(0, 10);
}

function getMonthStart(day: string) {
  return `${day.slice(0, 7)}-01`;
}

export default function NavigationWithinAWindow() {
  const [month, setMonth] = useState(getMonthStart(FIRST_DAY));
  const [active, setActive] = useState(FIRST_DAY);
  const hintId = useId();

  const isFirstMonth = month === getMonthStart(FIRST_DAY);
  const isLastMonth = month === getMonthStart(LAST_DAY);

  const showMonth = (amount: number) => {
    const next = addMonths(month, amount);
    setMonth(next);
    setActive(next < FIRST_DAY ? FIRST_DAY : next);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start', width: '100%' }}>
      <CalendarBase compact>
        <CalendarBaseHeader>
          <CalendarBaseControlIconButton aria-label='Previous month' disabled={isFirstMonth} onClick={() => showMonth(-1)}>
            <Icon><ChevronLeft /></Icon>
          </CalendarBaseControlIconButton>
          <Text fontWeight={600} style={{ alignSelf: 'center' }}>{monthFormat.format(new Date(month))}</Text>
          <CalendarBaseControlIconButton aria-label='Next month' disabled={isLastMonth} onClick={() => showMonth(1)}>
            <Icon><ChevronRight /></Icon>
          </CalendarBaseControlIconButton>
        </CalendarBaseHeader>
        <DayPicker
          aria-label='Return date'
          aria-describedby={hintId}
          locale={LOCALE}
          month={month}
          from={FIRST_DAY}
          to={LAST_DAY}
          active={active}
          onChangeActive={setActive}
        >
          <CalendarBaseWeekLabels>
            {weekdays.map((weekday) => (
              <CalendarBaseWeekLabel key={weekday}>{weekday}</CalendarBaseWeekLabel>
            ))}
          </CalendarBaseWeekLabels>
          <DayPickerLayout weekStartsOn={WEEK_START}>
            <DayPickerCell />
          </DayPickerLayout>
        </DayPicker>
      </CalendarBase>
      <HelperText id={hintId}>Returns are accepted from November 16 to January 15.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: компактные подписи дней недели

Узкие названия дней недели во многих локалях повторяют буквы (S, M, T, W, T, F, S), поэтому каждая подпись получает полное название в `aria-label`. `compact` с `size='xs'` держит оболочку не шире сетки.

<!-- example: calendar-base/compact-weekday-labels.tsx -->
```tsx
import {
  CalendarBase,
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
} from '@vega-ui/react';

const LOCALE = 'en-US';
const WEEK_START = 0;
const narrowFormat = new Intl.DateTimeFormat(LOCALE, { weekday: 'narrow', timeZone: 'UTC' });
const longFormat = new Intl.DateTimeFormat(LOCALE, { weekday: 'long', timeZone: 'UTC' });

const weekdays = Array.from({ length: 7 }, (_, index) => {
  const date = Date.UTC(2026, 10, 1 + WEEK_START + index);

  return { narrow: narrowFormat.format(date), long: longFormat.format(date) };
});

export default function CompactWeekdayLabels() {
  return (
    <CalendarBase compact size='xs'>
      <DayPicker aria-label='November 2026' locale={LOCALE} month='2026-11-01'>
        <CalendarBaseWeekLabels>
          {weekdays.map(({ narrow, long }) => (
            <CalendarBaseWeekLabel key={long} aria-label={long} title={long}>{narrow}</CalendarBaseWeekLabel>
          ))}
        </CalendarBaseWeekLabels>
        <DayPickerLayout weekStartsOn={WEEK_START}>
          <DayPickerCell />
        </DayPickerLayout>
      </DayPicker>
    </CalendarBase>
  );
}
```
<!-- /example -->

### Пограничный случай: оболочка справа налево

`dir='rtl'` на `CalendarBase` отражает заголовок и сетку, но базовые части не меняют иконки местами: кнопке «назад» нужен шеврон вправо, а кнопке «вперёд» — влево. Кнопки навигации `Calendar` разворачивают шевроны сами.

<!-- example: calendar-base/right-to-left-shell.tsx -->
```tsx
import {
  CalendarBase,
  CalendarBaseControlIconButton,
  CalendarBaseHeader,
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  Icon,
  Text,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useState } from 'react';

const LOCALE = 'he-IL';
const WEEK_START = 0;
const weekdayFormat = new Intl.DateTimeFormat(LOCALE, { weekday: 'narrow', timeZone: 'UTC' });
const monthFormat = new Intl.DateTimeFormat(LOCALE, { month: 'long', year: 'numeric', timeZone: 'UTC' });
const weekdays = Array.from({ length: 7 }, (_, index) => weekdayFormat.format(Date.UTC(2026, 10, 1 + WEEK_START + index)));

function addMonths(month: string, amount: number) {
  const date = new Date(month);
  date.setUTCMonth(date.getUTCMonth() + amount);

  return date.toISOString().slice(0, 10);
}

export default function RightToLeftShell() {
  const [month, setMonth] = useState('2026-11-01');
  const [active, setActive] = useState('2026-11-01');

  const showMonth = (amount: number) => {
    const next = addMonths(month, amount);
    setMonth(next);
    setActive(next);
  };

  return (
    <CalendarBase compact dir='rtl' lang={LOCALE}>
      <CalendarBaseHeader>
        <CalendarBaseControlIconButton aria-label='החודש הקודם' onClick={() => showMonth(-1)}>
          <Icon><ChevronRight /></Icon>
        </CalendarBaseControlIconButton>
        <Text fontWeight={600} style={{ alignSelf: 'center' }}>{monthFormat.format(new Date(month))}</Text>
        <CalendarBaseControlIconButton aria-label='החודש הבא' onClick={() => showMonth(1)}>
          <Icon><ChevronLeft /></Icon>
        </CalendarBaseControlIconButton>
      </CalendarBaseHeader>
      <DayPicker aria-label='ימים' locale={LOCALE} month={month} active={active} onChangeActive={setActive}>
        <CalendarBaseWeekLabels>
          {weekdays.map((weekday, col) => (
            <CalendarBaseWeekLabel key={col}>{weekday}</CalendarBaseWeekLabel>
          ))}
        </CalendarBaseWeekLabels>
        <DayPickerLayout weekStartsOn={WEEK_START}>
          <DayPickerCell />
        </DayPickerLayout>
      </DayPicker>
    </CalendarBase>
  );
}
```
<!-- /example -->
