# DayPicker API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `year` | `number` | `—` | No | — |
| `month` | `number` | `—` | No | Zero-based month index (`0` = January, `11` = December) |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `DayPickerLayout`
- `DayPickerRowGroup`
- `DayPickerRow`
- `DayPickerItem`
- `DayPickerScroller`
- `DayPickerScrollerContent`
- `DayPickerScrollerLayout`

## Types

- `DayPickerProps`
- `DayPickerLayoutProps`
- `DayPickerRowGroupProps`
- `DayPickerRowProps`
- `DayPickerItemProps`
- `DayPickerScrollerProps`
- `DayPickerScrollerContentProps`
- `DayPickerScrollerLayoutProps`

## State Model

- Selection state is inherited from `DataGridPicker`.
- The root also provides visible `year` and `month` context.
- Scroller mode derives month paging from index/date mapping functions.
