# @vega-ui/utils

## 3.0.0

### Major Changes

- 1af9fda: `Calendar`, the pickers and the date fields work in any calendar system

  New package `@vega-ui/i18n` with no dependencies and no knowledge of the components; every function that needs a calendar takes it as the first argument:

  - the `CalendarSystem` adapter interface, the `GregorianCalendar` class (extendable with `super`, methods bound to the instance) and its shared instance `gregorianCalendar`; `createCalendarSystem(identifier)`, any other calendar built into `Intl` (Persian, Hebrew, Japanese, Buddhist, Islamic, Chinese…) with no dependencies: months numbered from the start of the year (13 in a Hebrew leap year), `Intl` era names, a year that ends with an era keeps only its own months, a year past the end of an era is clamped to its last year, an unknown era throws a `RangeError`; custom calendars plug in through the interface
  - calendar-aware helpers over `YYYY-MM-DD` strings: `addCalendarMonths`, `addCalendarYears`, `getCalendarMonthStart` / `End`, `getCalendarYearStart` / `End`, `getCalendarMonthsDistance`, `getCalendarYearsDistance`, `getCalendarMonthsOfYear`, `getSameDayInCalendarMonth`, `getSameMonthInCalendarYear`, `isSameCalendarMonth`, and the calendar-neutral `DAYS_IN_WEEK`, `addISODays`, `getISOWeekday`, `isoDateToUTC`, `utcToISODate`, `padDatePart`; like `<input type="date">` they cover the years 0001–9999 and throw a `RangeError` outside them
  - locale helpers: `getDefaultLocale()`, the runtime locale `Intl` uses by default, and `getFirstDayOfWeek`, `getWeekDayNames`, `getDateFormat`, `getDateSeparator`, moved from `@vega-ui/utils`: they take the locales argument of `Intl` and default to the runtime locale instead of `en-US`; `getDateFormat` / `getDateSeparator` take the calendar system first, describe the numeric fields, leave out eras and bidi marks (`ar-SA` gives `/`, not `\u200F/`), and use the Gregorian order of the locale for calendars that name their months (Hebrew, Chinese); new `toLatinDigits`
  - `Intl` formatting: `formatCalendarDate`, `formatCalendarDay` (bare day numbers, `15` rather than `15日`), `createCalendarDateFormatter` / `createCalendarDayFormatter` (one `Intl.DateTimeFormat` reused for many days; the day, month and year grids create one per layout instead of one per cell)

  `@vega-ui/utils` (now depends on `@vega-ui/i18n`):

  - typed entry of the date fields over a calendar system, `formatTemplateDate`, `parseTemplateDate`, `parseTemplateRange`, `normalizeTemplateDate`, `stepTimeSegment` (time only, no calendar) and `getDateTemplate` (the field template of a date format: `dd.MM.yyyy` → `dd.mm.yyyy`), `getTimeTemplate` (`HH:mm` → `HH:MM`) and `getDateTimeTemplate` (the template of `DateTimeField`: `dd.mm.yyyy, HH:MM`); new `findISODateInRange(dates, start, end)`, the first `YYYY-MM-DD` date within a range, and `getISODatePart` / `getISOTimePart`, the date and time parts of an ISO date time; `snapToStep(value, { min, max, step })`, the step grid of `<input type="range">`

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
  - clearing the text or leaving it incomplete clears the calendar selection, and `form.reset()` re-syncs the calendar
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
  - `NumberField`, `PhoneField`, `PinField`: after `form.reset()` the − / + buttons, the detected country and the PIN slots match the restored value. `PhoneField` writes the calling code of a picked country only when a controlled parent accepts it. Breaking for custom parts: `useNumberFieldContext` and `usePhoneFieldContext` no longer expose `onInput`
  - `IndexedSnapScroller` (and every calendar scroller built on it) no longer moves pages under an ongoing scroll: it appends pages while a scroll reaches the end and re-centers the window once the scroll settles, so swiping to the edge in WebKit and Firefox no longer jumps two pages further (e.g. December → February) and fast swipes keep going; `onOffset(-1)` now fires when the scroll settles on the first page
  - `IndexedSnapScroller` keeps a scroll made right after a snap settles instead of jumping back a page (seen with fast swipes on a busy page)
  - `IndexedSnapScroller` re-syncs to a controlled `index` only when that prop changes, so the year picker no longer jumps back to the visible year after scrolling
  - `Calendar` month and year arrows no longer stop working after a few clicks: each click moves one page from the page the scroll is already heading to (clicks during a smooth scroll were lost in Firefox), the window grows when the target is outside it, and focus keeps the same day across quick month changes
  - `@vega-ui/hooks` (breaking): `useIndexes` replaces `push()` / `shift()` with `extend(dir)` (grow the window at an edge without moving existing pages) and `center(index)` (re-center the window on a page); `useScrollSnap`'s `scrollToElementByKey` returns whether the item exists
  - `@vega-ui/hooks` `useSelection` matches `disabled` keys with `equals`, like selection: object keys with a custom `equals` (`{ row, col }`) are blocked, not only the same reference
  - `Slider` behaves like `<input type="range">`: handlers passed to the root (`onKeyDown`, `onPointerDown`, …) run after the built-in ones instead of replacing them, steps count from `min` (`min={1} step={2}` gives 1, 3, 5…), the arrow keys stop at `min` / `max` when a step overshoots them, End goes to the last step that fits in `max`, fractional steps keep their precision (`0.3`, not `0.30000000000000004`), and a cancelled pointer (`pointercancel`) ends the drag
  - `RangeSlider` follows the same rules: user handlers no longer replace the built-in ones, steps count from `min`, fractional steps keep their precision, End stops at the last step that fits in `max`, `pointercancel` ends the drag; the right thumb no longer goes past `max` with ArrowRight, the left thumb reaches `min` when a step overshoots it, and a step that would pass the other thumb stops at it instead of being ignored

  Removed unused APIs (breaking):

  - `@vega-ui/react`: `useMonthPickerScrollerContext` (an alias of `useIndexedSnapScrollerContext`; `MonthPicker` has no scroller)
  - `@vega-ui/utils`: `formatDay`, `formatMonth`, `formatYear` (Gregorian-only; use `formatCalendarDate` / `formatCalendarDay` from `@vega-ui/i18n`), `isEqualDates`, `getClampedDate`, `capitalize`, `uncapitalize`; `getFirstDayOfWeek`, `getWeekDayNames`, `getDateFormat`, `getDateSeparator` moved to `@vega-ui/i18n`

