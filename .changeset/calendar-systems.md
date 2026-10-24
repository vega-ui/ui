---
"@vega-ui/i18n": major
"@vega-ui/react": major
"@vega-ui/hooks": major
"@vega-ui/utils": major
---

`Calendar`, the pickers and the date fields work in any calendar system

New package `@vega-ui/i18n` with no dependencies and no knowledge of the components; every function that needs a calendar takes it as the first argument:
- the `CalendarSystem` adapter interface, the `GregorianCalendar` class (extendable with `super`, methods bound to the instance) and its shared instance `gregorianCalendar`; `createCalendarSystem(identifier)`, any other calendar built into `Intl` (Persian, Hebrew, Japanese, Buddhist, Islamic, Chinese…) with no dependencies: months numbered from the start of the year (13 in a Hebrew leap year), `Intl` era names, a year that ends with an era keeps only its own months, a year past the end of an era is clamped to its last year, an unknown era throws a `RangeError`; custom calendars plug in through the interface
- calendar-aware helpers over `YYYY-MM-DD` strings: `addCalendarMonths`, `addCalendarYears`, `getCalendarMonthStart` / `End`, `getCalendarYearStart` / `End`, `getCalendarMonthsDistance`, `getCalendarYearsDistance`, `getCalendarMonthsOfYear`, `getSameDayInCalendarMonth`, `getSameMonthInCalendarYear`, `isSameCalendarMonth`, and the calendar-neutral `DAYS_IN_WEEK`, `addISODays`, `getISOWeekday`, `isoDateToUTC`, `utcToISODate`, `padDatePart`; like `<input type="date">` they cover the years 0001–9999 and throw a `RangeError` outside them
- locale helpers: `getDefaultLocale()`, the runtime locale `Intl` uses by default, and `getFirstDayOfWeek`, `getWeekDayNames`, `getDateFormat`, `getDateSeparator`, moved from `@vega-ui/utils`: they take the locales argument of `Intl` and default to the runtime locale instead of `en-US`; `getDateFormat` / `getDateSeparator` take the calendar system first, describe the numeric fields, leave out eras and bidi marks (`ar-SA` gives `/`, not `\u200F/`), and use the Gregorian order of the locale for calendars that name their months (Hebrew, Chinese); new `toLatinDigits`
- `Intl` formatting: `formatCalendarDate`, `formatCalendarDay` (bare day numbers, `15` rather than `15日`), `createCalendarDateFormatter` / `createCalendarDayFormatter` (one `Intl.DateTimeFormat` reused for many days; the day, month and year grids create one per layout instead of one per cell)

`@vega-ui/utils` (now depends on `@vega-ui/i18n`):
- typed entry of the date fields over a calendar system, `formatTemplateDate`, `parseTemplateDate`, `parseTemplateRange`, `normalizeTemplateDate`, `stepTimeSegment` (time only, no calendar) and `getDateTemplate` (the field template of a date format: `dd.MM.yyyy` → `dd.mm.yyyy`), `getTimeTemplate` (`HH:mm` → `HH:MM`) and `getDateTimeTemplate` (the template of `DateTimeField`: `dd.mm.yyyy, HH:MM`); new `findISODateInRange(dates, start, end)`, the first `YYYY-MM-DD` date within a range, `getISODatePart` / `getISOTimePart`, the date and time parts of an ISO date time, and `subscribeInputValue(element, onValue)`, which reports an input's text now, on every `input` event and after a form reset

`Calendar`, `DateField`, `DateTimeField`, `DateRangeField`, `DayPicker`, `MonthPicker`, `YearPicker`:
- new `calendar` and `locale` props on the root, applied to every part (labels, weekday names, week start, day, month and year grids); defaults are the Gregorian calendar and the runtime locale, like `Intl`. There is no global provider: for app-wide settings, wrap the component (`<Calendar locale={appLocale} {...props} />`). Values stay ISO strings in every calendar
- `Calendar` sets `lang` on its root when `locale` is given
- PageUp / PageDown move focus to the same day of the previous / next month, Shift+PageUp / Shift+PageDown to the same day of the previous / next year (WAI-ARIA date picker pattern)

