# @vega-ui/react

## 3.0.0

### Major Changes

- 8adf390: `Button` and `IconButton` no longer default to `type="button"`. Like a native `<button>`, they submit the surrounding form unless `type="button"` is set, and with `asChild` they no longer pass `type` to the child element. Internal buttons of `NumberField`, `PasswordField`, `Pagination`, `Calendar`, date fields and the dialog and drawer close buttons keep `type="button"`
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

- af37ac1: BREAKING: the `useCheckboxCardContext` field `onChangedChecked` is renamed to `onChangeChecked`, matching the `CheckboxCard` prop and the rest of the library. Read `onChangeChecked` from the context instead.
- c71df25: BREAKING: checkbox-like inputs follow the native element.

  - `CheckboxHiddenInput`, `SwitchHiddenInput`, `CheckboxCardControlHiddenInput` and `SegmentedControlItemHiddenInput` are renamed to `CheckboxInput`, `SwitchInput`, `CheckboxCardControlInput` and `SegmentedControlItemInput`, together with their prop types. They are the actual interactive inputs, not hidden mirrors.
  - `Checkbox` and `CheckboxCard` no longer accept `checked`, `defaultChecked`, `onChangeChecked`, `indeterminate` and `disabled` on the root. Set them on `CheckboxInput` / `CheckboxCardControlInput` like on a native checkbox, using `onChange` instead of `onChangeChecked`. `indeterminate` is a prop of the input.
  - `useCheckboxContext` and `useCheckboxCardContext` expose only `size` and `variant`.

- 6f10f80: The value of the masked fields moves to the root, like `Slider`: the input part only shows it, so a controlled field keeps every keystroke and follows a value changed outside.

  - **Breaking:** `NumberField` takes `value`, `defaultValue` and `onChangeValue` as a number, `NaN` for an empty field; `NumberFieldInput` no longer takes `value` and `defaultValue`
  - **Breaking:** `PhoneField` takes `value`, `defaultValue` and `onChangeValue` as the text of the number; `PhoneFieldInput` no longer takes `value` and `defaultValue`. The country of `defaultValue` is selected unless `code` is set
  - **Breaking:** `DateField` takes `value`, `defaultValue` and `onChangeValue` as a `YYYY-MM-DD` day, `DateTimeField` as a `YYYY-MM-DDTHH:mm[:ss]` timestamp, `DateRangeField` as a `[start, end]` tuple of days; `''` while the text is empty or incomplete. Their input parts no longer take `value` and `defaultValue`
  - the input parts still fire their own `onChange` and `onInput` on every edit of the text, and `name` still submits the text
  - a form reset restores `defaultValue` unless the field is controlled
  - the increment and decrement buttons of `NumberField` follow changes of `min` and `max`
  - **Breaking for custom parts:** the contexts of these fields expose the shown `text` and `changeText` instead of `setText`, `detectCode` and `changeDate` / `changeTime`

  `@vega-ui/utils`: new `formatTemplateRange(calendar, [start, end], template, separator)`, the counterpart of `parseTemplateRange`.