- 6f10f80: - **Breaking:** `setValue` and `dispatchEvents` are replaced by `writeInputValue(input, value)` from `@vega-ui/utils`: it sets the value through the native setter, so React sees the change, and dispatches bubbling `input` and `change` events
  - the context of `NumberField` is named `NumberFieldContext` in errors instead of `PhoneFieldContext`
  - `getPending()` and `getCommitted()` of the `SnapScroller` api ref and `index` of the `IndexedSnapScroller` api ref are typed `number | null`: they are `null` until the scroller has measured its items

### Minor Changes

- 6f10f80: The value of the masked fields moves to the root, like `Slider`: the input part only shows it, so a controlled field keeps every keystroke and follows a value changed outside.

  - **Breaking:** `NumberField` takes `value`, `defaultValue` and `onChangeValue` as a number, `NaN` for an empty field; `NumberFieldInput` no longer takes `value` and `defaultValue`
  - **Breaking:** `PhoneField` takes `value`, `defaultValue` and `onChangeValue` as the text of the number; `PhoneFieldInput` no longer takes `value` and `defaultValue`. The country of `defaultValue` is selected unless `code` is set
  - **Breaking:** `DateField` takes `value`, `defaultValue` and `onChangeValue` as a `YYYY-MM-DD` day, `DateTimeField` as a `YYYY-MM-DDTHH:mm[:ss]` timestamp, `DateRangeField` as a `[start, end]` tuple of days; `''` while the text is empty or incomplete. Their input parts no longer take `value` and `defaultValue`
  - the input parts still fire their own `onChange` and `onInput` on every edit of the text, and `name` still submits the text
  - a form reset restores `defaultValue` unless the field is controlled
  - the increment and decrement buttons of `NumberField` follow changes of `min` and `max`
  - **Breaking for custom parts:** the contexts of these fields expose the shown `text` and `changeText` instead of `setText`, `detectCode` and `changeDate` / `changeTime`

  `@vega-ui/utils`: new `formatTemplateRange(calendar, [start, end], template, separator)`, the counterpart of `parseTemplateRange`.

