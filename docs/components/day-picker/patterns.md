# DayPicker Patterns

## Static Month Grid

When to use:

- one known month is enough, for example picking a day inside a billing period

Composition notes:

- use `DayPickerLayout` and pass `month` explicitly, so the grid does not depend on today
- constrain the period with `from` and `to` instead of hiding days

Trade-offs:

- simple and stable
- no navigation; use a scroller or `Calendar` when users move between months

```tsx
<DayPicker aria-label='November 2026' month='2026-11-01' from='2026-11-01' to='2026-11-30'>
  <DayPickerLayout>
    <DayPickerCell />
  </DayPickerLayout>
</DayPicker>
```

## Swipable Month Paging

When to use:

- users move between months with swipe or snap paging and the app draws its own header

Composition notes:

- use `DayPickerScroller` with `DayPickerScrollerContent` and `DayPickerScrollerLayout`
- `onChangePeriod` reports the first day of the month scrolled into view; store it and pass it back as `month`, so the header and the grid agree
- reach for `Calendar` when the standard header, month view, and year view are enough

Trade-offs:

- tactile, and any header layout is possible
- the app owns navigation state that `Calendar` would handle

```tsx
const PagedDays = () => {
  const [month, setMonth] = useState('2026-11-01');

  return (
    <DayPicker aria-label='Days' month={month}>
      <DayPickerScroller onChangePeriod={setMonth}>
        <DayPickerScrollerContent>
          <DayPickerScrollerLayout>
            <DayPickerCell />
          </DayPickerScrollerLayout>
        </DayPickerScrollerContent>
      </DayPickerScroller>
    </DayPicker>
  );
};
```

## Custom Grid Rendering

When to use:

- the row and cell structure itself must change, which a cell template cannot do

Composition notes:

- build rows with `createDayPickerGrid` instead of reimplementing date math; pass the same `calendar` as the picker
- `date` is `undefined` for an empty overflow cell; `day` is the day number in the calendar system
- set `disabled` and `excluded` on cells outside the month, as the built-in cell does

Trade-offs:

- full control over markup
- labels, week start, and overflow handling are the app's job; prefer a cell template when only the content changes

```tsx
<DayPicker aria-label='November 2026' month='2026-11-01'>
  <DayPickerRowGroup>
    {createDayPickerGrid({ month: '2026-11-01', weekStartsOn: 0 }).map(({ row, data }) => (
      <DayPickerRow key={row} row={row}>
        {data.map(({ col, date, day, inCurrentMonth }) => (
          <DayPickerItem key={col} col={col} value={date} disabled={!inCurrentMonth} excluded={!inCurrentMonth}>
            {day}
          </DayPickerItem>
        ))}
      </DayPickerRow>
    ))}
  </DayPickerRowGroup>
</DayPicker>
```

## Cell Template

When to use:

- day cells need extra content such as a price, a status, or a count

Composition notes:

- children of `DayPickerLayout` and `DayPickerScrollerLayout` are rendered once per day inside a cell context
- read the day with `useDayPickerCellContext()`: `{ col, date, fields, label, inMonth }`; `date` is `undefined` for an empty overflow cell
- render the content inside `DayPickerCell` so the cell keeps selection, focus, and disabled states
- take day numbers from `label` or `fields`, never from the ISO `date` string; they differ in non-Gregorian calendars
- look data up by `date`, which is the same in every calendar system

Trade-offs:

- keeps the grid, keys, and keyboard behavior of the layout
- richer cells can crowd small sizes

```tsx
import { DayPickerCell, useDayPickerCellContext } from '@vega-ui/react';

const events: Record<string, number> = { '2026-11-04': 2, '2026-11-12': 1 };

const EventDay = () => {
  const { date, label } = useDayPickerCellContext();
  const count = date ? events[date] : undefined;

  return (
    <DayPickerCell aria-label={count === undefined ? undefined : `${label}, ${count} events`}>
      <span>{label}</span>
      {count !== undefined && <Badge size='xs'>{count}</Badge>}
    </DayPickerCell>
  );
};

<DayPicker aria-label='November 2026' month='2026-11-01'>
  <DayPickerLayout>
    <EventDay />
  </DayPickerLayout>
</DayPicker>
```
