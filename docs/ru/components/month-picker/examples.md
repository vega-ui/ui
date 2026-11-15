# MonthPicker: примеры

## Базовый

### Базовый: месяцы одного года

`MonthPickerLayout` рендерит все месяцы года, в котором находится месяц в фокусе; без `focusedDate` это первый выбранный месяц. Ключ каждой ячейки — первый день её месяца, поэтому `defaultValue` для марта — `'2026-03-01'`. У сетки нет видимого заголовка, поэтому ей передан `aria-label`.

<!-- example: month-picker/months-of-one-year.tsx -->
```tsx
import { MonthPicker, MonthPickerCell, MonthPickerLayout } from '@vega-ui/react';

export default function MonthsOfOneYear() {
  return (
    <MonthPicker aria-label='Start month, 2026' locale='en-US' defaultValue='2026-03-01' style={{ width: '100%' }}>
      <MonthPickerLayout>
        <MonthPickerCell />
      </MonthPickerLayout>
    </MonthPicker>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: месяц оплаты с переключением года

Выбранный месяц и месяц в фокусе — отдельные части состояния: кнопки переносят `focusedDate` на тот же месяц предыдущего или следующего года, клик меняет выбор, а строка ниже показывает результат. Пикер показывает год месяца в фокусе и держит на нём точку Tab; `onChangeFocusedDate` синхронизирует состояние, когда фокус перемещается внутри сетки.

<!-- example: month-picker/billing-month-with-year-navigation.tsx -->
```tsx
import {
  Icon,
  IconButton,
  MonthPicker,
  MonthPickerCell,
  MonthPickerLayout,
  Text,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useState } from 'react';

const monthFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export default function BillingMonthWithYearNavigation() {
  const [focused, setFocused] = useState('2026-10-01');
  const [month, setMonth] = useState<string | null>('2026-10-01');

  const year = Number(focused.slice(0, 4));

  const showYear = (next: number) => {
    setFocused(`${next}${focused.slice(4)}`);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton aria-label='Previous year' size='sm' variant='secondary' appearance='ghost' onClick={() => showYear(year - 1)}>
          <Icon><ChevronLeft /></Icon>
        </IconButton>
        <Text fontWeight={600} aria-live='polite'>{year}</Text>
        <IconButton aria-label='Next year' size='sm' variant='secondary' appearance='ghost' onClick={() => showYear(year + 1)}>
          <Icon><ChevronRight /></Icon>
        </IconButton>
      </div>
      <MonthPicker
        aria-label={`Billing month, ${year}`}
        locale='en-US'
        focusedDate={focused}
        onChangeFocusedDate={setFocused}
        value={month}
        onChangeValue={setMonth}
        style={{ width: '100%' }}
      >
        <MonthPickerLayout cols={4} format='short'>
          <MonthPickerCell />
        </MonthPickerLayout>
      </MonthPicker>
      <Text>Invoice for {month ? monthFormat.format(new Date(month)) : '—'}</Text>
    </div>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: период отчёта

`selection='range'` выбирает период из месяцев. Ячейки — начала месяцев, поэтому форма отправляет начало как есть, а конец превращает в последний день его месяца; `FormData` читает оба значения обратно, проверка на пустоту использует связанную подсказку, а сброс очищает состояние.

<!-- example: month-picker/report-period.tsx -->
```tsx
import {
  Button,
  Fieldset,
  FieldsetLegend,
  HelperText,
  MonthPicker,
  MonthPickerCell,
  MonthPickerLayout,
  Text,
} from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

function getMonthEnd(monthStart: string) {
  const date = new Date(monthStart);
  date.setUTCMonth(date.getUTCMonth() + 1, 0);

  return date.toISOString().slice(0, 10);
}

export default function ReportPeriod() {
  const [period, setPeriod] = useState<string[]>([]);
  const [missing, setMissing] = useState(false);
  const [query, setQuery] = useState('');
  const hintId = useId();

  const [from, to] = period;

  const change = (next: string[]) => {
    setPeriod(next);
    setMissing(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!data.get('from') || !data.get('to')) {
      setMissing(true);
      return;
    }

    setQuery(new URLSearchParams({ from: String(data.get('from')), to: String(data.get('to')) }).toString());
  };

  const reset = () => {
    setPeriod([]);
    setMissing(false);
    setQuery('');
  };

  return (
    <form onSubmit={submit} onReset={reset} style={{ display: 'grid', gap: 'var(--spacing-12)', justifyItems: 'start', width: '100%' }}>
      <Fieldset>
        <FieldsetLegend>Report period</FieldsetLegend>
        <MonthPicker
          aria-label='Report period, 2026'
          aria-describedby={hintId}
          locale='en-US'
          selection='range'
          defaultFocusedDate='2026-01-01'
          value={period}
          onChangeValue={change}
        >
          <MonthPickerLayout cols={4} format='short'>
            <MonthPickerCell />
          </MonthPickerLayout>
        </MonthPicker>
        <HelperText id={hintId} invalid={missing}>
          {missing ? 'Pick the first and the last month of the period.' : 'Pick the first and the last month.'}
        </HelperText>
      </Fieldset>
      <input type='hidden' name='from' value={from ?? ''} />
      <input type='hidden' name='to' value={to ? getMonthEnd(to) : ''} />
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Build report</Button>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
      </div>
      <Text aria-live='polite'>{query ? `GET /reports?${query}` : ''}</Text>
    </form>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: фильтр по месяцу в поповере

Компактная сетка месяцев за триггером — для фильтра выписок или дашборда. Поповер контролируемый и закрывается после выбора месяца; месяцы после последней выписки отключены через `max`.

<!-- example: month-picker/month-filter-in-a-popover.tsx -->
```tsx
import {
  Button,
  Icon,
  MonthPicker,
  MonthPickerCell,
  MonthPickerLayout,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import { ChevronDown } from '@vega-ui/icons';
import { useState } from 'react';

const triggerFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export default function MonthFilterInAPopover() {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState('2026-10-01');

  const pick = (next: string) => {
    setMonth(next);
    setOpen(false);
  };

  return (
    <Popover open={open} onChangeOpen={setOpen} placement='bottom-start' role='dialog'>
      <PopoverTrigger asChild>
        <Button variant='secondary' appearance='ghost' aria-label={`Statement month, ${triggerFormat.format(new Date(month))}`}>
          {triggerFormat.format(new Date(month))}
          <Icon size='sm'><ChevronDown /></Icon>
        </Button>
      </PopoverTrigger>
      <PopoverContent aria-label='Choose a statement month'>
        <MonthPicker
          aria-label='Statement month, 2026'
          locale='en-US'
          max='2026-10-01'
          value={month}
          onChangeValue={pick}
        >
          <MonthPickerLayout cols={4} format='short'>
            <MonthPickerCell />
          </MonthPickerLayout>
        </MonthPicker>
      </PopoverContent>
    </Popover>
  );
}
```
<!-- /example -->

## Ошибка

### Ошибка: слишком длинный период

Пикер не ограничивает длину диапазона. Приложение считает месяцы и превращает подсказку, связанную с сеткой, в ошибку, пока период длиннее шести месяцев.

<!-- example: month-picker/period-too-long.tsx -->
```tsx
import {
  HelperText,
  MonthPicker,
  MonthPickerCell,
  MonthPickerLayout,
} from '@vega-ui/react';
import { useId, useState } from 'react';

const MAX_MONTHS = 6;

function countMonths(from?: string, to?: string) {
  if (!from || !to) return 0;

  const years = Number(to.slice(0, 4)) - Number(from.slice(0, 4));
  const months = Number(to.slice(5, 7)) - Number(from.slice(5, 7));

  return years * 12 + months + 1;
}

export default function PeriodTooLong() {
  const [period, setPeriod] = useState<string[]>(['2026-02-01', '2026-10-01']);
  const messageId = useId();

  const [from, to] = period;
  const months = countMonths(from, to);
  const invalid = months > MAX_MONTHS;

  let message = `Compare up to ${MAX_MONTHS} months.`;
  if (months > 0) message = `${months} months selected. Compare up to ${MAX_MONTHS} months.`;
  if (invalid) message = `${months} months is too long. Pick ${MAX_MONTHS} months or fewer.`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start', width: '100%' }}>
      <MonthPicker
        aria-label='Comparison period, 2026'
        aria-describedby={messageId}
        locale='en-US'
        selection='range'
        defaultFocusedDate='2026-02-01'
        value={period}
        onChangeValue={setPeriod}
        style={{ width: '100%' }}
      >
        <MonthPickerLayout cols={4} format='short'>
          <MonthPickerCell />
        </MonthPickerLayout>
      </MonthPicker>
      <HelperText id={messageId} invalid={invalid} aria-live='polite'>{message}</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Отключённый

### Отключённый: месяцы без данных

`min` и `max` отключают месяцы вне периода, за который есть данные, — здесь с июня 2025 по октябрь 2026. Правило написано рядом с сеткой и связано через `aria-describedby`; одно отключённое состояние его не объясняет.

<!-- example: month-picker/months-without-data.tsx -->
```tsx
import {
  HelperText,
  MonthPicker,
  MonthPickerCell,
  MonthPickerLayout,
} from '@vega-ui/react';
import { useId } from 'react';

export default function MonthsWithoutData() {
  const hintId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start', width: '100%' }}>
      <MonthPicker
        aria-label='Statement month, 2026'
        aria-describedby={hintId}
        locale='en-US'
        defaultFocusedDate='2026-01-01'
        min='2025-06-01'
        max='2026-10-01'
        style={{ width: '100%' }}
      >
        <MonthPickerLayout cols={4} format='short'>
          <MonthPickerCell />
        </MonthPickerLayout>
      </MonthPicker>
      <HelperText id={hintId}>Statements are available from June 2025 to October 2026.</HelperText>
    </div>
  );
}
```
<!-- /example -->

### Отключённый: отдельные месяцы

Массив начал месяцев отключает ровно эти месяцы — например, те, в которые сезонная площадка закрыта.

<!-- example: month-picker/specific-months.tsx -->
```tsx
import {
  HelperText,
  MonthPicker,
  MonthPickerCell,
  MonthPickerLayout,
} from '@vega-ui/react';
import { useId } from 'react';

const closedMonths = ['2026-01-01', '2026-02-01', '2026-12-01'];

export default function SpecificMonths() {
  const hintId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start', width: '100%' }}>
      <MonthPicker
        aria-label='Event month, 2026'
        aria-describedby={hintId}
        locale='en-US'
        defaultFocusedDate='2026-01-01'
        disabledDates={closedMonths}
        style={{ width: '100%' }}
      >
        <MonthPickerLayout cols={4} format='short'>
          <MonthPickerCell />
        </MonthPickerLayout>
      </MonthPicker>
      <HelperText id={hintId}>The terrace is closed in December, January and February.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: год из 13 месяцев

С календарной системой из `createCalendarSystem` (см. [Адаптер календарной системы](../../i18n.md#адаптер-календарной-системы)) сетка показывает месяцы этого календаря. Еврейский год 5784 — високосный, в нём 13 месяцев, включая Адар I и Адар II, поэтому последняя строка неполная. Выбранный Адар I — месяц в фокусе, поэтому пикер показывает его год; первый месяц этого года начинается `2023-09-16`, а ключ каждой ячейки — ISO-день начала её месяца, а не начало григорианского месяца: у Адара I это `'2024-02-10'`.

<!-- example: month-picker/13-month-year.tsx -->
```tsx
import { createCalendarSystem } from '@vega-ui/i18n';
import { MonthPicker, MonthPickerCell, MonthPickerLayout, Text } from '@vega-ui/react';
import { useState } from 'react';

const hebrewCalendar = createCalendarSystem('hebrew');

export default function ThirteenMonthYear() {
  const [month, setMonth] = useState<string | null>('2024-02-10');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <MonthPicker
        aria-label='Month of 5784'
        calendar={hebrewCalendar}
        locale='en-US'
        value={month}
        onChangeValue={setMonth}
        style={{ width: '100%' }}
      >
        <MonthPickerLayout cols={4}>
          <MonthPickerCell />
        </MonthPickerLayout>
      </MonthPicker>
      <Text aria-live='polite' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Cell key: {month ?? 'none'}</Text>
    </div>
  );
}
```
<!-- /example -->