- ed90a1c: ISO string dates in `Calendar` and date fields, like native date inputs; `Calendar` follows the WAI-ARIA date picker pattern

  `Calendar`:

  - `value` / `defaultValue` are ISO strings: `'YYYY-MM-DD'` (single, `''` is empty), `[start, end]` (range, `''` is an unset bound), `string[]` (multiple)
  - `onChange` → `onChangeValue`
  - `from` / `to` → `min` / `max` (`'YYYY-MM-DD'`)
  - `disabled` is now a boolean that disables the whole calendar; disabled dates moved to `disabledDates` (`string | string[] | (date: string) => boolean`)
  - `date` / `defaultDate` / `onChangeDate` → `month` / `defaultMonth` / `onChangeMonth`: the visible month is given as a `'YYYY-MM-DD'` string of any day in it; `onChangeMonth` reports its first day and fires only when the month actually changes
  - the visible month defaults to the month of the selected date
  - `activeDay` / `defaultActiveDay` / `onChangeActiveDay` removed: keyboard focus starts on the selected day in the visible month, otherwise today, otherwise the first available day
  - navigating to another month or year moves focus to the same day there, clamped to the month length and skipping unavailable days
  - `referenceDate` removed from the public API
  - an empty controlled value (`''`) now clears the selection
  - new type export: `CalendarValue`

  `DateField`, `DateTimeField`, `DateRangeField`:

  - `min` / `max` are ISO strings instead of `Date` (`'YYYY-MM-DD'`; `'YYYY-MM-DDTHH:mm[:ss]'` for `DateTimeField`)
  - `disabledDates` takes ISO strings
  - like the WAI-ARIA date picker pattern, navigating the calendar only moves focus — the field value changes only when a day is picked, and Escape closes the calendar without changing it

  Fixes:

  - `Calendar`: after picking a month in the month picker, WebKit no longer jumps back to the previous month
  - `Calendar`: fast scrolling no longer skips months in `onChangeMonth`, the header and keyboard focus
  - `IndexedSnapScroller`: with fractional item widths, scrolling no longer gets stuck on the last item of the window
  - `DateRangeFieldCalendar`: removed a leftover `console.log`

  - `@vega-ui/hooks`: `useSelection` accepts `null` as an empty single selection; `useScrollSnap` updates the pending snap on instant programmatic scrolls and no longer swallows snap changes when re-measuring or committing on `scrollend`
  - `@vega-ui/utils`: new `formatISODate`, `parseISODate`, `parseISODateTime`, `sanitizeISODates`

  Breaking: the `Calendar` props above and the `min` / `max` / `disabledDates` types of the date fields change.

- d0069e2: New `subscribeFormReset(element, onReset)`: calls `onReset` when a form that owns `element` or a control inside it is reset. Forms linked by the `form` attribute count, the owner is checked at reset time, and a canceled reset is skipped.
- f827279: `TimeField` keeps its value on the root like the other masked fields:

  - **Breaking:** `TimeField` takes `value`, `defaultValue` and `onChangeValue` as a `HH:mm` time (`HH:mm:ss` when the format has seconds), `''` while the text is empty or incomplete; `TimeFieldInput` no longer takes `value` and `defaultValue`. A form reset restores `defaultValue` unless the field is controlled
  - **Breaking:** `format` uses the notation of `DateTimeField.timeFormat`: `'HH:mm' | 'HH:mm:ss'` instead of `'HH:MM' | 'HH:MM:SS'`
  - **Breaking:** `min` and `max` bound the whole time like a native `<input type="time">`: a complete time outside them is replaced by the nearest bound, instead of bounding each segment separately; invalid bounds are ignored
  - ArrowUp / ArrowDown step the hours by one and the minutes or seconds under the caret by `step`, like `DateTimeField`; digits of other numbering systems are accepted

  `@vega-ui/utils`: new `parseTemplateTime`, `formatTemplateTime` and `normalizeTemplateTime` for times typed by a `HH:MM[:SS]` template, and `isISOTime`, a check for `HH:mm[:ss]` strings