- 1990f69: Rename `getCommited` to `getCommitted` in the `useScrollSnap` result and the `SnapScroller` api ref
- ce0b569: BREAKING: `IconSize` no longer includes `null`. Omit `size` or pass `undefined` instead of `size={null}`.
- 399fd0d: BREAKING: `Dialog`, `Drawer`, and `Sheet` are built on the native `<dialog>` element opened with `showModal()`, and the overlays follow native behavior and iOS-like motion.

  - `DialogPortal`, `DialogBackdrop`, `DrawerPortal`, `DrawerBackdrop`, `SheetPortal`, and `SheetBackdrop` are removed. `DialogContent`, `DrawerContent`, and `SheetContent` render the `<dialog>` into `document.body`, and the backdrop is its `::backdrop`. Style it with `.your-class::backdrop`.
  - `DialogContent`, `DrawerContent`, and `SheetContent` take `<dialog>` attributes, and their `ref` points to the `HTMLDialogElement`. `onCancel` and `onClose` run after the internal handlers. `blurred` (default `true`) blurs the page behind, and `overlay` (default `true`) dims it; with `overlay={false}` the panel stays modal over a transparent backdrop.
  - `closedBy` on `DialogContent`, `DrawerContent`, and `SheetContent` sets which user actions close the panel, like the native `closedby` attribute: `any` (a backdrop click, a swipe, or `Escape`), `closerequest` (`Escape` only), or `none`. It replaces `dismissible` on `Drawer` and `Sheet` and `closable` and `clickEnabled` on `Sheet`. It defaults to `closerequest` on `DialogContent`, so a backdrop click no longer closes a dialog, and to `any` on `DrawerContent` and `SheetContent`.
  - `useDialogContext`, `useDrawerContext`, and `useSheetContext` no longer expose the floating-ui context and props. The unused `ref` prop is removed from `DrawerProps` and `SheetProps`.
  - The browser makes the page inert, handles focus, and restores it on close, and the page does not scroll behind the panel. On open the panel itself takes focus instead of its first control, and `autoFocus` on a child focuses that child. `DialogTrigger`, `DrawerTrigger`, and `SheetTrigger` set `aria-haspopup` and `aria-expanded`.
  - `DialogTitle`, `DialogHeader`, `DialogCloseButton`, `DrawerTitle`, `DrawerHeader`, `DrawerCloseButton`, `SheetHeader`, and `SheetMain` are removed: compose the panel from your own markup. Name it with `aria-labelledby` pointing to your heading, or with `aria-label`; a panel without a name is not accessible. New `DialogClose`, `DrawerClose`, and `SheetClose` turn your own button into a close button (`asChild`) with no styles of its own: they replace `DialogCloseButton` and `DrawerCloseButton`. Buttons in a `<form method="dialog">` close the panel too. `useDialogContext` and `useDrawerContext` no longer return `contentId` and `titleId`, and `useSheetContext` no longer returns `contentId`.
  - Submitting a `<form method="dialog">` inside the panel closes it through `onChangeOpen(false)`, so the close transition plays and a controlled parent can keep it open; the submit button's `value` becomes the dialog's `returnValue`, as natively. It closes the panel also when `closedBy` is `none`.
  - `Backdrop` and `PopoverBackdrop` are removed. Use `Dialog` or `Sheet` for a popover that dims the page.
  - Panels open with a spring and close faster with an ease-out; with reduced motion they only fade.

  `Drawer`:

  - `position` uses logical sides that follow the writing direction: `left` and `right` are now `start` and `end` (`left-start` is `start-start`, `right-end` is `end-end`, and so on), and the default is `end`. In right-to-left text `end` is the left side.
  - A touch swipe toward its edge drags the drawer and closes it past half its size or on a flick, when `closedBy` is `any`. Mouse drags are left for text selection.

  `Sheet`:

  - Snap points act like native sheet detents. A drag follows the finger, resists past the top and bottom with rubber banding, and settles at the snap point where its momentum would carry it, so a flick can skip a snap point; `steppedSnapPoints` moves one snap point at most. A drag down past the lowest snap point closes the sheet when `closedBy` is `any`.
  - `edgeThreshold`, `siblingThreshold`, and `swipeTimestamp` are removed.
  - The sheet fits its content unless `SheetContent` has a CSS height, and is never taller than the viewport. A number snap point is a fraction of the viewport height instead of the sheet height, and a snap point above the sheet's height rests at its top.
  - The sheet opens at the lowest snap point unless `defaultSnapPoint` says otherwise, and an uncontrolled sheet reopens there. `onChangeActiveSnapPoint` only fires when the user moves the sheet to another snap point.
  - On touch devices, dragging by scrollable content moves the sheet below its top snap point; at the top it scrolls the content, and pulls the sheet down once the content is scrolled to the top.
  - The backdrop fades as the sheet is dragged down, the sheet rises above the on-screen keyboard, and its padding respects the bottom safe area.
  - `SheetHandle` is a button that moves the sheet to the next snap point, and back to the lowest from the top, when the sheet has several snap points; otherwise it is disabled and hidden from assistive technology, and it is always a `<button>`. It has no built-in name: pass `aria-label`, for example `Resize sheet`. Like the iOS grabber, it is a 36×5px bar at the top of the sheet that takes no room, and the sheet keeps its content closer to the top.
  - Like an iOS sheet, the sheet floats as a card with rounded corners, `--sheet-inset` (default `var(--spacing-8)`) clear of the sides and the bottom, while it rests below the top of the viewport, also at a lower snap point, and widens to the edges as it rises to the top; `--sheet-inset: 0` keeps it full width. `SheetContent` exposes `--sheet-expansion`, from `0` at its lowest position to `1` when it reaches the top of the viewport, for styles that change as the sheet rises.
  - `SheetContent` has the side and bottom padding that `SheetHeader` and `SheetMain` had. A scrollable region inside it is any element with `overflow: auto`.
  - `react-remove-scroll` is no longer a dependency.

  `Popover`:

  - `PopoverContent` is a native `popover="auto"` element that is always rendered, hidden while closed; its children render only while it is open. The browser opens it from `PopoverTrigger` through `popovertarget`, closes it on an outside click or `Escape`, stacks nested popovers, and returns focus to the trigger. The trigger must be a button.
  - Opening no longer moves focus into the content; `Tab` from the trigger enters it. `usePopoverContext` no longer exposes the floating-ui context and props.
  - The content grows out of the side facing its trigger.
  - `PopoverTrigger` no longer sets `aria-expanded` and `aria-controls`: the browser exposes the expanded state from `popovertarget`.

  `Tooltip`:

  - It shows on hover with a mouse or pen and on keyboard focus, never on a tap, and hides when the trigger is pressed. Right after one tooltip closes, the next shows without a delay.
  - It describes its trigger through `aria-describedby`, grows out of its arrow, and lets the pointer through to the page. `useTooltipContext` no longer exposes the floating-ui props.

  `Select` and `Tooltip` render their floating content in the top layer with `popover="manual"` when the browser supports it, so a modal dialog or an `overflow` container no longer clips or covers them. `SelectPortal` and `PhoneFieldSelectPortal` are removed: render `SelectListbox` directly inside `Select`. `SelectListbox` stays at least as wide as the combobox, also when the combobox resizes while the list is open, and only fades with reduced motion.

  `IconButton` no longer keeps the browser's default button padding, so an icon in a small button, such as a 24px close button, is no longer squeezed.

- d0069e2: `Slider` is rebuilt on native `<input type="range">` and takes one or several thumbs:

  ```tsx
  <Slider value={price} onChangeValue={setPrice} name="price">
    <SliderTrack>
      <SliderRange />
    </SliderTrack>
    <SliderThumb index={0}>
      <SliderThumbInput aria-label="Minimum price" />
      <SliderThumbIndicator />
    </SliderThumb>
    <SliderThumb index={1}>
      <SliderThumbInput aria-label="Maximum price" />
      <SliderThumbIndicator />
    </SliderThumb>
  </Slider>
  ```

  Breaking:

  - `RangeSlider` and `SliderBase` with all their parts are removed; a `Slider` with two `SliderThumb`s replaces `RangeSlider`
  - `value`, `defaultValue` and `onChangeValue` take a number for one thumb or an array with one entry per thumb by its `index`; `onChangeValue` gets the same shape
  - `SliderProgress` and `SliderHiddenInput` are removed; use `SliderTrack` with `SliderRange` inside, and `name` on `Slider` or `SliderThumbInput`
  - `useSliderContext` gives `values`, an array for every thumb, instead of `value`, and adds `gap`, `name` and `changeThumb(index, value)`; `useRangeSliderContext` and `useRangeSliderThumbContext` are removed, use `useSliderContext` and the new `useSliderThumbContext` with `index`, `low` and `high`
  - `SliderThumb` holds two parts: `SliderThumbInput`, the native range input that takes the input props and `ref`, and `SliderThumbIndicator`, the visual handle with any content

  New:

  - pointer, keyboard, focus and form submission come from the native input; `PageUp`/`PageDown` move by a tenth of the whole range, and `ArrowRight`/`ArrowLeft` increase and decrease a vertical slider in every browser
  - a form reset restores `defaultValue`, unless the reset is canceled
  - values off the step grid or outside `min`/`max` are snapped like the native input does, and values out of order are sorted, so the thumbs, the native inputs and the submitted values always agree
  - several thumbs on one track: each input gets its neighbours as native `min`/`max`, so thumbs cannot pass each other and `aria-valuemin`/`aria-valuemax` show the real limits; `minStepsBetweenThumbs` keeps a gap
  - the inputs of neighbouring thumbs are cut with `clip-path` at the midpoint between their values, so a click on the track moves the nearest thumb and stacked thumbs split at their centre; the slider looks disabled when none of its thumbs is enabled
  - a vertical slider sets `touch-action: pan-x pinch-zoom`, so a vertical swipe on it moves the thumb instead of scrolling the page
  - `variant`, `name` and `minStepsBetweenThumbs` on `Slider`; `index` on `SliderThumb`; `SliderThumbInput` and `SliderThumbIndicator`
  - the thumb position takes `min` into account (before it was `value / max`)
  - `SliderVariant` and `SliderOrientation` types

