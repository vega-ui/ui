# MonthPicker

## Doc Profile

`compound`

## Summary

`MonthPicker` is the grid-based month-selection subsystem used directly or as part of the calendar family. It builds on `DataGridPicker` and exposes month-layout parts and helper-driven custom rendering.

## Imports

```tsx
import {
  MonthPicker,
  MonthPickerCell,
  MonthPickerItem,
  MonthPickerLayout,
  MonthPickerRow,
  MonthPickerRowGroup,
  createMonthPickerGrid,
  useMonthPickerCellContext,
  useMonthPickerContext,
  type MonthPickerCellContextData,
  type MonthPickerCellProps,
  type MonthPickerItemProps,
  type MonthPickerLayoutProps,
  type MonthPickerProps,
  type MonthPickerRowGroupProps,
  type MonthPickerRowProps,
} from '@vega-ui/react';
```

## Exported Types

- `MonthPickerProps`
- `MonthPickerLayoutProps`
- `MonthPickerRowGroupProps`
- `MonthPickerRowProps`
- `MonthPickerItemProps`
- `MonthPickerCellProps`
- `MonthPickerCellContextData`

## Minimal Composition

```tsx
<MonthPicker>
  <MonthPickerLayout>
    <MonthPickerCell />
  </MonthPickerLayout>
</MonthPicker>
```

## Required Parts

- `MonthPicker`: root month-selection subsystem

## Optional Parts

- `MonthPickerLayout`
- `MonthPickerRowGroup`
- `MonthPickerRow`
- `MonthPickerItem`
- `MonthPickerCell`: the cell, placed as the template of the layouts

## Composition Order

1. `MonthPicker`
2. either `MonthPickerLayout` with a cell template as children (`<MonthPickerCell />` or a custom one) or custom row/item composition

## Variants

- Selection: `single`, `multiple`, `range`
- Layout density: `cols`; rows follow the number of months in the year
- Period: explicit `year` (a `YYYY-MM-DD` string of any day in it) or the current year
- Locale and calendar system: `locale` and `calendar` props, defaulting to the runtime locale and the Gregorian calendar
- Label formatting: locale-driven month names

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

- Locale and month-label format should stay consistent with the rest of the date system.
- Custom layouts should preserve selection and disabled affordances from the picker primitives.
- This is a low-level month selector, not necessarily the final consumer-facing calendar experience.

## Common Mistakes

- Hardcoding month labels while the rest of the app is localized.
- Recreating the month grid manually instead of using `createMonthPickerGrid`.
- Assuming every year has 12 months or that months are zero-based numbers.
- Treating it as a generic content grid instead of a month-selection system.