- 399fd0d: Add helpers for native overlays and gestures:

  - `togglePopover(element, force)` shows or hides a `popover` element and does nothing when the Popover API is not supported.
  - `rubberBand(overshoot, dimension, constant)` returns how far an element follows a drag past its limit, with iOS-like resistance.
  - `projectMomentum(velocity, decelerationRate)` returns how far a flick travels before it stops.
  - `findScrollableAncestor(element, boundary)` returns the closest vertically scrollable element up to a boundary.
  - `createWarmUp(duration)` creates a shared window that lets the next element skip its delay, and `tooltipWarmUp` is the one tooltips share.
  - `isBackdropPoint(dialog, { target, clientX, clientY })` tells whether a press on a modal `<dialog>` landed on its `::backdrop`.
  - `isTextInteraction(target)` tells whether a press is meant for text: it lands in a form field or editable content, or text is selected.
  - `resolveSnapStop(stops, current, position, stepped)` returns the stop a drag released at `position` settles at, moving one stop at most when `stepped`.
  - `resolveLength(length, total)` resolves a fraction of `total` or a pixel length to pixels, never more than `total`.

### Patch Changes

- 875e52a: `BiMap` handles `undefined` keys and values: `deleteByKey` and `deleteByValue` remove such entries instead of returning `false`, and `set` no longer leaves a stale entry behind when the previous key or value was `undefined`.
- 5feb6c9: fixed merging events & snapping to step
- 7c5e42b: `csx` removes repeated class names inside multi-class arguments and extra whitespace: `csx('btn primary', 'btn')` returns `'btn primary'`
- 80acd5a: `inRange` accepts a range in either order: `inRange(7, [10, 5])` is `true`. Before, the bounds were only checked as `[min, max]`, so a descending range never matched.
- 3580f9f: Mark the packages as free of side effects so bundlers like webpack can drop unused modules
- 90c22d3: `Matrix.tail(count)` returns all rows when `count` exceeds the number of rows instead of only the last few
- af29e8c: `mergeProps` keeps an event handler or `style` when a later props object passes `undefined` for it, so `<PopoverContent onKeyDown={props.onKeyDown}>` no longer drops the internal handler
- 0d7649f: `NumberField` follows `<input type="number">`:

  - stepping keeps the decimals of the value and of `step`: `0.7` + `0.1` gives `0.8` (before, the mask cut `0.7999999999999999` to `0.79`)
  - the wheel steps the value only when the input is focused and under the pointer; over an unfocused field it no longer blocks the page scroll
  - a root `onKeyDown` runs after the built-in arrow keys instead of replacing them

  `@vega-ui/utils`:

  - new `addWithPrecision(value, delta)`, a sum rounded to the decimals of its operands
  - new `countDecimals(value)`, the decimals of a number, also in exponent notation (`1.5e-7` → 8)
  - `snapToStep` keeps the precision of steps written in exponent notation (`step={1e-7}` no longer rounds to integers)

- Updated dependencies [1af9fda]
  - @vega-ui/i18n@3.0.0

## 2.5.0

### Minor Changes

- 0ffc52f: `useSelection`: optional `compare` no longer crashes; new `compare` util

  `compare?` was declared optional but invoked unconditionally in `edges`, `isSelected` and `isDisabled` — range selection or `min`/`max` clamping without a user-provided comparator threw `compare is not a function` (while `expand` had a guard, confirming the option was meant to be optional).

  - `@vega-ui/utils` now exports `compare` — a three-way comparator constrained to the new `Comparable` type (`number | string | bigint | Date`), so types with no universal ordering (objects, symbols) are rejected at compile time; covered with unit tests
  - `useSelection` falls back to it when no `compare` is passed, mirroring the existing `equals ?? Object.is` pattern; pass an explicit `compare` for non-primitive key types
  - `expand` no longer silently no-ops without a user comparator
  - empty or `undefined` `selected` no longer produces `undefined` range edges: `edges()` returns `[]`, `isSelected` returns `false` instead of comparing `undefined`
  - `DataGridSelectable` reuses the shared `compare` instead of its own inline duplicate of the same fallback (no behavior change)

### Patch Changes