- 90e3572: State callbacks follow one `onChangeX` scheme, like `onChangeValue` and `Drawer`'s `onChangeOpen`.

  Breaking:

  - `Dialog`, `Popover`, `Select`, `Sheet`, `Tooltip`: `onOpenChange` is renamed to `onChangeOpen`
  - `Select`, `PhoneFieldSelect`: `onSelectValue` is renamed to `onChangeValue`

- 6f10f80: `PinField` input reworked:

  - **Breaking:** `PinFieldHiddenInput` is renamed to `PinFieldInput`, like `PasswordFieldInput` and `TextFieldInput`
  - **Breaking:** `PinFieldInput` no longer takes `disabled` and `maxLength`; set them on `PinField`, so the input and the slots always agree
  - **Breaking:** `PinField` takes `value`, `defaultValue` and `onChangeValue`; `PinFieldInput` no longer takes `value` and `defaultValue` and still fires its own `onChange` and `onInput`. The slots follow a controlled `value` changed outside, and a form reset restores `defaultValue` unless the field is controlled
  - `maxLength` of `PinField` is optional and defaults to `4`
  - the `placeholder` of `PinField` is also set on the input
  - Home and End move to the start and the end; Shift with an arrow key extends the selection natively
  - the `PinField` context is named `PinFieldContext` in errors

- 46cd85f: BREAKING: `Sheet` `activeSnapPoint` and the `onChangeActiveSnapPoint` value are now indexes into `snapPoints` in the order you pass them, like `defaultSnapPoint`. They used to point into the snap points sorted by position. `onChangeActiveSnapPoint` no longer fires on mount when `defaultSnapPoint` is set, and the sheet opens at `defaultSnapPoint` on the first frame.

  With `steppedSnapPoints`, an edge swipe down no longer closes a `Sheet` with `closable={false}`, and a closing swipe no longer also moves to the next snap point.

- f827279: `TimeField` keeps its value on the root like the other masked fields:

  - **Breaking:** `TimeField` takes `value`, `defaultValue` and `onChangeValue` as a `HH:mm` time (`HH:mm:ss` when the format has seconds), `''` while the text is empty or incomplete; `TimeFieldInput` no longer takes `value` and `defaultValue`. A form reset restores `defaultValue` unless the field is controlled
  - **Breaking:** `format` uses the notation of `DateTimeField.timeFormat`: `'HH:mm' | 'HH:mm:ss'` instead of `'HH:MM' | 'HH:MM:SS'`
  - **Breaking:** `min` and `max` bound the whole time like a native `<input type="time">`: a complete time outside them is replaced by the nearest bound, instead of bounding each segment separately; invalid bounds are ignored
  - ArrowUp / ArrowDown step the hours by one and the minutes or seconds under the caret by `step`, like `DateTimeField`; digits of other numbering systems are accepted

  `@vega-ui/utils`: new `parseTemplateTime`, `formatTemplateTime` and `normalizeTemplateTime` for times typed by a `HH:MM[:SS]` template, and `isISOTime`, a check for `HH:mm[:ss]` strings

### Minor Changes

- 7d971b9: Controlled state for `Tooltip` and `PasswordField`:

  - `Tooltip` takes `open`, `defaultOpen` and `onChangeOpen`, like `Popover`
  - `PasswordField` takes `shown`, `defaultShown` and `onChangeShown` for the password visibility
  - `PasswordFieldToggleIconButton` exposes the visibility with `aria-pressed` and keeps the focus like a native button instead of moving it to the input, so mobile keyboards do not open on every toggle; give it a fixed label such as "Show password"
  - a custom `onClick` on `PasswordFieldToggleIconButton` no longer replaces the toggle
  - the `PasswordField` context is named `PasswordFieldContext` in errors, not `PhoneFieldContext`

- ecceb29: `SegmentedControl`: selection is owned by the native radio group; the indicator follows the checked segment through CSS anchor positioning

  The component no longer mirrors the value in React state and no longer measures segments in a layout effect or `ResizeObserver`. In uncontrolled mode the hidden radios own the selection, and the active segment and the indicator follow `:checked` in CSS. In controlled mode React keeps `checked` on the radios, so a change the parent does not accept is rolled back.

  - native form reset restores `defaultValue`, and the indicator follows it
  - programmatic selection (`input.checked = true`, `form.reset()`) moves the indicator without any events
  - the indicator follows layout changes (resize, font loading, label changes) without JS
  - several controls on one page keep independent indicators
  - without anchor positioning support the checked segment paints its own background instead of the sliding indicator
  - Firefox moves the indicator without the slide animation

  Breaking:

  - removed `data-active` from `SegmentedControlItem`; target the checked segment with `:has(input[type='radio']:checked)`
  - removed the `--segmented-control-indicator-offset` and `--segmented-control-indicator-size` CSS variables

- 79413ab: Export `Slot` and `ButtonBase` with their types from the package root, matching the `@vega-ui/react/Slot` and `@vega-ui/react/ButtonBase` subpaths
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

### Patch Changes

