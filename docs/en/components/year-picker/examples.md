# YearPicker Examples

## Basic

### Basic: a page of years

`YearPickerLayout` renders a page of `rows × cols` years (12 by default) that starts with the year given by `year`. Cells are keyed by the first day of each year, so `defaultSelected` is `'2026-01-01'`. The grid has no visible title, so it gets an `aria-label`.

<!-- example: year-picker/a-page-of-years.tsx -->
```tsx
import { YearPicker, YearPickerCell, YearPickerLayout } from '@vega-ui/react';

export default function APageOfYears() {
  return (
    <YearPicker aria-label='Model year' locale='en-US' year='2026-01-01' defaultSelected='2026-01-01' style={{ width: '100%' }}>
      <YearPickerLayout>
        <YearPickerCell />
      </YearPickerLayout>
    </YearPicker>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: selected year

`selected` and `onSelectCell` make the selection controlled. The scroller pages through years, and `year` keeps the page of the selected year in view; `null` means nothing is selected.

<!-- example: year-picker/selected-year.tsx -->
```tsx
import {
  Text,
  YearPicker,
  YearPickerCell,
  YearPickerScroller,
  YearPickerScrollerContent,
  YearPickerScrollerLayout,
} from '@vega-ui/react';
import { useState } from 'react';