- 1007aae: Fix broken `main` field in hooks, utils and react-context

  In `@vega-ui/hooks`, `@vega-ui/utils` and `@vega-ui/react-context` the `main` field pointed to `./dist/index.ts` — a file that doesn't exist in `dist/` (the build only outputs `.js` and `.d.ts`). Modern bundlers masked the problem by resolving through the `exports` map, but environments that rely on `main` (Node without conditional exports support, Jest with legacy resolution, ts-node, CDNs like esm.sh) got `MODULE_NOT_FOUND` or tried to parse TypeScript as JS.

  Changes:

  - `main` now points to `./dist/index.js`
  - added `module: "./dist/index.js"` (consistent with `@vega-ui/react`)
  - added the missing top-level `types: "./dist/index.d.ts"` to utils and react-context so resolvers that don't support `exports` can find the type declarations

- 55a8c44: Sync rollup externals with real dependencies

  `vite.config.ts` of icons and utils listed externals manually, including `@vega-ui/helpers` — a package that doesn't exist in the monorepo — plus entries these packages never import (`@floating-ui/react`, `react-remove-scroll`, `@vega-ui/hooks`). Hand-written lists drift from real dependencies; a stray module matching a dead entry would silently produce a broken bundle.

  - **icons**: externals are now derived from `Object.keys(packageJson.dependencies)` + `Object.keys(packageJson.peerDependencies)` (same pattern as `@vega-ui/react` and `@vega-ui/hooks`), so the "don't bundle this" contract always matches the declared dependencies.
  - **utils**: the package has no runtime dependencies at all (React appears only in type imports), so the list is trimmed to the explicit `['react', 'react-dom', 'react/jsx-runtime']` safety net.
  - `resolveJsonModule: true` added to `tsconfig.node.json` of ui/hooks/icons (their vite configs import `package.json`); the empty `tsconfig.node.json` of utils filled in to match the other packages.

## 2.4.0

## 2.3.1

## 2.3.0

## 2.2.1

## 2.2.0

### Minor Changes

- 798d27c: # Adding New Components

  ## DateField

  - A date input field with masking and format validation.
  - Uses `useControlledState` for controlled/uncontrolled values.
  - Composed of the following components:
    - `DateFieldInput`
    - `DateFieldCalendar`
  - Supports date formats (e.g., "dd.MM.yyyy", "MM/dd/yyyy").
  - Supports minimum and maximum date restrictions (`minDate`, `maxDate`).

  ## DateTimeField

  - A date and time input field.
  - Combines the logic of `DateField` and `TimeField`.
  - Composed of the following components:
    - `DateTimeFieldInput`
    - `DateTimeFieldCalendar`
    - `TimeSelector` (for selecting time)
  - Uses `useControlledState`.

  ## DateRangeField

  - A field for selecting a date range.
  - Composed of the following components:
    - Two `DateField`s (start and end dates)
    - `DateRangeCalendar` (calendar for selecting the range)
  - Handles range validation (start date ≤ end date).
  - Uses `useControlledState`.

  ## TimeField

  - A time input field.
  - Supports masking and time format (e.g., "HH:mm").
  - Uses `useControlledState`.
  - Composed of the following components:
    - `TimeFieldInput`
    - Additional controls (arrows, time selector)

## 2.1.1

## 2.1.0

### Minor Changes

