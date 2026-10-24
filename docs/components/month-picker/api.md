# MonthPicker API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `year` | `string` | `—` | No | Year whose months are shown, given as a `YYYY-MM-DD` string of any day in it. |
| `calendar` | `CalendarSystem` | `gregorianCalendar` | No | Calendar system the months belong to — it defines how many months a year has. |
| `locale` | `string` | `getDefaultLocale()` | No | BCP 47 locale of the month names, e.g. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `MonthPickerLayout`
- `MonthPickerRowGroup`
- `MonthPickerRow`
- `MonthPickerItem`
- `MonthPickerCell`

## Types

- `MonthPickerProps`
- `MonthPickerLayoutProps`
- `MonthPickerRowGroupProps`
- `MonthPickerRowProps`
- `MonthPickerItemProps`
- `MonthPickerCellProps`
- `MonthPickerCellContextData`

## State Model

- Selection and bounds behavior are inherited from `DataGridPicker`.
- Months are keyed by their first day as a `YYYY-MM-DD` string; `selected`, `from`, `to`, and `disabled` use the same strings.
- The root provides the visible `year` (its first day) and `calendar` through `useMonthPickerContext`.
- `createMonthPickerGrid({ year, calendar, cols })` derives the rows from the months of the year: 12, or 13 in Hebrew leap years.
- `MonthPickerLayout` formats labels with `Intl.DateTimeFormat` in the picker's calendar system.
- Children of `MonthPickerLayout` are the template of a cell, rendered once per month inside a cell context. The children are required, usually `<MonthPickerCell />`, which shows the formatted label.
- `useMonthPickerCellContext()` returns `{ col, date, fields, label }`; `date` is the first day of the month. Take month numbers from `label` or `fields`, never from the ISO `date` string.
- `locale` and `calendar` are root props; the layouts accept their own `locale` override.
