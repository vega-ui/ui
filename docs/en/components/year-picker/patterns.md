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

<!-- example: year-picker/static-year-grid.tsx -->
```tsx
import { Text, YearPicker, YearPickerCell, YearPickerLayout } from '@vega-ui/react';
import { useState } from 'react';

export default function StaticYearGrid() {
  const [year, setYear] = useState<string | null>('2026-01-01');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <YearPicker
        aria-label='Budget year'
        locale='en-US'
        year='2025-01-01'
        from='2025-01-01'
        to='2030-01-01'
        selected={year}
        onSelectCell={setYear}
        style={{ width: '100%' }}
      >
        <YearPickerLayout rows={2} cols={3}>
          <YearPickerCell />
        </YearPickerLayout>
      </YearPicker>
      <Text aria-live='polite' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Budget for {year ? `FY${year.slice(0, 4)}` : '—'}</Text>
    </div>
  );
}
```
<!-- /example -->

## Paged Year Range

When to use:

- the year range is long, such as birth years, and benefits from snap paging

Composition notes:

- use `YearPickerScroller`, `YearPickerScrollerContent`, and `YearPickerScrollerLayout`
- keep `period` on `YearPickerScroller` equal to the layout's `rows × cols`; both default to 12
- start near the likely answer with `year`, and bound the range with `from` and `to`
- explain the bounds next to the grid and link the text with `aria-describedby`

Trade-offs:

- scales to any range
- more moving parts than a static grid

<!-- example: year-picker/paged-year-range.tsx -->
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

export default function PagedYearRange() {
  const [birthYear, setBirthYear] = useState<string | null>(null);
  const hintId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start', width: '100%' }}>
      <YearPicker
        aria-label='Birth year'
        aria-describedby={hintId}
        locale='en-US'
        year='1990-01-01'
        from='1926-01-01'
        to='2008-01-01'
        selected={birthYear}
        onSelectCell={setBirthYear}
      >
        <YearPickerScroller period={20}>
          <YearPickerScrollerContent>
            <YearPickerScrollerLayout rows={5} cols={4}>
              <YearPickerCell />
            </YearPickerScrollerLayout>
          </YearPickerScrollerContent>
        </YearPickerScroller>
      </YearPicker>
      <HelperText id={hintId}>Members must be 18 to 100 years old in 2026.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Custom Grid Rendering

When to use:

- the row structure itself must change, which a cell template cannot do

Composition notes:

- build pages with `createYearPickerGrid` instead of counting years by hand; pass the same `calendar` as the picker
- `start` is the first year of page `0` and `offset` is the page index
- format labels with `formatCalendarDate` in that calendar (or `Intl.DateTimeFormat` for Gregorian keys), never from the ISO key
- when the label is shortened, as with two-digit years here, give the full year in `aria-label`

Trade-offs:

- full control over markup
- labels and locale are the app's job; prefer a cell template when only the content changes

<!-- example: year-picker/custom-grid-rendering.tsx -->
```tsx
import {
  YearPicker,
  YearPickerItem,
  YearPickerRow,
  YearPickerRowGroup,
  createYearPickerGrid,
} from '@vega-ui/react';

const START = '2020-01-01';
const shortFormat = new Intl.DateTimeFormat('en-US', { year: '2-digit', timeZone: 'UTC' });
const longFormat = new Intl.DateTimeFormat('en-US', { year: 'numeric', timeZone: 'UTC' });
const rows = createYearPickerGrid({ start: START, rows: 2, cols: 5 });

export default function CustomGridRendering() {
  return (
    <YearPicker aria-label='Season, 2020s' locale='en-US' year={START} style={{ width: '100%' }}>
      <YearPickerRowGroup>
        {rows.map(({ row, data }) => (
          <YearPickerRow key={row} row={row}>
            {data.map(({ col, year }) => (
              <YearPickerItem key={year} col={col} value={year} aria-label={longFormat.format(new Date(year))}>
                ’{shortFormat.format(new Date(year))}
              </YearPickerItem>
            ))}
          </YearPickerRow>
        ))}
      </YearPickerRowGroup>
    </YearPicker>
  );
}
```
<!-- /example -->

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

<!-- example: year-picker/cell-template.tsx -->
```tsx
import {
  useYearPickerCellContext,
  YearPicker,
  YearPickerCell,
  YearPickerLayout,
} from '@vega-ui/react';

const reports: Record<string, number> = {
  '2019-01-01': 4,
  '2020-01-01': 12,
  '2021-01-01': 11,
  '2022-01-01': 12,
  '2023-01-01': 12,
  '2024-01-01': 9,
};

function ReportYear() {
  const { date, label } = useYearPickerCellContext();
  const count = reports[date] ?? 0;

  return (
    <YearPickerCell aria-label={`${label}, ${count} reports`}>
      <span style={{ display: 'grid', justifyItems: 'center', lineHeight: 1.1 }}>
        <span>{label}</span>
        <small style={{ color: 'var(--label-secondary)' }}>{count}</small>
      </span>
    </YearPickerCell>
  );
}

export default function CellTemplate() {
  return (
    <YearPicker aria-label='Report year' locale='en-US' year='2019-01-01' size='lg' to='2024-01-01' style={{ width: '100%' }}>
      <YearPickerLayout rows={2} cols={4}>
        <ReportYear />
      </YearPickerLayout>
    </YearPicker>
  );
}
```
<!-- /example -->