- 8380d3b: Refactor Calendar stack to scroll-snap scrollers (DataGridPickerScroller) and remove react-store based state.

  ## @vega-ui/ui

  ### SnapScroller

  - **BREAKING:** `initialIndex` renamed to `defaultIndex`.
  - **BREAKING:** removed `preserveScroll`.
  - **BREAKING:** removed `onOffset`.
  - Added scroll-snap callbacks:
    - `onScrollSnapChanging?(element, index)`
    - `onScrollSnapChange?(element, index)`

  ### IndexedSnapScroller

  - Keeps offset-based infinite behavior (window `shift()` / `push()`) and optional `preserveScroll`.
  - Supports controlled `index` (scrolls to it when in window; rebuilds window when outside).

  ### DataGrid

  - **BREAKING:** `onMove(e, node, axis, dir)` replaced with `onArrow(e, nextNode, prevNode)`.
  - **BREAKING:** `DataGridApiRef` changed:
    - removed `keyMap`
    - added `scopes: Map<DataGridScope, DataGridCellKey[]>`
  - `DataGridRowGroup` now supports `scope?: DataGridScope` and provides it via context.
  - Cells unregister from the grid on unmount (node cleanup).
  - Active/selection focus flow updated to sync active cell on focus changes.

  ### DataGridPicker

  - Added `DataGridPickerScroller` and `DataGridPickerScrollerContent`.
  - `DataGridPickerScroller` integrates with scroll-snap events to restore/adjust active focus for the current scope.

  ### DayPicker

  - **BREAKING:** DayPicker scrolling is now driven by `DataGridPickerScroller` (instead of IndexedSnapScroller directly).
  - Added period-to-index mapping via reference anchor:
    - `referenceDate?: Date`
    - `getIndexByDate?(year, month)`
    - `getDateByIndex?(index)`
  - Period changes are emitted during scroll via `onScrollSnapChanging`.

  ### YearPicker

  - **BREAKING:** YearPicker scrolling is now driven by `DataGridPickerScroller`.
  - Added year-to-index mapping via reference anchor:
    - `referenceYear?: number`
    - `getIndexByYear?(year, referenceYear)`
  - Layout derives offset from `year` when `offset` is not provided.

  ### Calendar / CalendarBase

  - **BREAKING:** `onYearChange` -> `onChangeYear`
  - **BREAKING:** `onMonthChange` -> `onChangeMonth`
  - Added controlled/uncontrolled view state for navigation:
    - `year` / `defaultYear`
    - `month` / `defaultMonth`
    - `activeDay` / `defaultActiveDay` + `onChangeActiveDay`
    - `activeMonth` / `defaultActiveMonth` + `onChangeActiveMonth`
    - `activeYear` / `defaultActiveYear` + `onChangeActiveYear`
  - Added `referenceDate?: Date` as an anchor for indexed/virtualized navigation.
  - Added year-group navigation controls:
    - `CalendarNextYearGroupButton`
    - `CalendarPrevYearGroupButton`
  - Picker/ESC handling updated (Escape now stops propagation).
  - Period navigation split into:
    - `nextPeriod` / `prevPeriod`
    - `nextYearGroup` / `prevYearGroup`

  ## @vega-ui/hooks

  - **BREAKING:** removed `useStore`, `useControlledStore` (react-store dependency removed).
  - **BREAKING:** removed `useIntersectionObserver`.
  - Added:
    - `useScrollSnap` (snap measurement + `onSnapChanging/onSnapChange`)
    - `useMutationObserver`
    - `useBiMap`
  - `useRefMap` now exposes `removeItemRef`.
  - `useIndexes` updated to support new shifting semantics safely.

  ## @vega-ui/react-store

  - **BREAKING:** package removed / no longer used in the monorepo.

  ## @vega-ui/utils

  - Added `BiMap` and `nearest`.
  - Reorganized data helpers under `utils/data/*` with re-exports.

## 2.0.1

## 2.0.0

### Minor Changes

- 50bc30f: Refactor form controls architecture and remove deprecated components.

  ### Removed (breaking)

  - Remove `FlagIcon` package exports and implementation.
  - Remove `PhoneSelectField` and related subcomponents/contexts/styles.
  - Remove legacy `SelectArrow` and `SelectPlaceholder` components.
  - Remove legacy `NumberFieldIncrement`/`NumberFieldDecrement` components.
  - Remove legacy `PinFieldInput` component.

  ### Added

  - Add new `NumberField` building blocks:
    - `NumberFieldInput`
    - `NumberFieldIncrementButton`
    - `NumberFieldDecrementButton`
    - `NumberFieldContext` (new contexts structure)
    - `NumberField` types module
  - Add new `PasswordField` building blocks:
    - `PasswordFieldInput`, `PasswordFieldToggleIconButton`
    - `PasswordFieldShownIcon`, `PasswordFieldHiddenIcon`
    - `PasswordFieldContext` and component index exports
  - Add new `PhoneField` composition:
    - `PhoneFieldInput`
    - `PhoneFieldSelect` + subcomponents (`Combobox`, `HiddenSelect`, `Icon`, `Listbox`, `Option`, `Portal`, `Value`)
    - `PhoneFieldContext` and component index exports
  - Add `PinFieldHiddenInput` component (single visually hidden input backing the slots).
  - Add new `Select` building blocks:
    - `SelectHiddenSelect`, `SelectIcon`, `SelectPortal`, `SelectValue` helpers
    - `SelectOptionsContext`
  - Add new `TextFieldInput` component and `TextFieldContext`.

  ### Changed

  - Update `PinField` internals, contexts, slots, separator, styles and tests.
  - Update `Select`, `NumberField`, `PasswordField`, `PhoneField`, `TextField` internals, styles, stories and tests.
  - Update `Option` component and related types/styles.
  - Update `Drawer` internals and context, plus stories.
  - Update library root exports (`packages/ui/src/index.ts`).

  ### Tests

  - Update existing tests for refactored components.
  - Add/adjust stories for new subcomponents.