- 471516f: Accordion no longer adds an already opened value to `opened` again, so `onChangeOpened` never receives duplicates.
- dc610af: `AccordionTrigger` passes its other props, such as `onClick`, `id`, `aria-*` and `asChild`, to the trigger button instead of dropping them
- 03a8337: Alert `fill` appearance uses the same translucent tinted background and text color as Badge `ghost`.
- b8ee302: `Alert` keeps its content at the start of the row when it has no `AlertMain` instead of pushing it to the end
- 5feb6c9: fixed merging events & snapping to step
- afa700c: `ButtonBase` (and `Button`, `IconButton` and other buttons built on it) no longer sets the native `disabled` attribute on the child element with `asChild`. The child owns its disabled state: a disabled link is an `<a>` without `href`, with `aria-disabled="true"` for the disabled styling and announcement.
- ffd63aa: `DialogTrigger`, `DrawerTrigger`, `SheetTrigger`, `PopoverTrigger`, `TooltipTrigger` and `Option` render `type="button"`, so clicking them inside a form no longer submits it. A `type` prop still overrides it, and `asChild` leaves the child element untouched
- 184b98f: `Card` types its `ref` as `Ref<HTMLElement>` to match the rendered `<article>` (or the `asChild` element) and its `HTMLAttributes<HTMLElement>` props.
- 2b5af5f: DataGrid isolates its stacking context, so the DataGridPicker range highlight is no longer hidden behind the background of a wrapping element.
- bf2b34c: `DialogContent` fades in and out together with its scale transition instead of appearing and disappearing at full opacity
- 171e217: `DrawerContent` now lets its own props win over the drawer's internal floating props, like `DialogContent` and `SheetContent`. A `role` passed to `DrawerContent` is no longer replaced by `dialog`, and internal event handlers run before yours.
- 480483c: `DrawerTrigger` registers itself as the reference element instead of the floating one, so focus returns to the trigger when the drawer closes
- 5603707: Changed badge colors to WCAG
- 5170410: `Checkbox`, `Switch` and `SegmentedControlItem` props extend `LabelHTMLAttributes<HTMLLabelElement>`, so label attributes such as `htmlFor` and `form` are typed.
- 03bf865: Size, variant and appearance types (`ButtonSize`, `TextFieldSize`, `BadgeVariant`, `HeadingSize` and the rest) suggest their known values in the editor again. They were unions with `string` or `number`, which TypeScript collapses into a plain `string` or `number`; they now end with `(string & {})` or `(number & {})`, so any other value is still accepted.
- 02aec39: `MeterTrack` fills relative to `min` and `max` like the native `<meter>`, and the fill is clamped to the range. Previously `min` was ignored and values outside the range overflowed. The `max` JSDoc now states the actual default of `1`.
- 0d7649f: `NumberField` follows `<input type="number">`:

  - stepping keeps the decimals of the value and of `step`: `0.7` + `0.1` gives `0.8` (before, the mask cut `0.7999999999999999` to `0.79`)
  - the wheel steps the value only when the input is focused and under the pointer; over an unfocused field it no longer blocks the page scroll
  - a root `onKeyDown` runs after the built-in arrow keys instead of replacing them

  `@vega-ui/utils`:

  - new `addWithPrecision(value, delta)`, a sum rounded to the decimals of its operands
  - new `countDecimals(value)`, the decimals of a number, also in exponent notation (`1.5e-7` → 8)
  - `snapToStep` keeps the precision of steps written in exponent notation (`step={1e-7}` no longer rounds to integers)

- c4672d5: Backdrop, PopoverContent and SelectListbox use the `--z-index-overlay` / `--z-index-popover` tokens instead of a hardcoded `z-index: 1`, so popovers and listboxes open above dialogs, drawers and sheets. The backdrop fade now uses `--transition-state-delay`, matching the overlay unmount timing so the fade-out is no longer cut off.
- 6f1f6f2: PageControlProgress cancels its progress animation frame when the item stops being active or unmounts, so stale loops no longer overwrite its progress value.
- d8ce64e: PaginationEllipsis renders the ellipsis character `…` (U+2026) instead of three dots.
- 7106cb0: `PaginationProps` extends `HTMLAttributes<HTMLUListElement>` to match the rendered `<ul>` and its `ref`.
- 7ce2cf5: `Popover` passes the HTML attributes allowed by its props, such as `id`, `style` and `data-*`, to its root element instead of dropping them
- a89803a: Enable `react-hooks` lint rules repo-wide; fix all stale-closure findings; add `useEventCallback`

  `eslint-plugin-react-hooks` was installed but none of its rules were enabled — the class of bugs behind the recent Slider and Calendar stale closures was invisible to CI. `rules-of-hooks` and `exhaustive-deps` now run as errors (with `rules-of-hooks` off for Storybook CSF `render` functions, which are false positives).

  - new `@vega-ui/hooks` export: `useEventCallback` — a stable-identity wrapper that always calls the latest handler (the industry "latest ref" pattern à la MUI/Radix/Floating UI), throws in development if called during render
  - `useScrollSnap`: `onSnapChanging`/`onSnapChange`/`getSnapPoint` go through `useEventCallback`, so inline consumer callbacks no longer resubscribe the `scrollend` listener and observers on every render; the remaining deps are honest
  - `Calendar`: `onSelectDay` no longer freezes the first `onChange` — it reads the latest callback through `useEventCallback` while keeping a stable identity (regression-tested by swapping `onChange` between renders)
  - `NumberField`: `decrement` no longer clamps against a stale `max`; the native non-passive `wheel` listener is attached only while `changeOnWheel` is enabled and no longer resubscribes when `min`/`max`/`step` or the value change
  - `useSelection`: a consumer-provided `resolveRange` no longer cascades identity changes into `select`/`expand`/`toggle`
  - `Collapsible`: `onChangeHidden` fires only when `hidden` actually changes — an inline callback no longer re-triggers the notification effect on every parent render
  - all remaining findings were stable-value dependencies added for free, plus three documented intentional suppressions (`useMutationObserver` per-field options deps, `createContext` shallow-by-value memoization, `SnapScrollerContent` unmount-only unregistration)

- 2d877ef: Respect `prefers-reduced-motion` in SnapScroller, Calendar, SegmentedControl, PageControl and Collapsible: scrolling jumps, sliding and resizing are instant, and PageControlProgress fades in over its duration, so `animationend` still fires.

  `useScrollSnap` no longer forces smooth scrolling: `scrollToElement` and `scrollToElementByKey` default to `behavior: 'auto'`, like native `scrollTo`, so the CSS `scroll-behavior` of the scroller decides. To keep smooth scrolling, set `scroll-behavior: smooth` on the scroller or pass `'smooth'`.

- df7c7be: `Select` without `defaultValue` starts with no selection instead of `''`, so an option with `value=''` is no longer selected by default and a numeric `Select` no longer holds a string. `defaultValue=''` still shows the placeholder.
- 3b2445b: Fix Select typeahead skipping options with falsy values

  `onMatch` (typeahead selection while the listbox is closed) guarded the matched value with `if (!value) return`, so options whose value is `0` or an empty string could be highlighted but never actually selected — common with numeric IDs. The guard now checks for `undefined` (a missing map entry) only. Covered with a regression test that selects a `value={0}` option by typing.

