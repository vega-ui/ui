# Calendar API

## Root API

`Calendar` is the root state container for the calendar system.


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `max` | `string` | `—` | No | Latest selectable date as a `YYYY-MM-DD` string. |
| `min` | `string` | `—` | No | Earliest selectable date as a `YYYY-MM-DD` string. |
| `selection` | `S` | `'single' as S` | No | Selection mode. |
| `view` | `CalendarView` | `—` | No | Controlled visible view: - 'day' — the days of the visible month (`CalendarDays`) - 'month' — the months of the visible year (`CalendarMonths`) - 'year' — pages of years (`CalendarYears`) |
| `value` | `CalendarValue<S>` | `—` | No | Controlled selection value, shaped by the `selection` mode. |
| `defaultValue` | `CalendarValue<S>` | `—` | No | Uncontrolled initial selection value, shaped by the `selection` mode. |
| `defaultView` | `CalendarView` | `'day'` | No | Initial view for uncontrolled usage. |
| `disabled` | `boolean` | `—` | No | Disables the whole calendar: no date can be selected and navigation is off. |
| `disabledDates` | `CalendarDatesDisabled` | `—` | No | Dates that cannot be selected, as `YYYY-MM-DD` strings: - a single date - an array of dates - a predicate `(date: string) => boolean` |
| `onChangeValue` | `(value: CalendarValue<S>) => void` | `—` | No | Fires when the user changes the selection. |
| `onChangeView` | `(view: CalendarView) => void` | `—` | No | Fires when the visible view changes. |
| `month` | `string` | `—` | No | Controlled visible month, given as a `YYYY-MM-DD` string of any day in that month. |
| `defaultMonth` | `string` | `—` | No | Initial visible month for uncontrolled usage, given as a `YYYY-MM-DD` string of any day in that month. |
| `onChangeMonth` | `(month: string) => void` | `—` | No | Fires with the first day of the visible month as a `YYYY-MM-DD` string when the visible month changes (e.g., via scrolling or the month and year pickers). |
| `calendar` | `CalendarSystem` | `gregorianCalendar` | No | Calendar system the calendar is shown in. |
| `locale` | `string` | `—` | No | BCP 47 locale of month and day names and of the first day of the week, e.g. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts API

The public child parts are grouped into four families:

- header and navigation parts
- view switching buttons
- views
- cell templates

| Part | Props | Notes |
| --- | --- | --- |
| `CalendarHeader`, `CalendarContent` | HTML attributes | Layout wrappers. |
| `CalendarPrevButton`, `CalendarNextButton` | icon button props | Previous / next month in the days, previous / next page of years in the years; hidden in the months view. Show a chevron unless `children` are given. |
| `CalendarViewButtonGroup` | HTML attributes | Groups the view buttons. |
| `CalendarViewButton` | `view: 'month' \| 'year'` | Toggles that view, `aria-pressed` while it is shown. |
| `CalendarMonthLabel`, `CalendarYearLabel` | `format?` | Visible month and year in the locale of the root. |
| `CalendarDays` | HTML attributes, `children` | Day view; holds `CalendarWeekdays` and `CalendarWeeks`. |
| `CalendarWeekdays` | `format?: 'long' \| 'short' \| 'narrow'` (default `'short'`), `children` (weekday template) | Weekday names in the locale of the root. |
| `CalendarWeeks` | `format?`, `includeOverflowDays?`, `children` (cell template) | Swipeable day grid. |
| `CalendarMonths` | HTML attributes, `cols?` (default `3`), `format?` (default `'long'`), `children` (cell template) | Months of the visible year. |
| `CalendarYears` | HTML attributes, `format?` (default `'numeric'`), `children` (cell template) | Swipeable pages of years. |
| `CalendarWeekday` | week label props, `children?` | Weekday template; without children it shows the weekday name. |
| `CalendarDay`, `CalendarMonth`, `CalendarYear` | cell props, `children?` | Cell templates; without children they show the formatted label. |

The views take only HTML attributes and display options. The month, selection, disabled dates, locale, calendar system, size and variant come from the `Calendar` root.

Children of `CalendarWeekdays`, `CalendarWeeks`, `CalendarMonths`, and `CalendarYears` are a template rendered once per weekday or cell. They are required, usually `<CalendarWeekday />`, `<CalendarDay />`, `<CalendarMonth />`, or `<CalendarYear />`.

The child parts should be treated as one coordinated system, not as isolated widgets.

## Hooks

### `useCalendarContext`

Advanced hook for custom parts. Exposes the root state, including `view`, `month`, `locale`, `calendar`, `toggleView(view)`, `closeView()`, `prev()`, and `next()`.

### `useCalendarWeekdayContext`

Weekday of the surrounding `CalendarWeekdays` template:

| Field | Type | Notes |
| --- | --- | --- |
| `col` | `number` | Column index within the row. |
| `weekday` | `number` | Day of the week as in `Date#getDay()`: `0` is Sunday, `6` is Saturday. |
| `label` | `string` | Weekday name in the locale of the root. |

### `useCalendarDayContext`

Day of the surrounding `CalendarWeeks` template:

| Field | Type | Notes |
| --- | --- | --- |
| `col` | `number` | Column index within the week. |
| `date` | `string \| undefined` | ISO `YYYY-MM-DD` day; `undefined` for an empty overflow cell. |
| `fields` | `CalendarDateFields \| undefined` | Day in the calendar system: `{ era?, year, month, day }`. |
| `label` | `string` | Formatted day number in the locale and calendar system. |
| `inMonth` | `boolean` | Whether the day belongs to the rendered month. |

### `useCalendarMonthContext` / `useCalendarYearContext`

Month or year of the surrounding `CalendarMonths` / `CalendarYears` template: `col`, `date` (first day of the month or year, ISO), `fields`, and `label`.

Take the day, month, or year number from `label` or `fields`, never from the ISO `date` string: in non-Gregorian calendars they differ.

## Types

| Type | Definition | Notes |
| --- | --- | --- |
| `CalendarProps` | Root prop type | Main integration surface. |
| `CalendarView` | view union | `'day'`, `'month'`, or `'year'`. |
| `CalendarSelection` | selection union | `single`, `multiple`, or `range`. |
| `CalendarValue` | selection value by mode | `YYYY-MM-DD` string, `[start, end]` tuple (`start` never after `end`), or array of strings. |
| `CalendarDatesDisabled` | disabled-date contract | `YYYY-MM-DD` string, array of strings, or a `(date: string) => boolean` predicate. |

## State Model

- Visible date and selection state live in the root.
- Selection mode changes the expected value shape.
- Views coordinate around the same root state.
- `view` determines which of days, months, or years is visible and drives the previous and next buttons.
- `locale` and `calendar` are root props read by every part; the default is the runtime locale and the Gregorian calendar.

## Integration Notes

- Pass ISO `YYYY-MM-DD` strings to the component layer and keep them as the stored value; convert to other formats in the application layer.
- `calendar` changes how days are grouped and labeled, not the value. See [Dates And Calendar Systems](../../i18n.md).
- Retest custom cell templates and overflow cells carefully.
- Use the lower-level `DayPicker`, `MonthPicker`, and `YearPicker` only when the full `Calendar` composition is not needed.
- Reach for `DayPicker`, `MonthPicker`, `YearPicker`, or `CalendarBase` only when building custom calendar-family behavior, not as a first choice for normal date picking flows.
