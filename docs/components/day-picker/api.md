# DayPicker API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `month` | `string` | `—` | No | Visible month, given as a `YYYY-MM-DD` string of any day in it. |
| `calendar` | `CalendarSystem` | `gregorianCalendar` | No | Calendar system the month grid is built in. |
| `locale` | `string` | `getDefaultLocale()` | No | BCP 47 locale of the labels and of the first day of the week, e.g. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `DayPickerLayout`
- `DayPickerRowGroup`
- `DayPickerRow`
- `DayPickerItem`
- `DayPickerCell`
- `DayPickerScroller`
- `DayPickerScrollerContent`
- `DayPickerScrollerLayout`

## Types

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

## State Model

- Selection state is inherited from `DataGridPicker`.
- Cells are keyed by `YYYY-MM-DD` days; `selected`, `from`, `to`, `disabled`, and `active` use the same strings.
- The root provides the visible `month` (its first day) and `calendar` through `useDayPickerContext`.
- `createDayPickerGrid({ month, calendar, rows, offset, includeOverflowDays, weekStartsOn })` returns rows of `{ col, date, day, inCurrentMonth }`.
- Scroller pages are calendar months counted from `referenceMonth` (`useDayPickerScrollerContext`); `onChangePeriod` receives the first day of the visible month.
- Children of `DayPickerLayout` and `DayPickerScrollerLayout` are the template of a cell, rendered once per day inside a cell context. The children are required, usually `<DayPickerCell />`, which shows the formatted label.
- `useDayPickerCellContext()` returns `{ col, date, fields, label, inMonth }`; `date` is `undefined` for an empty overflow cell. Take day numbers from `label` or `fields`, never from the ISO `date` string.
- `locale` and `calendar` are root props; the layouts accept their own `locale` override.
