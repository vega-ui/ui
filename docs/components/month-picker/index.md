# MonthPicker

## Doc Profile

`compound`

## Summary

`MonthPicker` is the grid-based month-selection subsystem used directly or as part of the calendar family. It builds on `DataGridPicker` and exposes month-layout parts and helper-driven custom rendering.

## Imports

```tsx
import {
  MonthPicker,
  MonthPickerItem,
  MonthPickerLayout,
  MonthPickerRow,
  MonthPickerRowGroup,
  createMonthPickerGrid,
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

## Minimal Composition

```tsx
<MonthPicker>
  <MonthPickerLayout />
</MonthPicker>
```

## Required Parts

- `MonthPicker`: root month-selection subsystem

## Optional Parts

- `MonthPickerLayout`
- `MonthPickerRowGroup`
- `MonthPickerRow`
- `MonthPickerItem`

## Composition Order

1. `MonthPicker`
2. either `MonthPickerLayout` or custom row/item composition

## Variants

- Selection: `single`, `multiple`, `range`
- Layout density: different `rows`, `cols`, and starting month
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
- Treating it as a generic content grid instead of a month-selection system.
