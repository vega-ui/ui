# YearPicker

## Doc Profile

`advanced interactive`

## Summary

`YearPicker` is the year-selection subsystem of the calendar family. It builds on `DataGridPicker`, supports static or scroller-based year grids, and exposes year-to-index helpers for paged decade-like navigation.

## Imports

```tsx
import {
  YearPicker,
  YearPickerItem,
  YearPickerLayout,
  YearPickerRow,
  YearPickerRowGroup,
  YearPickerScroller,
  YearPickerScrollerContent,
  YearPickerScrollerLayout,
  createYearPickerGrid,
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
- `YearPickerScrollerProps`
- `YearPickerScrollerContentProps`
- `YearPickerScrollerLayoutProps`

## Minimal Composition

```tsx
<YearPicker>
  <YearPickerLayout />
</YearPicker>
```

## Required Parts

- `YearPicker`: root year-selection subsystem

## Optional Parts

- `YearPickerLayout`
- `YearPickerRowGroup`
- `YearPickerRow`
- `YearPickerItem`
- `YearPickerScroller`
- `YearPickerScrollerContent`
- `YearPickerScrollerLayout`

## Composition Order

1. `YearPicker`
2. either `YearPickerLayout` or custom row/item composition
3. optional scroller layer for paged year ranges

## Variants

- Selection: `single`, `multiple`, `range`
- Layout: static grid or scroller-based year paging
- Period: explicit visible `year` or current-year defaults

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
- Scroller mode introduces another mapping layer between visible year and page index.

## Common Mistakes

- Treating year ranges as unbounded without checking usability.
- Letting parent calendar rules and year-picker bounds drift apart.
- Using the low-level year picker where a higher-level calendar mode switch would be clearer.
