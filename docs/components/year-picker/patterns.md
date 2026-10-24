# YearPicker Patterns

## Static Year Grid

When to use:

- the useful years fit on one page, such as the next few fiscal years or recent model years

Composition notes:

- use `YearPickerLayout`; the page starts with the year given by `year`
- set `rows` and `cols` so the page holds exactly the useful years, and bound them with `from` and `to`

Trade-offs:

- simple and stable
- no paging; use a scroller for long ranges such as birth years

```tsx
<YearPicker aria-label='Fiscal year' year='2025-01-01' from='2025-01-01' to='2030-01-01'>
  <YearPickerLayout rows={2} cols={3}>
    <YearPickerCell />
  </YearPickerLayout>
</YearPicker>
```

## Paged Year Range

When to use:

- the year range is long, such as birth years, and benefits from snap paging

Composition notes:

- use `YearPickerScroller`, `YearPickerScrollerContent`, and `YearPickerScrollerLayout`
- keep `period` on `YearPickerScroller` equal to the layout's `rows × cols`; both default to 12
- start near the likely answer with `year`, and bound the range with `from` and `to`

Trade-offs:

- scales to any range
- more moving parts than a static grid

```tsx
<YearPicker aria-label='Birth year' year='1990-01-01' from='1926-01-01' to='2008-01-01'>
  <YearPickerScroller period={20}>
    <YearPickerScrollerContent>
      <YearPickerScrollerLayout rows={5} cols={4}>
        <YearPickerCell />
      </YearPickerScrollerLayout>
    </YearPickerScrollerContent>
  </YearPickerScroller>
</YearPicker>
```

## Custom Grid Rendering

When to use:

- the row structure itself must change, which a cell template cannot do

Composition notes:

- build pages with `createYearPickerGrid` instead of counting years by hand; pass the same `calendar` as the picker
- `start` is the first year of page `0` and `offset` is the page index
- format labels with `formatCalendarDate` in that calendar, never from the ISO key

Trade-offs:

- full control over markup
- labels and locale are the app's job; prefer a cell template when only the content changes

```tsx
import { formatCalendarDate, gregorianCalendar } from '@vega-ui/i18n';

<YearPicker aria-label='Year' year='2020-01-01'>
  <YearPickerRowGroup>
    {createYearPickerGrid({ start: '2020-01-01', rows: 2, cols: 5 }).map(({ row, data }) => (
      <YearPickerRow key={row} row={row}>
        {data.map(({ col, year }) => (
          <YearPickerItem key={year} col={col} value={year}>
            {formatCalendarDate(gregorianCalendar, year, 'en-US', { year: '2-digit' })}
          </YearPickerItem>
        ))}
      </YearPickerRow>
    ))}
  </YearPickerRowGroup>
</YearPicker>
```

## Cell Template

When to use:

- year cells need extra content such as a count, a status, or a hint

Composition notes:

- children of `YearPickerLayout` and `YearPickerScrollerLayout` are rendered once per year inside a cell context
- read the year with `useYearPickerCellContext()`: `{ col, date, fields, label }`; `date` is the first day of the year
- render the content inside `YearPickerCell` so the cell keeps selection, focus, and disabled states
- take year numbers from `label` or `fields`, never from the ISO `date` string; they differ in non-Gregorian calendars, and an era change gives two cells in one Gregorian year
- look data up by `date`, which is the same in every calendar system

Trade-offs:

- keeps the grid, keys, and keyboard behavior of the layout
- richer cells can crowd small sizes

```tsx
import { YearPickerCell, useYearPickerCellContext } from '@vega-ui/react';

const reports: Record<string, number> = { '2024-01-01': 12, '2025-01-01': 9 };

const ReportYear = () => {
  const { date, label } = useYearPickerCellContext();

  return (
    <YearPickerCell style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span>{label}</span>
      <small>{reports[date] ?? 0} reports</small>
    </YearPickerCell>
  );
};

<YearPicker aria-label='Report year' year='2020-01-01'>
  <YearPickerLayout rows={2} cols={4}>
    <ReportYear />
  </YearPickerLayout>
</YearPicker>
```