- eab55a8: The responsive-ui package is no longer supported due to inconsistencies in the overall component design approach

  The components that the responsive ui package contained are easily implemented using the composition of existing ones and do not require the support and development of a separate package

## 1.14.3

### Patch Changes

- 7711364: Renamed BaseCalendar to CalendarBase

## 1.14.2

### Patch Changes

- 55809c0: Changed deps

## 1.14.1

### Patch Changes

- 9bb4a3b: Refactored contexts, they are unified in style
- d76eea5: Deleted unused dependencies

## 1.14.0

### Minor Changes

- a387fda: Added new calendar primitives:

  - **CalendarBase** — foundational layout and styling provider for all calendar components (size, variant, compact mode).
  - **Calendar** — high-level fully interactive calendar with day/month/year pickers, scroll-based navigation, controlled/uncontrolled selection modes, and full provider-based state management.

  These components form the new core of the calendar system and enable building flexible, Radix-style declarative/imperative calendar interfaces.

## 1.13.0

### Minor Changes

- abbdcdc: Add composable calendar picker primitives and index-based snap scroller utilities.

  **New pickers**

  - **`YearPicker`**

    - High-level year selection component built on top of `DataGridPicker<number>`.
    - Supports `single`, `multiple`, and `range` selection modes with `from` / `to` bounds.
    - Provides a default `YearPickerLayout` (configurable `rows`, `cols`, `start`, `offset`).
    - Adds composable primitives:
      - `YearPickerItem`, `YearPickerRow`, `YearPickerRowGroup`
      - `YearPickerScroller`, `YearPickerScrollerContent`, `YearPickerScrollerLayout`
    - Includes helpers like `createYearPickerGrid` for generating year grids.

  - **`MonthPicker`**

    - Wrapper over `DataGridPicker<number>` specialized for month selection.
    - Default active value resolves to the current month.
    - Provides:
      - `MonthPickerLayout` with configurable `rows`, `cols`, `start`, `locale`, `format`
      - `MonthPickerItem`, `MonthPickerRow`, `MonthPickerRowGroup`
      - `MonthPickerScroller`, `MonthPickerScrollerContent`, `MonthPickerScrollerLayout`
    - Adds `createMonthPickerGrid` for building month matrices (e.g. 3×4 year views).

  - **`DayPicker`**
    - Day-level calendar picker built on `DataGridPicker<number>` with default active set to “today” (timestamp).
    - Supports `single` / `multiple` / `range` selection and can respect min/max via `DataGridPicker`.
    - Provides:
      - `DayPickerLayout` with `year`, `month`, `offset`, `includeOverflowDays`, `weekStartsOn`, `rows`, `cols`, `locale`, `format`
      - `DayPickerItem`, `DayPickerRow`, `DayPickerRowGroup`
      - `DayPickerScroller`, `DayPickerScrollerContent`, `DayPickerScrollerLayout`
    - Adds `createDayPickerGrid` to generate month views with optional overflow days and arbitrary week starts.

  **New scroller utilities**

  - **`IndexedSnapScroller`**
    - Extends `SnapScroller` with virtual, index-based paging.
    - Maintains a sliding window of logical page indexes via `useIndexes({ start, startDir, size, shift })`.
    - Automatically shifts the window when scroll reaches edges (`onOffset(-1|1)`).
    - Exposes:
      - `IndexedSnapScroller` component
      - `IndexedSnapScrollerContent` (injects `index` via context)
      - `IndexedSnapScrollerProvider` / `useIndexesSnapScrollerContext` for consuming the current index in custom layouts.

  **Formatting helpers**

  - Add small date-format helpers, suitable for use inside picker layouts:
    - `formatDay(day, month, year, locale?, format?)`
    - `formatMonth(month, locale?, format?)`
    - `formatYear(year, locale?, format?)`

  These additions provide a fully composable calendar system (years, months, days) on top of `DataGridPicker` and `SnapScroller`, while keeping layout and rendering customizable through small, focused primitives.