- 70c9eb0: Fix a Select listbox inside a Dialog that could open off-screen because its position was measured before it entered the top layer.
- cd1589b: Remove the stray JSDoc block above `dismissible` of `Sheet` and document its `true` default
- 83b8a95: Size types match the styles:

  - `OptionSize` includes `xs` and `xl`, which `Option` already styles and `Select` passes down
  - `PageControlSize`, `TextSize` and `CalendarBaseVariant` suggest their values and accept a custom one, like the other components
  - the glossary documents the size scales: named sizes for controls and containers, numeric font steps for `Heading`, `Text` and `Spinner`

- b5afed6: Changed badge ghost colors
- 065975a: `Slider` no longer calls `Array.prototype.at`, so it works in browsers without it (Safari before 15.4)
- 7609961: `SnapScroller` creates its `apiRef` once instead of on every render, so a callback `apiRef` is no longer detached and attached again on each render.
- d7a7658: Table, Calendar, CalendarBase, DayPicker, YearPicker, AvatarStack and Switch use `--spacing-*` tokens instead of hardcoded pixel spacing, so they follow a customized `--spacing` scale. No visual change with the default tokens.
- 16303cb: `Spinner` has `role="progressbar"` without a value, like a native `<progress>` without `value`, so screen readers announce it as a busy indicator. Name it with `aria-label` or `aria-labelledby`; set `aria-hidden` when it only decorates something that already announces the loading state.
- 3e998c5: `--text-color-inverce` is renamed to `--text-color-inverse`.

  Breaking: themes that set `--text-color-inverce` must set `--text-color-inverse` instead.

- 93dce53: `TooltipContent` stays mounted until its close transition ends instead of disappearing at once
- d8b4396: `Tooltip` passes the floating styles to its content without copying them on every render
- 6f10f80: - **Breaking:** `setValue` and `dispatchEvents` are replaced by `writeInputValue(input, value)` from `@vega-ui/utils`: it sets the value through the native setter, so React sees the change, and dispatches bubbling `input` and `change` events
  - the context of `NumberField` is named `NumberFieldContext` in errors instead of `PhoneFieldContext`
  - `getPending()` and `getCommitted()` of the `SnapScroller` api ref and `index` of the `IndexedSnapScroller` api ref are typed `number | null`: they are `null` until the scroller has measured its items
- Updated dependencies [875e52a]
- Updated dependencies [5feb6c9]
- Updated dependencies [1af9fda]
- Updated dependencies [6f10f80]
- Updated dependencies [7c5e42b]
- Updated dependencies [ed90a1c]
- Updated dependencies [1990f69]
- Updated dependencies [80acd5a]
- Updated dependencies [3580f9f]
- Updated dependencies [90c22d3]
- Updated dependencies [af29e8c]
- Updated dependencies [1de3d3c]
- Updated dependencies [0d7649f]
- Updated dependencies [a89803a]
- Updated dependencies [2d877ef]
- Updated dependencies [2e5cc1b]
- Updated dependencies [d0069e2]
- Updated dependencies [f827279]
- Updated dependencies [399fd0d]
- Updated dependencies [d0069e2]
- Updated dependencies [6f10f80]
- Updated dependencies [399fd0d]
- Updated dependencies [4b52391]
- Updated dependencies [6f10f80]
  - @vega-ui/utils@3.0.0
  - @vega-ui/i18n@3.0.0
  - @vega-ui/hooks@3.0.0
  - @vega-ui/react-context@3.0.0
  - @vega-ui/icons@3.0.0

## 2.5.0

### Patch Changes

- 9834a4c: Remove React from `dependencies`, keep it only in `peerDependencies`

  `react` (and `react-dom` in `@vega-ui/react`) were declared in both `dependencies` and `peerDependencies`. With strict resolution (Yarn PnP, pnpm with `shamefully-hoist=false`, strict npm) consumers ended up with two copies of React — `Invalid hook call`, contexts not matching, rendering breaking with no clear error.

  Changes:

  - removed `react`/`react-dom` from `dependencies` in `@vega-ui/react`, `@vega-ui/hooks` and `@vega-ui/icons`; they stay in `peerDependencies` and were added to `devDependencies` for local development
  - `vite.config.ts` of `@vega-ui/react` and `@vega-ui/hooks` derived rollup `external` from `Object.keys(dependencies)` only, so React would have been bundled into `dist` after this change — externals now include `peerDependencies` as well

- 0ffc52f: `useSelection`: optional `compare` no longer crashes; new `compare` util

  `compare?` was declared optional but invoked unconditionally in `edges`, `isSelected` and `isDisabled` — range selection or `min`/`max` clamping without a user-provided comparator threw `compare is not a function` (while `expand` had a guard, confirming the option was meant to be optional).

  - `@vega-ui/utils` now exports `compare` — a three-way comparator constrained to the new `Comparable` type (`number | string | bigint | Date`), so types with no universal ordering (objects, symbols) are rejected at compile time; covered with unit tests
  - `useSelection` falls back to it when no `compare` is passed, mirroring the existing `equals ?? Object.is` pattern; pass an explicit `compare` for non-primitive key types
  - `expand` no longer silently no-ops without a user comparator
  - empty or `undefined` `selected` no longer produces `undefined` range edges: `edges()` returns `[]`, `isSelected` returns `false` instead of comparing `undefined`
  - `DataGridSelectable` reuses the shared `compare` instead of its own inline duplicate of the same fallback (no behavior change)

- 25c721b: Fix stale closure in Slider's `changeValue`

  `changeValue` was wrapped in `useCallback` with empty deps, freezing `value` and `disabled` at their first-render values. Consequences: the slider could never return to its initial value (keyboard stepping got stuck one step away from it, clicking the initial track position was ignored); the same-value dedup guard compared against the initial value instead of the current one, so `onChangeValue` fired repeatedly with identical values during drags; toggling `disabled` after mount had no effect on interactions (an initially enabled slider stayed interactive when disabled, an initially disabled one stayed dead when enabled).

  The memoization served no purpose — `changeValue` is only used by handlers that are recreated on every render — so it is now a plain function reading fresh props. Covered with regression tests for all three symptoms.

- Updated dependencies [1007aae]
- Updated dependencies [55a8c44]
- Updated dependencies [9834a4c]
- Updated dependencies [5ebae4b]
- Updated dependencies [c652925]
- Updated dependencies [df6f7c1]
- Updated dependencies [d6954e8]
- Updated dependencies [77c7685]
- Updated dependencies [0ffc52f]
  - @vega-ui/react-context@2.5.0
  - @vega-ui/hooks@2.5.0
  - @vega-ui/utils@2.5.0
  - @vega-ui/icons@2.5.0

