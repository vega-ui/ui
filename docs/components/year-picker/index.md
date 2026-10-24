# YearPicker

## Doc Profile

`advanced interactive`

## Summary

`YearPicker` is the year-selection subsystem of the calendar family. It builds on `DataGridPicker`, supports static or scroller-based year grids, and pages years in fixed-size groups (`period`, `12` by default) for decade-like navigation.

## Imports

```tsx
import {
  YearPicker,
  YearPickerCell,
  YearPickerItem,
  YearPickerLayout,
  YearPickerRow,
  YearPickerRowGroup,
  YearPickerScroller,
  YearPickerScrollerContent,
  YearPickerScrollerLayout,
  createYearPickerGrid,
  useYearPickerCellContext,
  useYearPickerContext,
  useYearPickerScrollerContext,
  type YearPickerCellContextData,
  type YearPickerCellProps,
  type YearPickerItemProps,
  type YearPickerLayoutProps,
  type YearPickerProps,
  type YearPickerRowGroupProps,
  type YearPickerRowProps,
  type YearPickerScrollerContentProps,
  type YearPickerScrollerLayoutProps,
  type YearPickerScrollerProps,
} from '@vega-ui/react';
```

## Exported Types

- `YearPickerProps`
- `YearPickerLayoutProps`
- `YearPickerRowGroupProps`
- `YearPickerRowProps`
- `YearPickerItemProps`
- `YearPickerCellProps`
- `YearPickerCellContextData`
- `YearPickerScrollerProps`
- `YearPickerScrollerContentProps`
- `YearPickerScrollerLayoutProps`

## Minimal Composition

```tsx
<YearPicker>
  <YearPickerLayout>
    <YearPickerCell />
  </YearPickerLayout>
</YearPicker>
```

## Required Parts

- `YearPicker`: root year-selection subsystem

## Optional Parts

- `YearPickerLayout`
- `YearPickerRowGroup`
- `YearPickerRow`
- `YearPickerItem`
- `YearPickerCell`: the cell, placed as the template of the layouts
- `YearPickerScroller`
- `YearPickerScrollerContent`
- `YearPickerScrollerLayout`

## Composition Order

1. `YearPicker`
2. either `YearPickerLayout` with a cell template as children (`<YearPickerCell />` or a custom one) or custom row/item composition
3. optional scroller layer for paged year ranges

## Variants

- Selection: `single`, `multiple`, `range`
- Layout: static grid or scroller-based year paging
- Period: explicit visible `year` (a `YYYY-MM-DD` string of any day in it) or the current year
- Locale and calendar system: `locale` and `calendar` props, defaulting to the runtime locale and the Gregorian calendar; eras are handled by the adapter

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

- Large year ranges require extra testing for focus, paging, and visible context.
- `year` controls the visible period, not just selection.
- Scroller mode pages by `period` years; a `period` that differs from the layout's `rows × cols` shows the wrong range.

## Common Mistakes

- Treating year ranges as unbounded without checking usability.
- Letting parent calendar rules and year-picker bounds drift apart.
- Using the low-level year picker where a higher-level calendar mode switch would be clearer.
