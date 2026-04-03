# CalendarBase API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `variant` | `CalendarBaseVariant` | `'secondary'` | No | Visual variant for the calendar. |
| `size` | `CalendarBaseSize` | `'xs'` | No | Global size scale for the calendar. |
| `compact` | `boolean` | `—` | No | Density flag for more compact layouts. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `CalendarBaseHeader`
- `CalendarBaseWeekLabels`
- `CalendarBaseWeekLabel`
- `CalendarBasePickerButton`
- `CalendarBaseControlIconButton`

## Types

- `CalendarBaseProps`
- `CalendarBaseHeaderProps`
- `CalendarBaseWeekLabelsProps`
- `CalendarBaseWeekLabelProps`
- `CalendarBasePickerButtonProps`
- `CalendarBaseControlIconButtonProps`
- `CalendarBaseVariant`
- `CalendarBaseSize`

## State Model

- `CalendarBase` has no date-selection state of its own.
- It only shares visual context for nested calendar-family parts.
