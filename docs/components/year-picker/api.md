# YearPicker API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `year` | `string` | `—` | No | Controls the currently visible year, given as a `YYYY-MM-DD` string of any day in it. |
| `calendar` | `CalendarSystem` | `gregorianCalendar` | No | Calendar system the years belong to, including eras. |
| `locale` | `string` | `getDefaultLocale()` | No | BCP 47 locale of the year labels (and eras), e.g. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `YearPickerLayout`
- `YearPickerRowGroup`
- `YearPickerRow`
- `YearPickerItem`
- `YearPickerCell`
- `YearPickerScroller`
- `YearPickerScrollerContent`
- `YearPickerScrollerLayout`

## Types

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

## State Model

- Selection and bounds behavior are inherited from `DataGridPicker`.
- Years are keyed by their first day as a `YYYY-MM-DD` string; `selected`, `from`, `to`, and `disabled` use the same strings.
- The root shares the visible `year` (its first day) and `calendar` through `useYearPickerContext`.
- `createYearPickerGrid({ rows, cols, start, offset, calendar })` returns a page of `rows × cols` consecutive years from the ISO `start`.
- Scroller pages hold `period` years (default `12`) counted from `referenceYear` (`useYearPickerScrollerContext`); keep `period` equal to the layout's `rows × cols`. `onChangePeriod` receives the first day of the first year of the page scrolled into view.
- Children of `YearPickerLayout` and `YearPickerScrollerLayout` are the template of a cell, rendered once per year inside a cell context. The children are required, usually `<YearPickerCell />`, which shows the formatted label.
- `useYearPickerCellContext()` returns `{ col, date, fields, label }`; `date` is the first day of the year. Take year numbers from `label` or `fields`, never from the ISO `date` string.
- `locale` and `calendar` are root props; the layouts accept their own `locale` override.