## 2.4.0

### Minor Changes

- a77ab19: Changed xs, sm, md, lg, xl sizes of all components

### Patch Changes

- 47f3ced: Fixed select listbox background
  - @vega-ui/hooks@2.4.0
  - @vega-ui/icons@2.4.0
  - @vega-ui/react-context@2.4.0
  - @vega-ui/utils@2.4.0

## 2.3.1

### Patch Changes

- 3858f99: Refactored color system and semantic tokens

  - Updated color palette in `@vega-ui/tokens-core`: revised oklch values across all color scales for better perceptual uniformity
  - Replaced static surface tokens (`surface-ultrathin` … `surface-ultrathick`) with `surface-primary` / `surface-secondary` in both light and dark themes
  - Tweaked fill token chroma/lightness values in light and dark themes for improved contrast
  - Button ghost/transparent hover and active backgrounds now use `oklch(from …)` relative color syntax instead of hardcoded palette steps, making them automatically adapt to any primary/secondary accent color
  - Added Playground story showcasing Badge, Button, Alert, Checkbox, Radio, Avatar, SegmentedControl and Slider in a single view
  - @vega-ui/hooks@2.3.1
  - @vega-ui/icons@2.3.1
  - @vega-ui/react-context@2.3.1
  - @vega-ui/utils@2.3.1

## 2.3.0

### Minor Changes

- 064d8c0: ### @vega-ui/tokens-core

  Complete overhaul of the color palette:

  - Colors migrated from `color-mix(in oklch, var(--color-red) X%, white/black)` to direct `oklch()` values for more predictable perceptual color space
  - Removed intermediate steps (50, 150, 250, 350, 450, 550, 650, 750, 850, 950) — scale simplified to 11 steps: 0–100–200–…–1000

  ### @vega-ui/theme-core

  Complete overhaul of semantic tokens in `light.css` / `dark.css`:

  - Added fill tokens: `--fills-primary/secondary/tertiary/quaternary` with hover/active states
  - Added label tokens: `--label-primary/secondary/tertiary/quaternary`
  - Added surface tokens: `--surface-ultrathin/thin/regular/thick/ultrathick`
  - Added separator tokens: `--separator-opaque/non-opaque`
  - Added border tokens: `--border-color` with hover/active states
  - Added disabled state tokens: `--disable-*`
  - Added color accent tokens: `--color-*-accent-*` — palette is automatically inverted in dark mode
  - Renamed: `--text-inverce-color` → `--text-color-inverce`

  ### @vega-ui/react

  - All components migrated to new semantic tokens from the theme
  - Removed direct color token references in components, replaced with semantic variables

### Patch Changes

- @vega-ui/hooks@2.3.0
- @vega-ui/icons@2.3.0
- @vega-ui/react-context@2.3.0
- @vega-ui/utils@2.3.0

## 2.2.1

### Patch Changes

- 66317ef: Changed switch colors
  - @vega-ui/hooks@2.2.1
  - @vega-ui/icons@2.2.1
  - @vega-ui/react-context@2.2.1
  - @vega-ui/utils@2.2.1

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

### Patch Changes

- bac86b3: Fixed date time field cahnge date
- Updated dependencies [798d27c]
  - @vega-ui/hooks@2.2.0
  - @vega-ui/utils@2.2.0
  - @vega-ui/icons@2.2.0
  - @vega-ui/react-context@2.2.0

## 2.1.1

### Patch Changes

- Updated dependencies [60ef267]
  - @vega-ui/hooks@2.1.1
  - @vega-ui/icons@2.1.1
  - @vega-ui/react-context@2.1.1
  - @vega-ui/utils@2.1.1

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

### Patch Changes

- Updated dependencies [8380d3b]
  - @vega-ui/hooks@2.1.0
  - @vega-ui/utils@2.1.0
  - @vega-ui/icons@2.1.0
  - @vega-ui/react-context@2.1.0

## 2.0.1

### Patch Changes

- 697ebd5: Improved a11y - accordion
  - @vega-ui/hooks@2.0.1
  - @vega-ui/icons@2.0.1
  - @vega-ui/react-context@2.0.1
  - @vega-ui/utils@2.0.1

## 2.0.0

### Major Changes

- 357ab44: - Add new `Tooltip` building blocks: - `TooltipArrow`

### Minor Changes

- 95b6ae7: - The `Drawer` component has been refactored to support a fully composable architecture.

  - Added the following subcomponents to allow flexible composition and advanced customization:
    - `DrawerTrigger`
    - `DrawerPortal`
    - `DrawerOverlay`
    - `DrawerContent`
    - `DrawerHeader`
    - `DrawerTitle`
    - `DrawerCloseButton`

  These additions enable fine-grained control over drawer structure, layout, focus management, and visual presentation, while preserving accessibility, focus trapping, and native interaction patterns

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

- ca0cb2b: The Accordion component has become more composable: the AccordionIcon and the AccordionHeader have been added.
- 35a056a: The Popover component has become more composable: the PopoverBackdrop have been added
- 21e1d64: Made Alert more composable: added the elements alertTitle, AlertIcon, AlertMain, AlertContent
- e58908c: Added Backdrop component
- 7ef3f1b: The Checkbox component has become more composable: the CheckboxHiddenInput, CheckboxIndicator, CheckboxCheckedIcon and the CheckboxIndeterminateIcon have been added.
- 9489f2e: The loading property in the button has been removed to better match the component to the overall architecture and approach
- 4072edd: The Meter component has become more composable: MeterTrack component has been renamed AvatarGroupStackItem
  The Progress component has become more composable: ProgressTrack component has been renamed AvatarGroupStackItem
  The PartialTrack component has been renamed (MeterStack), PartialMeterItem is now MeterStackSegment