`Calendar` composition (breaking), one part per view instead of four nesting levels:
- removed `CalendarDayPicker` and its `Item` / `Row` / `RowGroup` / `Scroller` / `ScrollerContent` / `ScrollerLayout`, `CalendarMonthPicker` and its `Item` / `Row` / `RowGroup` / `Layout`, `CalendarYearPicker` and its `Item` / `Row` / `RowGroup` / `Scroller` / `ScrollerContent` / `ScrollerLayout`, `CalendarMonthPickerButton`, `CalendarYearPickerButton`, `CalendarPickerButtonGroup`, `CalendarPrevYearGroupButton`, `CalendarNextYearGroupButton`, `CalendarWeekLabel`, `CalendarWeekLabels`
- new `CalendarDays` (the day view, holding the new `CalendarWeekdays`, weekday names in the calendar's locale with `format`, and `CalendarWeeks`, the swipeable day grid with `format` and `includeOverflowDays`), `CalendarMonths` (`cols`, `format`), `CalendarYears` (`format`)
- weekdays and cells are customized with template children, no render functions: the children of `CalendarWeekdays` / `CalendarWeeks` / `CalendarMonths` / `CalendarYears` render once per weekday or cell, read it with `useCalendarWeekdayContext()` (column, `weekday` as in `Date#getDay()`, name) / `useCalendarDayContext()` / `useCalendarMonthContext()` / `useCalendarYearContext()` (ISO date, fields in the calendar system, formatted label) and render `CalendarWeekday` / `CalendarDay` / `CalendarMonth` / `CalendarYear`; the template is required, there is no implicit default cell
- `CalendarViewButton view='month' | 'year'` and `CalendarViewButtonGroup` replace the month and year picker buttons
- `CalendarPrevButton` / `CalendarNextButton` follow the view: months in the days, pages of years in the years; they show a chevron unless `children` are given
- the views (`CalendarDays`, `CalendarMonths`, `CalendarYears`) take only HTML attributes and display options; the month, selection, disabled dates, locale and calendar come from the `Calendar` root
- `CalendarMonthLabel` / `CalendarYearLabel` drop `locale`: every part uses the locale of the `Calendar`
- `picker` / `defaultPicker` / `onChangePicker` → `view` / `defaultView` / `onChangeView`; type `CalendarPicker` → `CalendarView`; `useCalendarContext` exposes `view`, `toggleView`, `closeView`, `prev`, `next`, `locale`

Date fields:
- digits of any numbering system are accepted while typing (`٠٥.٠١.٢٠٢٦`, `۱۴۰۵/۰۱/۰۱`) and written as Latin digits
- typing is validated in the calendar system: the day is clamped to the length of the month (`31.02.2026` → `28.02.2026`), a digit that cannot start a segment is zero-padded (`4` → `04`), a complete value is clamped to `min` / `max`
- `DateTimeField` (breaking): `timeFormat` uses the notation of `dateFormat` (Unicode date patterns, `mm` = minutes): `'HH:mm' | 'HH:mm:ss'` instead of `'HH:MM' | 'HH:MM:SS'`
- `DateRangeField` swaps a range typed in reverse; `DateTimeField` steps the time segment under the caret with ArrowUp / ArrowDown: hours by 1, minutes and seconds by `timeStep` (like `datetime-local`), so `timeStep={15}` no longer adds 15 hours
- the field's date follows the input text: clearing or leaving it incomplete clears the calendar selection, a native `defaultValue` opens the calendar on that day, and `form.reset()` re-syncs the calendar
- when `min` / `max` change, already typed text is clamped again (firing `input`)
- `DateRangeField`'s default `rangeSeparator` (an en dash between non-breaking spaces) is documented accurately

`DayPicker`, `MonthPicker`, `YearPicker` (breaking):
- cells are keyed by ISO strings (`YYYY-MM-DD`, the first day of the month / year for the month and year pickers) instead of timestamps and numbers
- `DayPicker`: `year` / `month` numbers → `month` (any day of the month as `YYYY-MM-DD`) and `calendar`; `DayPickerScroller` takes `defaultMonth` and reports `onChangePeriod(month)`; `DayPickerLayout` / `createDayPickerGrid` `offset` is only the page index that keeps row indexes unique (the month comes from `month`, no longer shifted by `offset`); `DayPickerLayout` / `createDayPickerGrid` drop `cols` (the week has seven days in every calendar; other values broke the grid); `createDayPickerGrid({ month, calendar, offset, … })` returns `{ col, date, day, inCurrentMonth }`; `getIndexByDate` / `getDateByIndex` removed
- `MonthPicker`: `year` is a `YYYY-MM-DD` string, `calendar` added; `createMonthPickerGrid({ year, calendar, cols })` derives the rows, so years with 13 months fit; `MonthPickerLayout` drops `rows` / `start`; new `useMonthPickerContext`
- `YearPicker`: `year` is a `YYYY-MM-DD` string, `calendar` added; `createYearPickerGrid` and `YearPickerLayout` take `start` as `YYYY-MM-DD`; `YearPickerScroller` takes `defaultYear` and `period` instead of `getIndexByYear`; `getIndexByYear` / `getYearByIndex` removed
- `DayPickerLayout`, `MonthPickerLayout`, `YearPickerLayout` (and the scroller layouts) require the same template children (`<DayPickerCell />`, …); new `DayPickerCell`, `MonthPickerCell`, `YearPickerCell` and `useDayPickerCellContext`, `useMonthPickerCellContext`, `useYearPickerCellContext`
- `DataGrid` ignores key presses whose default was already prevented
- in range mode the bounds are always reported in order (`[start, end]`, `start` not after `end`), also when the range is picked backwards (`@vega-ui/hooks` `useSelection` orders them); the same holds for `Calendar`'s `onChangeValue`
- without `defaultActive` the tab stop is always a cell in view: today when it is in the visible month / year, otherwise the first selected cell there, otherwise the first cell (`YearPicker`: the visible `year`); before, Tab skipped the grid when today was not shown
- `YearPickerScroller` reports the page in view with `onChangePeriod(year)`, like `DayPickerScroller`

Right-to-left:
- the calendars and pickers follow the inherited text direction (`dir` on the page, an ancestor or the component), like native elements: the grids run right to left, ArrowLeft / ArrowRight are mirrored, the default Prev / Next chevrons point the right way, range ends are rounded on the correct side, and swiping and the scrollers page in the right direction (`@vega-ui/hooks` `useScrollSnap` aligns snap points in RTL)

Fixes:
- `Calendar` without `selection` is typed as single selection, so `onChangeValue={setState}` with `useState<string>` type-checks
- `getCalendarMonthsOfYear` (`@vega-ui/i18n`) returns only the months of each era in a year where a Japanese era changes (no duplicated months in `MonthPicker`)
- `getFirstDayOfWeek` (now in `@vega-ui/i18n`) reads `Intl.Locale` week info correctly (`getWeekInfo()` or `weekInfo`, Sunday = 7) and falls back to the region of the locale (`fa-IR` → Saturday, `pt-BR` → Sunday) when the runtime has no week info
- `NumberField`, `PhoneField`, `PinField` follow the input text like the date fields: after `form.reset()` the − / + buttons, the detected country and the PIN slots match the restored text, and a native `defaultValue` selects the country of the number (`PhoneField`) and fills the slots (`PinField`). `PhoneField` writes the calling code of a picked country only when a controlled parent accepts it. Breaking for custom parts: `useNumberFieldContext` and `usePhoneFieldContext` no longer expose `onInput`, `usePinFieldContext` no longer exposes `setValue`
- `IndexedSnapScroller` (and every calendar scroller built on it) no longer moves pages under an ongoing scroll: it appends pages while a scroll reaches the end and re-centers the window once the scroll settles, so swiping to the edge in WebKit and Firefox no longer jumps two pages further (e.g. December → February) and fast swipes keep going; `onOffset(-1)` now fires when the scroll settles on the first page
- `IndexedSnapScroller` keeps a scroll made right after a snap settles instead of jumping back a page (seen with fast swipes on a busy page)
- `IndexedSnapScroller` re-syncs to a controlled `index` only when that prop changes, so the year picker no longer jumps back to the visible year after scrolling
- `Calendar` month and year arrows no longer stop working after a few clicks: each click moves one page from the page the scroll is already heading to (clicks during a smooth scroll were lost in Firefox), the window grows when the target is outside it, and focus keeps the same day across quick month changes
- `@vega-ui/hooks` (breaking): `useIndexes` replaces `push()` / `shift()` with `extend(dir)` (grow the window at an edge without moving existing pages) and `center(index)` (re-center the window on a page); `useScrollSnap`'s `scrollToElementByKey` returns whether the item exists

Removed unused APIs (breaking):
- `@vega-ui/react`: `useMonthPickerScrollerContext` (an alias of `useIndexedSnapScrollerContext`; `MonthPicker` has no scroller)
- `@vega-ui/utils`: `formatDay`, `formatMonth`, `formatYear` (Gregorian-only; use `formatCalendarDate` / `formatCalendarDay` from `@vega-ui/i18n`), `isEqualDates`, `getClampedDate`, `capitalize`, `uncapitalize`; `getFirstDayOfWeek`, `getWeekDayNames`, `getDateFormat`, `getDateSeparator` moved to `@vega-ui/i18n`
