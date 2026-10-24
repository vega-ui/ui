# YearPicker Examples

## Basic

### Basic: a page of years

`YearPickerLayout` renders a page of `rows × cols` years (12 by default) that starts with the year given by `year`. Cells are keyed by the first day of each year, so `defaultSelected` is `'2026-01-01'`.

```tsx
<YearPicker aria-label='Year' year='2026-01-01' defaultSelected='2026-01-01'>
  <YearPickerLayout>
    <YearPickerCell />
  </YearPickerLayout>
</YearPicker>
```

## Controlled/Stateful

### Controlled/Stateful: selected year

`selected` and `onSelectCell` make the selection controlled. The scroller pages through years, and `year` keeps the page of the selected year in view.

```tsx
import { formatCalendarDate, gregorianCalendar } from '@vega-ui/i18n';

const ModelYear = () => {
  const [year, setYear] = useState('2024-01-01');

  return (
    <>
      <YearPicker aria-label='Model year' year={year} selected={year} onSelectCell={setYear}>
        <YearPickerScroller>
          <YearPickerScrollerContent>
            <YearPickerScrollerLayout>
              <YearPickerCell />
            </YearPickerScrollerLayout>
          </YearPickerScrollerContent>
        </YearPickerScroller>
      </YearPicker>
      <Text>Model year: {formatCalendarDate(gregorianCalendar, year, 'en-US', { year: 'numeric' })}</Text>
    </>
  );
};
```

## Form/Integration

### Form/Integration: year range filter

`selection='range'` picks a span of years. Submit the first year as is and the end as the last day of its year with `getCalendarYearEnd`.

```tsx
import { getCalendarYearEnd, gregorianCalendar } from '@vega-ui/i18n';

const ArchiveFilter = () => {
  const [years, setYears] = useState<string[]>([]);
  const [from, to] = years;

  return (
    <form action='/archive' method='get'>
      <YearPicker aria-label='Years' selection='range' year='2020-01-01' selected={years} onSelectCell={setYears}>
        <YearPickerLayout>
          <YearPickerCell />
        </YearPickerLayout>
      </YearPicker>
      <input type='hidden' name='from' value={from ?? ''} />
      <input type='hidden' name='to' value={to ? getCalendarYearEnd(gregorianCalendar, to) : ''} />
      <Button type='submit' disabled={years.length < 2}>Search</Button>
    </form>
  );
};
```

## Layout/Overlay

### Layout/Overlay: paged years with own buttons

The scroller exposes `prev()` and `next()` through `apiRef`, so the page can be changed from buttons outside the grid, and reports the page in view with `onChangePeriod`. Keep `period` on the scroller equal to the layout's `rows × cols`.

```tsx
import { type IndexedSnapScrollerApiRef } from '@vega-ui/react';
import { formatCalendarDate, gregorianCalendar } from '@vega-ui/i18n';

const PagedYears = () => {
  const scrollerRef = useRef<IndexedSnapScrollerApiRef>(null);
  const [page, setPage] = useState('2026-01-01');

  return (
    <>
      <Button size='sm' onClick={() => scrollerRef.current?.prev()}>Earlier</Button>
      <Button size='sm' onClick={() => scrollerRef.current?.next()}>Later</Button>
      <Text>From {formatCalendarDate(gregorianCalendar, page, 'en-US', { year: 'numeric' })}</Text>
      <YearPicker aria-label='Year' year='2026-01-01'>
        <YearPickerScroller apiRef={scrollerRef} period={20} onChangePeriod={setPage}>
          <YearPickerScrollerContent>
            <YearPickerScrollerLayout rows={5} cols={4}>
              <YearPickerCell />
            </YearPickerScrollerLayout>
          </YearPickerScrollerContent>
        </YearPickerScroller>
      </YearPicker>
    </>
  );
};
```

## Error

### Error: years outside the allowed age

`from` and `to` disable years outside the bounds, here birth years of people aged 18 to 100 in 2026. Explain the rule next to the grid; disabled years do not say why.

```tsx
<>
  <YearPicker aria-label='Birth year' year='2000-01-01' from='1926-01-01' to='2008-01-01'>
    <YearPickerScroller>
      <YearPickerScrollerContent>
        <YearPickerScrollerLayout>
          <YearPickerCell />
        </YearPickerScrollerLayout>
      </YearPickerScrollerContent>
    </YearPickerScroller>
  </YearPicker>
  <HelperText>You must be at least 18 to register.</HelperText>
</>
```

## Disabled

### Disabled: specific years

An array of year starts disables exactly those years, for example fiscal years that are already closed.

```tsx
<YearPicker aria-label='Fiscal year' year='2024-01-01' disabled={['2022-01-01', '2023-01-01']}>
  <YearPickerLayout>
    <YearPickerCell />
  </YearPickerLayout>
</YearPicker>
```

## Edge

### Edge: era change in the Japanese calendar

With a calendar system from `createCalendarSystem` (see [Calendar System Adapter](../../i18n.md#calendar-system-adapter)), years follow that calendar. In the Japanese calendar 2019 is split: Heisei 31 runs from January 1 to April 30 and Reiwa 1 starts on May 1, so the page shows two cells for it, keyed `'2019-01-01'` and `'2019-05-01'` and labeled 平成31年 and 令和元年. Year arithmetic, paging, and `from` / `to` treat them as two years.

```tsx
const japaneseCalendar = createCalendarSystem('japanese');

<YearPicker aria-label='Year' calendar={japaneseCalendar} locale='ja-JP' year='2018-01-01'>
  <YearPickerLayout>
    <YearPickerCell />
  </YearPickerLayout>
</YearPicker>
```

### Edge: years counted from another epoch

A calendar that only renumbers Gregorian years can extend `GregorianCalendar` (see [Extending GregorianCalendar](../../i18n.md#extending-gregoriancalendar)). With the Thai Buddhist calendar the cell keyed `'2026-01-01'` is labeled พ.ศ. 2569 in `th-TH`; keys, `from`, and `to` stay Gregorian ISO days.

```tsx
<YearPicker aria-label='Year' calendar={buddhistCalendar} locale='th-TH' year='2026-01-01' to='2026-01-01'>
  <YearPickerLayout>
    <YearPickerCell />
  </YearPickerLayout>
</YearPicker>
```