- 0023797: The AvatarGroup component has become more composable: AvatarGroupPopover, AvatarGroupPopoverIcon, AvatarGroupPopoverTrigger, AvatarGroupPopoverContent, AvatarGroupCount, AvatarGroupStack components have been added, AvatarGroupItem component has been renamed AvatarGroupStackItem
- acaabbc: The AvatarGroup component is now AvatarStack, which more reflects its spirit; Moreover, the AvatarGroupPopover and related components, as well as AvatarGroupCount, have been removed due to the fact that they inflate the codebase and can be implemented with existing primitives
- 5c33866: The CheckboxCard component has become more composable: CheckboxCardContent, CheckboxCardTitle, CheckboxCardDescription, CheckboxCardControl, CheckboxCardControlHiddenInput, CheckboxCardControlIndicator, CheckboxCardControlCheckedIcon, CheckboxCardControlIndeterminateIcon components have been added
- d4d1a53: Unified TextArea sizes
- f9dacd3: The Modal component has been renamed Dialog due to the greater consistency with the naming of native web elements
- 6fae7e6: The Fieldset component has become more composable: the FieldsetHeader and FieldsetLegend components have been added
- bd99cb1: The Switch component has become more composable: SwitchIndicator and SwitchHiddenInput components have been added
- 82d11c9: - The `Sheet` component has been refactored to support a fully composable architecture
  - Added the following subcomponents to allow flexible composition and advanced customization:
    - `SheetPortal`
    - `SheetBackdrop`
- 7b2c7fe: Composable Slider
- d2a2c5a: - The `Dialog` component has been refactored to support a fully composable architecture.

  - Added the following subcomponents to allow flexible composition and advanced customization:
    - `DialogTrigger`
    - `DialogPortal`
    - `DialogOverlay`
    - `DialogContent`
    - `DialogHeader`
    - `DialogTitle`
    - `DialogCloseButton`

  These additions enable fine-grained control over drawer structure, layout, focus management, and visual presentation, while preserving accessibility, focus trapping, and native interaction patterns

- e0a38ab: The SegmentedControl component has become more composable: the SegmentedControlItemHiddenInput and SegmentedControlIndicator have been added.
- 31b2b94: Improved backdrop animations
- eab55a8: The responsive-ui package is no longer supported due to inconsistencies in the overall component design approach

  The components that the responsive ui package contained are easily implemented using the composition of existing ones and do not require the support and development of a separate package

- cfb207b: Unified all sizes

### Patch Changes

- afe89b4: Changed DrawerOverlay to Backdrop inside
- f121fa6: Removed unsued wrapper from CollapsibleContent
- 9fcad60: Fixed ts problems
- f5fae54: Changed PageControl handler. Removed onProgressEnd (replaced by onAnimatedEnd)
- Updated dependencies [50bc30f]
- Updated dependencies [9fcad60]
- Updated dependencies [e0a38ab]
- Updated dependencies [eab55a8]
  - @vega-ui/hooks@2.0.0
  - @vega-ui/utils@2.0.0
  - @vega-ui/react-context@2.0.0
  - @vega-ui/icons@2.0.0

## 1.14.3

### Patch Changes

- e5fcee3: Fixed active day into calendar
- 5fbc32c: Changed dirs
- 7711364: Renamed BaseCalendar to CalendarBase
- Updated dependencies [7711364]
  - @vega-ui/hooks@1.14.3
  - @vega-ui/utils@1.14.3
  - @vega-ui/icons@1.14.3
  - @vega-ui/react-context@1.14.3

## 1.14.2

### Patch Changes

- 55809c0: Changed deps
- Updated dependencies [55809c0]
  - @vega-ui/hooks@1.14.2
  - @vega-ui/icons@1.14.2
  - @vega-ui/react-context@1.14.2
  - @vega-ui/utils@1.14.2

## 1.14.1

### Patch Changes

- 9bb4a3b: Refactored contexts, they are unified in style
- 21bd47a: Changed types
- d595467: Flat helpers to one level
- d76eea5: Deleted unused dependencies
- Updated dependencies [9bb4a3b]
- Updated dependencies [d76eea5]
  - @vega-ui/react-context@1.14.1
  - @vega-ui/icons@1.14.1
  - @vega-ui/utils@1.14.1
  - @vega-ui/hooks@1.14.1

## 1.14.0

### Minor Changes

- a387fda: Added new calendar primitives:

  - **CalendarBase** — foundational layout and styling provider for all calendar components (size, variant, compact mode).
  - **Calendar** — high-level fully interactive calendar with day/month/year pickers, scroll-based navigation, controlled/uncontrolled selection modes, and full provider-based state management.

  These components form the new core of the calendar system and enable building flexible, Radix-style declarative/imperative calendar interfaces.

### Patch Changes

- Updated dependencies [a387fda]
  - @vega-ui/hooks@1.14.0
  - @vega-ui/utils@1.14.0
  - @vega-ui/icons@1.14.0

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

### Patch Changes

- Updated dependencies [abbdcdc]
  - @vega-ui/hooks@1.13.0
  - @vega-ui/utils@1.13.0
  - @vega-ui/icons@1.13.0

## 1.12.4

### Patch Changes

- Updated dependencies [a18e86e]
  - @vega-ui/icons@1.12.4
  - @vega-ui/hooks@1.12.4
  - @vega-ui/utils@1.12.4

## 1.12.3

### Patch Changes

- b433cff: Fixed RangeSlider performance
  - @vega-ui/hooks@1.12.3
  - @vega-ui/icons@1.12.3
  - @vega-ui/utils@1.12.3

## 1.12.2

### Patch Changes

- 919f735: Fixed SnapScrolle onSnap call
- 709d532: Changed requestIdleCallback to rAF due to unsupport into Safari
- e5ab56d: Fixed SnapScroller onScroll left
  - @vega-ui/hooks@1.12.2
  - @vega-ui/icons@1.12.2
  - @vega-ui/utils@1.12.2

## 1.12.1

### Patch Changes

- 22dea95: A bug was fixed in which it was impossible to expand the selected range on mobile devices and scroll in SnapScroller, as well as minor edits were made: when changing the range to the beginning and end, reset is not triggered.
- 3b2c885: Added selected and default selected as a prop for DataGridSelectable
- Updated dependencies [22dea95]
  - @vega-ui/hooks@1.12.1
  - @vega-ui/icons@1.12.1
  - @vega-ui/utils@1.12.1

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

### Patch Changes

- Updated dependencies [30e9724]
  - @vega-ui/hooks@1.12.0
  - @vega-ui/utils@1.12.0
  - @vega-ui/icons@1.12.0

## 1.11.4

### Patch Changes

- 8f89ab1: Fixed buttons docs
- 2740436: Fixed avatar icon size
- 9c8d951: Fixed pagination icon button size
- Updated dependencies [0124d94]
  - @vega-ui/icons@1.11.4
  - @vega-ui/hooks@1.11.4
  - @vega-ui/utils@1.11.4

## 1.11.3

### Patch Changes

- 0392555: Made graphite color more contrast than gray
  - @vega-ui/hooks@1.11.3
  - @vega-ui/icons@1.11.3
  - @vega-ui/utils@1.11.3

