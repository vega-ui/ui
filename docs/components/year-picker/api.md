# YearPicker API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `year` | `number` | `—` | No | Controls the currently visible year. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `YearPickerLayout`
- `YearPickerRowGroup`
- `YearPickerRow`
- `YearPickerItem`
- `YearPickerScroller`
- `YearPickerScrollerContent`
- `YearPickerScrollerLayout`

## Types

- `YearPickerProps`
- `YearPickerLayoutProps`
- `YearPickerRowGroupProps`
- `YearPickerRowProps`
- `YearPickerItemProps`
- `YearPickerScrollerProps`
- `YearPickerScrollerContentProps`
- `YearPickerScrollerLayoutProps`

## State Model

- Selection and bounds behavior are inherited from `DataGridPicker`.
- The root also shares visible year context.
- Scroller mode maps years to page indexes through helper logic or custom `getIndexByYear`.