export default function SelectedYear() {
  const [year, setYear] = useState<string | null>('2024-01-01');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <YearPicker aria-label='Model year' locale='en-US' year={year ?? '2026-01-01'} selected={year} onSelectCell={setYear}>
        <YearPickerScroller>
          <YearPickerScrollerContent>
            <YearPickerScrollerLayout>
              <YearPickerCell />
            </YearPickerScrollerLayout>
          </YearPickerScrollerContent>
        </YearPickerScroller>
      </YearPicker>
      <Text aria-live='polite' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Model year: {year ? year.slice(0, 4) : 'not set'}</Text>
    </div>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: year range filter

`selection='range'` picks a span of years. The form submits the first year as is and the end as the last day of its year, reads both back with `FormData`, reuses the linked hint for the empty check, and clears the state on reset.

<!-- example: year-picker/year-range-filter.tsx -->
```tsx
import {
  Button,
  Fieldset,
  FieldsetLegend,
  HelperText,
  Text,
  YearPicker,
  YearPickerCell,
  YearPickerLayout,
} from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

function getYearEnd(yearStart: string) {
  return `${yearStart.slice(0, 4)}-12-31`;
}

export default function YearRangeFilter() {
  const [years, setYears] = useState<string[]>([]);
  const [missing, setMissing] = useState(false);
  const [query, setQuery] = useState('');
  const hintId = useId();

  const [from, to] = years;

  const change = (next: string[]) => {
    setYears(next);
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
    setYears([]);
    setMissing(false);
    setQuery('');
  };

  return (
    <form onSubmit={submit} onReset={reset} style={{ display: 'grid', gap: 'var(--spacing-12)', justifyItems: 'start', width: '100%' }}>
      <Fieldset>
        <FieldsetLegend>Archive years</FieldsetLegend>
        <YearPicker
          aria-label='Archive years, 2015 to 2026'
          aria-describedby={hintId}
          locale='en-US'
          selection='range'
          year='2015-01-01'
          to='2026-01-01'
          selected={years}
          onSelectCell={change}
        >
          <YearPickerLayout>
            <YearPickerCell />
          </YearPickerLayout>
        </YearPicker>
        <HelperText id={hintId} error={missing}>
          {missing ? 'Pick the first and the last year.' : 'Pick the first and the last year of the search.'}
        </HelperText>
      </Fieldset>
      <input type='hidden' name='from' value={from ?? ''} />
      <input type='hidden' name='to' value={to ? getYearEnd(to) : ''} />
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Search</Button>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
      </div>
      <Text aria-live='polite'>{query ? `GET /archive?${query}` : ''}</Text>
    </form>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: paged years with own buttons

The scroller exposes `prev()` and `next()` through `apiRef`, so the page can be changed from buttons outside the grid, and reports the page in view with `onChangePeriod` for the range label. Keep `period` on the scroller equal to the layout's `rows × cols`, and move `active` into the new page when the old active year scrolls away.

<!-- example: year-picker/paged-years-with-own-buttons.tsx -->
```tsx
import {
  Icon,
  IconButton,
  type IndexedSnapScrollerApiRef,
  Text,
  YearPicker,
  YearPickerCell,
  YearPickerScroller,
  YearPickerScrollerContent,
  YearPickerScrollerLayout,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useRef, useState } from 'react';

const PERIOD = 20;

function getYear(key: string) {
  return Number(key.slice(0, 4));
}

export default function PagedYearsWithOwnButtons() {
  const scrollerRef = useRef<IndexedSnapScrollerApiRef>(null);
  const [page, setPage] = useState('2016-01-01');
  const [active, setActive] = useState('2026-01-01');
  const [selected, setSelected] = useState<string | null>(null);

  const firstYear = getYear(page);
  const lastYear = firstYear + PERIOD - 1;

  const changePage = (next: string) => {
    setPage(next);
    setActive((current) => {
      const year = getYear(current);
      if (year >= getYear(next) && year < getYear(next) + PERIOD) return current;

      return next;
    });
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', inlineSize: 'fit-content' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton aria-label='Earlier years' size='sm' variant='secondary' appearance='ghost' onClick={() => scrollerRef.current?.prev()}>
          <Icon><ChevronLeft /></Icon>
        </IconButton>
        <Text fontWeight={600} aria-live='polite'>{firstYear}–{lastYear}</Text>
        <IconButton aria-label='Later years' size='sm' variant='secondary' appearance='ghost' onClick={() => scrollerRef.current?.next()}>
          <Icon><ChevronRight /></Icon>
        </IconButton>
      </div>
      <YearPicker
        aria-label='Founding year'
        locale='en-US'
        year='2016-01-01'
        active={active}
        onChangeActive={setActive}
        selected={selected}
        onSelectCell={setSelected}
      >
        <YearPickerScroller apiRef={scrollerRef} period={PERIOD} onChangePeriod={changePage}>
          <YearPickerScrollerContent>
            <YearPickerScrollerLayout rows={5} cols={4}>
              <YearPickerCell />
            </YearPickerScrollerLayout>
          </YearPickerScrollerContent>
        </YearPickerScroller>
      </YearPicker>
    </div>
  );
}
```
<!-- /example -->

## Error

### Error: under-age birth year

Here the birth year is not bounded with `from` / `to`; the app checks the age after the pick and turns the hint linked to the grid into an error. Prefer bounds when a year can never be valid (see [Paged Year Range](./patterns.md#paged-year-range)); validate when the user needs to see why.

<!-- example: year-picker/under-age-birth-year.tsx -->
```tsx
import {
  HelperText,
  YearPicker,
  YearPickerCell,
  YearPickerScroller,
  YearPickerScrollerContent,
  YearPickerScrollerLayout,
} from '@vega-ui/react';
import { useId, useState } from 'react';

const MIN_AGE = 18;
const CURRENT_YEAR = 2026;

export default function UnderAgeBirthYear() {
  const [birthYear, setBirthYear] = useState<string | null>('2010-01-01');
  const messageId = useId();

  const age = birthYear ? CURRENT_YEAR - Number(birthYear.slice(0, 4)) : null;
  const invalid = age !== null && age < MIN_AGE;

  let message = 'Pick the year you were born.';
  if (age !== null) message = `You turn ${age} this year.`;
  if (invalid) message = `You must be at least ${MIN_AGE} to open an account. You turn ${age} this year.`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start', width: '100%' }}>
      <YearPicker
        aria-label='Birth year'
        aria-describedby={messageId}
        locale='en-US'
        year={birthYear ?? '2000-01-01'}
        selected={birthYear}
        onSelectCell={setBirthYear}
      >
        <YearPickerScroller>
          <YearPickerScrollerContent>
            <YearPickerScrollerLayout>
              <YearPickerCell />
            </YearPickerScrollerLayout>
          </YearPickerScrollerContent>
        </YearPickerScroller>
      </YearPicker>
      <HelperText id={messageId} error={invalid} aria-live='polite'>{message}</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: specific years

An array of year starts disables exactly those years, here fiscal years that are already closed; `to` disables the future ones. The reason is written next to the grid and linked with `aria-describedby`.

<!-- example: year-picker/specific-years.tsx -->
```tsx
import {
  HelperText,
  YearPicker,
  YearPickerCell,
  YearPickerLayout,
} from '@vega-ui/react';
import { useId } from 'react';

const closedYears = ['2022-01-01', '2023-01-01'];

export default function SpecificYears() {
  const hintId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start', width: '100%' }}>
      <YearPicker
        aria-label='Fiscal year to adjust'
        aria-describedby={hintId}
        locale='en-US'
        year='2018-01-01'
        to='2026-01-01'
        disabled={closedYears}
        style={{ width: '100%' }}
      >
        <YearPickerLayout rows={3} cols={3}>
          <YearPickerCell />
        </YearPickerLayout>
      </YearPicker>
      <HelperText id={hintId}>Fiscal years 2022 and 2023 are closed after the audit.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: era change in the Japanese calendar

With a calendar system from `createCalendarSystem` (see [Calendar System Adapter](../../i18n.md#calendar-system-adapter)), years follow that calendar. In the Japanese calendar 2019 is split: Heisei 31 runs from January 1 to April 30 and Reiwa 1 starts on May 1, so the page shows two cells for it, keyed `'2019-01-01'` and `'2019-05-01'` and labeled 平成31年 and 令和元年. Year arithmetic, paging, and `from` / `to` treat them as two years.

<!-- example: year-picker/era-change-in-the-japanese-calendar.tsx -->
```tsx
import { createCalendarSystem } from '@vega-ui/i18n';
import { YearPicker, YearPickerCell, YearPickerLayout } from '@vega-ui/react';

const japaneseCalendar = createCalendarSystem('japanese');

export default function EraChangeInTheJapaneseCalendar() {
  return (
    <YearPicker aria-label='Year' calendar={japaneseCalendar} locale='ja-JP' year='2018-01-01' style={{ width: '100%' }}>
      <YearPickerLayout>
        <YearPickerCell />
      </YearPickerLayout>
    </YearPicker>
  );
}
```
<!-- /example -->

### Edge: years counted from another epoch

A calendar that only renumbers Gregorian years can extend `GregorianCalendar` (see [Extending GregorianCalendar](../../i18n.md#extending-gregoriancalendar)). With the Thai Buddhist calendar the cell keyed `'2026-01-01'` is labeled พ.ศ. 2569 in `th-TH`; keys, `from`, and `to` stay Gregorian ISO days.

<!-- example: year-picker/years-counted-from-another-epoch.tsx -->
```tsx
import { createCalendarSystem } from '@vega-ui/i18n';
import { YearPicker, YearPickerCell, YearPickerLayout } from '@vega-ui/react';

const buddhistCalendar = createCalendarSystem('buddhist');

export default function YearsCountedFromAnotherEpoch() {
  return (
    <YearPicker aria-label='Year' calendar={buddhistCalendar} locale='th-TH' year='2026-01-01' to='2026-01-01' style={{ width: '100%' }}>
      <YearPickerLayout>
        <YearPickerCell />
      </YearPickerLayout>
    </YearPicker>
  );
}
```
<!-- /example -->