## 1.12.4

## 1.12.3

## 1.12.2

## 1.12.1

## 1.12.0

### Minor Changes

- 30e9724: This release introduces a complete grid, selection, and scroll system for structured, interactive UIs.
  It combines efficient keyboard navigation, flexible selection logic, and smooth snap scrolling —
  forming the foundation for advanced table, calendar, and picker interfaces.

  📊 `DataGrid`

  `DataGrid` is a focusable, navigable grid that manages keyboard movement and active-cell focus.

  - Supports navigation with Arrow, Home/End, and PageUp/PageDown keys
  - Optional wrap navigation (horizontal, vertical, or both)
  - Configurable rowDelta for page jumps
  - Provides an imperative API (grid, keyMap) for advanced logic
  - Supports excluded or disabled cells that are skipped during traversal
  - Emits onMove events describing direction and axis of movement

  Used as the base for all higher-level grid-based components.

  🧭 `DataGridSelectable`

  `DataGridSelectable` extends DataGrid with a full selection model.

  - Selection modes: "single", "multiple", "range"
  - Keyboard (Shift + Arrows) and pointer-based range selection
  - Optional disabled and bounded ranges (from / to)
  - Fully integrated with the useSelection hook
  - Provides consistent accessibility and state behavior

  Ideal for building interactive tables, lists, and date selectors.

  🎯 `DataGridPicker`

  DataGridPicker builds on DataGridSelectable to enable picking and highlighting items within a grid.

  - Automatically computes rectangular ranges between selected cells
  - Supports highlighting of continuous intervals (start → end)
  - Can be customized with a user-defined resolveRange function
  - Commonly used for date pickers, emoji selectors, or option matrices

  🧱 `SnapScroller`

  `SnapScroller` provides smooth, scroll-snap navigation with full control and callbacks.

  - Optimized for CSS scroll-snap-align behavior
  - Exposes imperative API: next(), prev(), element

  Triggers:

  - onSnap(index) — when snapped item changes
  - onOffset(direction) — when scroll reaches start or end

  Optional preserveScroll restores snapped position after content updates

  Perfect for carousels, paginated lists, or horizontally scrolling pickers.

  🪝 `useSelection` Hook

  `useSelection` is a composable hook for declarative selection management.

  - Supports "single", "multiple", and "range" modes
  - Provides helpers: toggle, expand, isSelected, edges, and more
  - Accepts custom equals, compare, and resolveRange logic

  Used internally by DataGridSelectable and DataGridPicker

  ⚙️ `Grid & Matrix Utilities`

  These low-level utilities power the core grid logic and ensure efficient traversal.

  `grid`

  A high-level controller for navigating 2D layouts:

  - Provides directional movement (before, after, above, below)
  - Handles row and column wrapping
  - Uses Matrix internally for structure and lookup

  `matrix`

  A modular 2D data engine with the following components:

  `Matrix` — manages all rows and cells
  `MatrixRow` — ordered row container with iterable access
  `MatrixNode` — represents a single cell ([row, col], key, payload)
  `MatrixIndexes` — maintains sorted indices with binary search

  Together, they ensure fast lookups and navigation across sparse grids.

  This release establishes the foundation for interactive, accessible, and performant grid-based interfaces in Vega UI —
  enabling developers to build pickers, calendars, tables, and carousels with minimal boilerplate and maximum control.

## 1.11.4

## 1.11.3

## 1.11.2

## 1.11.1

## 1.11.0

## 1.10.1

## 1.10.0

## 1.9.0

## 1.8.1

### Patch Changes

- c98c982: Added Size prop to PageControl, added hook useRefMap, improved accessability, added mergeEventHandlers util

## 1.8.0

## 1.7.4

## 1.7.3

## 1.7.2

## 1.7.1

## 1.7.0

## 1.6.0

## 1.5.0

## 1.4.2

## 1.4.1

## 1.4.0

### Minor Changes

- e022b3c: Added new utilities

## 1.3.0

## 1.2.2

## 1.2.1

## 1.2.0

### Minor Changes

- 6224045: Added new component - RangeSlider, Slider and SliderBase

## 1.1.1

## 1.1.0

## 1.0.1

### Patch Changes

- fb2ec42: Changed logo
