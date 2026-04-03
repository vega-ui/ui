# CalendarBase

## Doc Profile

`compound`

## Summary

`CalendarBase` is the shared layout and context foundation for the VegaUI calendar family. It provides size, variant, and compactness to shared header, picker-button, control-button, and weekday-label parts, but it is not a complete date-selection widget on its own.

## Imports

```tsx
import {
  CalendarBase,
  CalendarBaseControlIconButton,
  CalendarBaseHeader,
  CalendarBasePickerButton,
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
  type CalendarBaseControlIconButtonProps,
  type CalendarBaseHeaderProps,
  type CalendarBasePickerButtonProps,
  type CalendarBaseProps,
  type CalendarBaseSize,
  type CalendarBaseVariant,
  type CalendarBaseWeekLabelProps,
  type CalendarBaseWeekLabelsProps,
} from '@vega-ui/react';
```

## Exported Types

- `CalendarBaseProps`
- `CalendarBaseHeaderProps`
- `CalendarBaseWeekLabelsProps`
- `CalendarBaseWeekLabelProps`
- `CalendarBasePickerButtonProps`
- `CalendarBaseControlIconButtonProps`
- `CalendarBaseVariant`
- `CalendarBaseSize`

## Minimal Composition

```tsx
<CalendarBase>
  <CalendarBaseHeader />
</CalendarBase>
```

## Required Parts

- `CalendarBase`: root layout and shared calendar context

## Optional Parts

- `CalendarBaseHeader`
- `CalendarBasePickerButton`
- `CalendarBaseControlIconButton`
- `CalendarBaseWeekLabels`
- `CalendarBaseWeekLabel`
- embedded picker content from `DayPicker`, `MonthPicker`, `YearPicker`, or custom calendar-family wrappers

## Composition Order

1. `CalendarBase`
2. optional `CalendarBaseHeader`
3. optional week-label row
4. embedded picker/grid content

## Variants

- Variant: `primary` or `secondary`
- Size: `xs`, `sm`, `md`, `lg`, `xl`
- Density: default or `compact`

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

- `CalendarBase` is primarily a subsystem primitive, not the main consumer-facing calendar surface.
- Size and variant should stay aligned across header and embedded picker content.
- `compact` changes layout density but not the actual date logic.
- It should stay visually aligned with picker layers rather than becoming a separate theme or layout system.

## Common Mistakes

- Treating `CalendarBase` like a complete calendar widget.
- Rebuilding shared calendar header parts manually instead of using the exported pieces.
- Letting custom variants drift from the rest of the calendar family.