## 1.11.2

### Patch Changes

- 61a382b: The gray colors have been changed, the surface has been added, and the fields styles have also been changed
  - @vega-ui/hooks@1.11.2
  - @vega-ui/icons@1.11.2
  - @vega-ui/utils@1.11.2

## 1.11.1

### Patch Changes

- eef91ab: Fixed sheet paddings
  - @vega-ui/hooks@1.11.1
  - @vega-ui/icons@1.11.1
  - @vega-ui/utils@1.11.1

## 1.11.0

### Minor Changes

- a4c6339: SheetContent will now contain SheetMain, SheetHandle, and SheetHeader inside

### Patch Changes

- @vega-ui/hooks@1.11.0
- @vega-ui/icons@1.11.0
- @vega-ui/utils@1.11.0

## 1.10.1

### Patch Changes

- @vega-ui/hooks@1.10.1
- @vega-ui/icons@1.10.1
- @vega-ui/utils@1.10.1

## 1.10.0

### Minor Changes

- d5538a5: Added new sizes (xs, xl) for button, icon button and segmented control

### Patch Changes

- @vega-ui/hooks@1.10.0
- @vega-ui/icons@1.10.0
- @vega-ui/utils@1.10.0

## 1.9.0

### Minor Changes

- c90a0c1: Added new packages - tokens and theme

### Patch Changes

- @vega-ui/hooks@1.9.0
- @vega-ui/icons@1.9.0
- @vega-ui/utils@1.9.0

## 1.8.1

### Patch Changes

- c98c982: Added Size prop to PageControl, added hook useRefMap, improved accessability, added mergeEventHandlers util
- Updated dependencies [c98c982]
  - @vega-ui/hooks@1.8.1
  - @vega-ui/utils@1.8.1
  - @vega-ui/icons@1.8.1

## 1.8.0

### Minor Changes

- 83bafaa: Added new component - PageControl

### Patch Changes

- @vega-ui/hooks@1.8.0
- @vega-ui/icons@1.8.0
- @vega-ui/utils@1.8.0

## 1.7.4

### Patch Changes

- 7031b78: NumberField separated to components
  - @vega-ui/hooks@1.7.4
  - @vega-ui/icons@1.7.4
  - @vega-ui/utils@1.7.4

## 1.7.3

### Patch Changes

- 9bd2b72: Changed measure of padding and br into the Badge
- ff9b743: Fixed style for pin field
  - @vega-ui/hooks@1.7.3
  - @vega-ui/icons@1.7.3
  - @vega-ui/utils@1.7.3

## 1.7.2

### Patch Changes

- ec3ec3a: Added new badge appearance
- 272ce51: Changed spelling
  - @vega-ui/hooks@1.7.2
  - @vega-ui/icons@1.7.2
  - @vega-ui/utils@1.7.2

## 1.7.1

### Patch Changes

- bc29e3e: Changed Badge display to inline-flex
- a4f52d3: Separated inner components in Alert
  - @vega-ui/hooks@1.7.1
  - @vega-ui/icons@1.7.1
  - @vega-ui/utils@1.7.1

## 1.7.0

### Minor Changes

- 3941d2c: Added custom size, appearance and variant to elements
- 5cb45a4: Changed default icon size to null

### Patch Changes

- @vega-ui/hooks@1.7.0
- @vega-ui/icons@1.7.0
- @vega-ui/utils@1.7.0

## 1.6.0

### Minor Changes

- c672c1e: Added accordion item provider

### Patch Changes

- @vega-ui/hooks@1.6.0
- @vega-ui/icons@1.6.0
- @vega-ui/utils@1.6.0

## 1.5.0

### Minor Changes

- 89c9898: Added new compoents - AccordionTrigger, AccordionContent, that brings new flexibility for styling elements

### Patch Changes

- @vega-ui/hooks@1.5.0
- @vega-ui/icons@1.5.0
- @vega-ui/utils@1.5.0

## 1.4.2

### Patch Changes

- 7002513: Removed default props in Icon & added new types to Slot (generic type)
- e731538: Deleted utils for size map spinner
  - @vega-ui/hooks@1.4.2
  - @vega-ui/icons@1.4.2
  - @vega-ui/utils@1.4.2

## 1.4.1

### Patch Changes

- a136ce0: Deleted @property css
  - @vega-ui/hooks@1.4.1
  - @vega-ui/icons@1.4.1
  - @vega-ui/utils@1.4.1

## 1.4.0

### Minor Changes

- e022b3c: Added new utilities

### Patch Changes

- Updated dependencies [e022b3c]
  - @vega-ui/utils@1.4.0
  - @vega-ui/hooks@1.4.0
  - @vega-ui/icons@1.4.0

## 1.3.0

### Minor Changes

- 279075a: Changed providers of icons - lucide

### Patch Changes

- Updated dependencies [279075a]
  - @vega-ui/icons@1.3.0
  - @vega-ui/hooks@1.3.0
  - @vega-ui/utils@1.3.0

## 1.2.2

### Patch Changes

- a80dac4: Changed Alert styles accorded to Figma
  - @vega-ui/hooks@1.2.2
  - @vega-ui/icons@1.2.2
  - @vega-ui/utils@1.2.2

## 1.2.1

### Patch Changes

- 3bdf4de: Changed slider styles
  - @vega-ui/hooks@1.2.1
  - @vega-ui/icons@1.2.1
  - @vega-ui/utils@1.2.1

## 1.2.0

### Minor Changes

- 6224045: Added new component - RangeSlider, Slider and SliderBase

### Patch Changes

- Updated dependencies [6224045]
  - @vega-ui/utils@1.2.0
  - @vega-ui/hooks@1.2.0
  - @vega-ui/icons@1.2.0

## 1.1.1

### Patch Changes

- ffa6cc4: Fixed exports
  - @vega-ui/hooks@1.1.1
  - @vega-ui/icons@1.1.1
  - @vega-ui/utils@1.1.1

## 1.1.0

### Minor Changes

- c226a32: Added new components - Meter, MeterStack and Progress

### Patch Changes

- @vega-ui/hooks@1.1.0
- @vega-ui/icons@1.1.0
- @vega-ui/utils@1.1.0

## 1.0.1

### Patch Changes

- fb2ec42: Changed logo
- Updated dependencies [fb2ec42]
  - @vega-ui/hooks@1.0.1
  - @vega-ui/icons@1.0.1
  - @vega-ui/utils@1.0.1
