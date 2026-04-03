# DayPicker

## Doc Profile

`advanced interactive`

## Summary

`DayPicker` is the lower-level day-grid subsystem used by the calendar stack. It builds on `DataGridPicker` and supports single, multiple, and range date selection while exposing layout, row, item, and scroller parts.

## Imports

```tsx
import {
  DayPicker,
  DayPickerItem,
  DayPickerLayout,
  DayPickerRow,
  DayPickerRowGroup,
  DayPickerScroller,
  DayPickerScrollerContent,
  DayPickerScrollerLayout,
  createDayPickerGrid,
  getDateByIndex,
  getIndexByDate,
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
- `DayPickerScrollerProps`
- `DayPickerScrollerContentProps`
- `DayPickerScrollerLayoutProps`

## Minimal Composition

```tsx
<DayPicker>
  <DayPickerLayout />
</DayPicker>
```

## Required Parts

- `DayPicker`: root day-selection subsystem

## Optional Parts

- `DayPickerLayout`
- `DayPickerRowGroup`
- `DayPickerRow`
- `DayPickerItem`
- `DayPickerScroller`
- `DayPickerScrollerContent`
- `DayPickerScrollerLayout`

## Composition Order

1. `DayPicker`
2. either `DayPickerLayout` or custom row/item composition
3. optional scroller wrapper for paged month navigation

## Variants

- Selection: `single`, `multiple`, `range`
- Layout: static grid or scroller-based month paging
- Period: explicit `year` / `month` or current-date defaults

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

## Common Mistakes

- Reimplementing date-grid math instead of using the helpers.
- Losing selection visibility in custom `DayPickerItem` rendering.
- Treating it like a consumer-ready calendar instead of a low-level picker subsystem.
