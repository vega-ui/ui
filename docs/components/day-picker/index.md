# DayPicker

## Doc Profile

`advanced interactive`

## Summary

`DayPicker` is the lower-level day-grid subsystem used by the calendar stack. It builds on `DataGridPicker` and supports single, multiple, and range date selection while exposing layout, row, item, and scroller parts.

## Imports

```tsx
import {
  DayPicker,
  DayPickerCell,
  DayPickerItem,
  DayPickerLayout,
  DayPickerRow,
  DayPickerRowGroup,
  DayPickerScroller,
  DayPickerScrollerContent,
  DayPickerScrollerLayout,
  createDayPickerGrid,
  useDayPickerCellContext,
  useDayPickerContext,
  useDayPickerScrollerContext,
  type DayPickerGridCell,
  type DayPickerGridOptions,
  type DayPickerGridRow,
  type DayPickerCellContextData,
  type DayPickerCellProps,
  type DayPickerItemProps,
  type DayPickerLayoutProps,
  type DayPickerProps,
  type DayPickerRowGroupProps,
  type DayPickerRowProps,
  type DayPickerScrollerContentProps,
  type DayPickerScrollerLayoutProps,
  type DayPickerScrollerProps,
} from '@vega-ui/react';
```

## Exported Types

- `DayPickerProps`
- `DayPickerLayoutProps`
- `DayPickerRowGroupProps`
- `DayPickerRowProps`
- `DayPickerItemProps`
- `DayPickerCellProps`
- `DayPickerCellContextData`
- `DayPickerScrollerProps`
- `DayPickerScrollerContentProps`
- `DayPickerScrollerLayoutProps`
- `DayPickerGridCell`, `DayPickerGridRow`, `DayPickerGridOptions`

## Minimal Composition

```tsx
<DayPicker>
  <DayPickerLayout>
    <DayPickerCell />
  </DayPickerLayout>
</DayPicker>
```

## Required Parts

- `DayPicker`: root day-selection subsystem

## Optional Parts

- `DayPickerLayout`
- `DayPickerRowGroup`
- `DayPickerRow`
- `DayPickerItem`
- `DayPickerCell`: the cell, placed as the template of the layouts
- `DayPickerScroller`
- `DayPickerScrollerContent`
- `DayPickerScrollerLayout`

## Composition Order

1. `DayPicker`
2. either `DayPickerLayout` with a cell template as children (`<DayPickerCell />` or a custom one) or custom row/item composition
3. optional scroller wrapper for paged month navigation

## Variants

- Selection: `single`, `multiple`, `range`
- Layout: static grid or scroller-based month paging
- Period: explicit `month` (a `YYYY-MM-DD` string of any day in it) or the current month
- Locale and calendar system: `locale` and `calendar` props, defaulting to the runtime locale and the Gregorian calendar

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Patterns](./patterns.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- Overflow-day inclusion changes both visual density and selection behavior.
- Disabled, selected, excluded, and focused dates must remain distinguishable.
- Scrollable month paging adds another synchronization layer for visible period state.
- Cell keys (`selected`, `from`, `to`, `disabled`, `active`) are `YYYY-MM-DD` days in every calendar system; only the grid shape and labels follow `calendar`.

## Common Mistakes

- Reimplementing date-grid math instead of using `createDayPickerGrid`.
- Passing numeric years, zero-based months, or timestamps instead of `YYYY-MM-DD` strings.
- Losing selection visibility in custom `DayPickerItem` rendering.
- Treating it like a consumer-ready calendar instead of a low-level picker subsystem.
