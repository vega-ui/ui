# @vega-ui/react

## 3.0.0

### Major Changes

- a876533: Popover, Select and Tooltip are positioned with CSS anchor positioning instead of Floating UI.

  - `@floating-ui/react` is no longer a dependency. The browser keeps the content next to its trigger while the page scrolls or resizes, flips it to the opposite side and shifts it into the viewport, without a script.
  - The minimum browsers are now Chrome and Edge 129, Safari 26 and Firefox 147. In older browsers the content still opens, but in the middle of the screen.
  - `TooltipArrow` and `TooltipArrowProps` are removed. The tooltip now sits 10px from its trigger instead of 14px.
  - `Placement` is the library's own type with the same values as before.
  - `data-side` on `PopoverContent` and `TooltipContent` is the preferred side from `placement`, not the side the content flipped to.

- 8adf390: `Button` no longer defaults to `type="button"`. Like a native `<button>`, it submits the surrounding form unless `type="button"` is set, and with `asChild` it no longer passes `type` to the child element. Internal buttons of `NumberField`, `PasswordField`, `Pagination`, `Calendar`, date fields and the dialog and drawer close buttons keep `type="button"`
- cdc774b: `IconButton` is removed: a button for one icon is now `<Button square>`.

  - `square` makes the button as wide as it is high, with no padding and the icon a third of its height, in every `size` of Button. Replace `<IconButton …>` with `<Button square …>`, `IconButtonProps` with `ButtonProps` and `IconButtonSize` with `ButtonSize`; the default look stays `primary` `fill`.
  - `fullWidth` is removed from `Button` and `CalendarViewButton`, like a native `<button>` has no width attribute: set `style={{ width: '100%' }}` or a class instead.
  - The CSS variables are renamed: `--icon-button-size` is `--button-height` and `--icon-button-br-ratio` is `--button-br-ratio`.
  - A square button has no text, so its types require `aria-label` or `aria-labelledby`, or `asChild` with the name on the child element.
  - The parts that rendered an icon button are behavior only now: they render a `Button` with no built-in icon and no forced `square`, so pass the icon as children with `square` and a name, write a text label, or render your own element with `asChild`.
    - `PasswordFieldToggleIconButton` is renamed to `PasswordFieldToggle`; `DateFieldTriggerIconButton`, `DateRangeFieldTriggerIconButton` and `DateTimeFieldTriggerIconButton` to `DateFieldTrigger`, `DateRangeFieldTrigger` and `DateTimeFieldTrigger`, with their `…Props` types.
    - `CalendarPrevButton` and `CalendarNextButton` no longer show a chevron, and an icon inside them is mirrored in a right-to-left layout; `NumberFieldIncrementButton` and `NumberFieldDecrementButton` no longer show a plus and a minus; the date triggers no longer show a calendar icon; `ComboboxTrigger` is no longer square by itself.
    - Migrate with `<CalendarPrevButton square aria-label='Previous month'><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>`, and the same with `ChevronRightIcon`, `PlusIcon`, `MinusIcon`, `CalendarIcon`, or `square` alone on `PasswordFieldToggle` and `ComboboxTrigger`.
  - The icon parts no longer draw a default icon, and `@vega-ui/react` no longer depends on `@vega-ui/icons` or `lucide-react`, so any icon set works. Pass the icon as children: `AccordionIcon`, `ComboboxIcon` and `SelectIcon` (a chevron), `CheckboxCheckedIcon` (a check mark), `CheckboxIndeterminateIcon` (a minus), `PasswordFieldShownIcon` and `PasswordFieldHiddenIcon` (an eye and a crossed out eye), and `AlertIcon`, which no longer picks the icon by `variant`. Migrate with `<SelectIcon><ChevronDownIcon /></SelectIcon>` and `<CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>`. `Icon` and every icon part require their children in the types, since an icon part with no children fails to render.
  - `CheckboxCardControlCheckedIcon` and `CheckboxCardControlIndeterminateIcon` are removed, with their `…Props` types: without an icon of their own they were the same as `CheckboxCheckedIcon` and `CheckboxIndeterminateIcon`, which take their place inside the indicator.

- a876533: BREAKING: `Grid` runs on a `@vega-ui/core` widget, and cells read only their own attributes from it. An arrow press re-renders only the two cells whose active state changes and does not evaluate `exclude` again, a change of `exclude`, `disabled`, or `selected` re-renders only the cells whose state changes, and a parent re-render with the same props none. The `onClick` and `onKeyDown` of a cell run before the grid selects it, so `event.preventDefault()` in them keeps the grid from selecting. `DayPicker`, `MonthPicker`, `YearPicker`, and `Calendar` show the period of a focused date instead of a visible month or year: every navigation is a change of the focused date, one render per key press or Prev/Next click, and the month and year views of `Calendar` are mounted only while they are open.

  - `DataGrid` is renamed to `Grid`, after the WAI-ARIA grid pattern it implements, with all its parts, hooks, and types: `GridRowGroup`, `GridRow`, `GridCell`, `useGridActive`, `useGridRowContext`, `GridCellKey`, `GridSelection`, and so on.
  - `DataGridPicker`, `DataGridPickerRow`, `DataGridPickerRowGroup`, `DataGridPickerItem`, `DataGridPickerScroller`, `DataGridPickerScrollerContent`, `useDataGridPickerContext`, and the `DataGridPickerSize` and `DataGridPickerVariant` types are removed. Use `Grid` with `selection='single'`. The look of the picker cells is `GridItem`, placed inside `<GridCell asChild>`, with `size` and `variant` of its own (`GridItemSize`, `GridItemVariant`), and `GridCell` sets `data-range` itself, so the `range` prop of the item is gone. The scroller is `GridScroller` with `IndexedSnapScrollerContent` for its pages. `DayPicker`, `MonthPicker`, and `YearPicker` take `size` and `variant` as before. The `--data-grid-picker-item-br-ratio` token is renamed to `--grid-item-br-ratio`.
  - `DataGridSelectable`, `DataGridSelectableRow`, `DataGridSelectableRowGroup`, and `DataGridSelectableCell` are removed: the WAI-ARIA grid pattern has one grid, and selection is a prop of it. `Grid` takes `selection` (`'single'`, `'multiple'`, or `'range'`) together with `value`, `defaultValue`, `min`, `max`, `resolveRange`, `compare`, and `onChangeValue`; without `selection` the cells have no `aria-selected` and a click does not select. `disabled` works without `selection` too. Use `GridRow`, `GridRowGroup`, and `GridCell` inside.
  - The selection props follow `Listbox`, `Select`, and `Calendar`: `selected`, `defaultSelected`, and `onSelectCell` are renamed to `value`, `defaultValue`, and `onChangeValue`, and `from` and `to` to `min` and `max`, on `Grid`, `DayPicker`, `MonthPicker`, and `YearPicker`. The `cellKey` of a cell is renamed to `value`, the key that the `value` of the grid holds.
  - `equals` is removed: keys are strings or numbers and are compared with `Object.is`. `expandable` is removed: Shift + arrows and a pointer drag always extend a `'multiple'` or `'range'` selection. `rowDelta` is removed: PageUp and PageDown move to the first and the last row, and `getNextKey` gives another step for the `pageUp` and `pageDown` intents.
  - The key types are `GridKey` (was `DataGridCellKey`), `GridKeys` for a key, an array of keys, or a predicate (replaces `GridExclude` and `GridDisabled`), and `GridKeyMatcher` for the predicate (replaces `GridExcludeResolver` and `GridDisabledResolver`). Without `selection`, `Grid` no longer accepts `value`, `defaultValue`, or `onChangeValue`.
  - `Grid`, `GridRowGroup`, and `GridRow` take `asChild` like `GridCell`, so a grid can be built on `table`, `tbody`, `tr`, and `td`; the grid layout of the parts applies only to non-table elements.
  - New `GridColumnHeader` and `GridRowHeader` render `columnheader` and `rowheader`. They take part in the keyboard navigation like cells, so a sort button in a header is reachable, and are never selected; pass `excluded` for a header with nothing to interact with. The weekday names of `Calendar` are `GridColumnHeader`s. `aria-rowcount`, `aria-colcount`, `aria-rowindex`, and `aria-colindex` pass through to the elements for grids that render only part of their rows.
  - Cells with interactive content follow the WAI-ARIA grid pattern: the controls inside a cell take `tabIndex={-1}`, so the whole grid is one tab stop and Tab enters it on the active cell and leaves it natively, without listeners on `document`; Enter or F2 on a cell moves the focus to its first focusable element, Tab cycles inside the cell, and Escape returns the focus to the cell, unless a control in the cell has an open popup: then Escape closes the popup first; keys pressed inside the content, like arrows in an input, no longer move the grid focus; a click or Space inside the content does not select the cell. All of it is steps of the grid widget, with `focusInside` actions the adapter runs, not a listener of the component. `GridCell asChild` gives `role="gridcell"` to every child, a `<button>` included, so each row holds only cells as ARIA requires; the button still runs on a click, Enter and Space. A link cannot take that role: put it inside the cell with `tabIndex={-1}`, `<GridCell><a href='…' tabIndex={-1}>…</a></GridCell>`.
  - Ctrl+A (Cmd+A) selects every enabled cell of a `selection='multiple'` grid, and Shift+Space selects from the most recently selected cell to the focused one.
  - A disabled cell, or one outside `min` and `max`, is never selected and never an edge of a range: Shift + arrows and a drag onto it move the focus but leave the range where it was, and in a multiple selection add the enabled cells before it. A `defaultValue` with a disabled key drops it; a `value` with one stays what the parent passed and is reported to the diagnostics, and the cell is not shown as selected: it has no `aria-selected="true"` and no `data-range`.
  - `Grid` handles a key only with the modifiers the WAI-ARIA grid pattern names. Ctrl, Command, or Alt with an arrow, Command or Alt with Home and End, Shift with Enter, Space, F2, or Escape, and Ctrl with Tab inside a cell no longer reach the grid, so they stay with the browser, the screen reader, and the page.
  - `excludeDisabled` is removed. A disabled cell of `Grid` stays focusable, as the WAI-ARIA grid pattern recommends, so screen reader users learn about it; to skip it, pass it to `exclude` too. `DayPicker`, `MonthPicker`, and `YearPicker` still skip unavailable dates: disabled ones and those outside `min` and `max`.
  - `useDataGridContext` and `useDataGridSelectableContext` are removed. Custom cells read their state with `useGridActive(key)`, `useGridSelected(key)`, `useGridDisabled(key)`, and `useGridRange(key)`. `useGridRowContext` stays.
  - `apiRef` exposes only `focus(key?)` instead of the `grid` matrix and `scopes`. A key of a cell that is not rendered yet becomes the active cell and takes focus as soon as the cell renders; without a key the tab stop takes focus.
  - `onArrow` is removed. New `getNextKey(intent, from, next)` overrides where a key moves: it receives the navigation intent (`forward`, `backward`, `up`, `down`, `rowStart`, `rowEnd`, `gridStart`, `gridEnd`, `pageUp`, `pageDown`, with `forward` and `backward` following the text direction), the key of the current cell, and the key the grid would move to, and returns the key to move to.
  - `resolveRange(start, end)` receives the two keys, ordered by `compare`, instead of their grid coordinates and the grid. With `selection='multiple'` it also builds the keys of a Shift+arrow or drag selection, and `Ctrl+A` selects `resolveRange` from the `gridStart` to the `gridEnd` key of `getNextKey`, so a virtualized grid selects rows that are not rendered.
  - BREAKING: `compare` of `Grid` has no default that compares the keys by value anymore. Without it the cells are ordered by their position, the row and then the column, as in the WAI-ARIA grid, so a range over the derived `row:col` keys of a grid of more than ten rows no longer selects the wrong cells, and a key of a cell that is not rendered is not ordered. `min` and `max` follow the same order. Pass `compare` for keys with an order of their own, like dates, and for virtualized grids. `DayPicker`, `MonthPicker`, and `YearPicker` pass it themselves.
  - `Grid` infers the key type from its props: `value={keys}` with `onChangeValue={setKeys}` of a `useState<number[]>` and `active={key}` with `onChangeActive={setKey}` no longer need `<Grid<number, 'multiple'>>`. The callbacks of `Grid` are typed as function properties, so a callback of another key type is an error instead of being accepted.
  - `compare` of `Grid` takes any compare function, like the one of `Array.prototype.sort`: it returns a negative number, `0`, or a positive number instead of exactly `-1`, `0`, or `1`, so `(a, b) => a - b`, `localeCompare`, and `Intl.Collator#compare` fit, and `min`, `max`, and the ends of a range follow its sign.
  - With `selection='multiple'`, Shift + arrows extend from the most recently selected cell instead of the cell that had the focus when Shift was pressed, as the recommended selection model of the WAI-ARIA listbox pattern says: select a cell, move away with the arrows, and Shift + arrow selects every cell in between. When that cell is not selected anymore, the extension starts from the focused cell as before.
  - Without `selection`, `Grid` no longer accepts `min` or `max`, like `value`: they only limit what can be selected.
  - BREAKING: `scope` of `GridRowGroup` and the `GridScope` type are removed, and with them `scope` of the row groups and layouts of `DayPicker`, `MonthPicker`, `YearPicker`, and `CalendarMonthsGrid`. `GridScroller` finds the cells of the page that snaps into view by the page element, so a page no longer passes its index to its row group: remove `scope`.
  - A `Grid` with a controlled `active` no longer looks through all its cells after every render of the parent, only when `active` changes.
  - A change of the selection of `Grid` notifies only the cells whose selection changes, the arrow keys reuse the layout of the rows until the cells change, and the cells handle no events of their own: the grid handles them in the capture phase, so the handlers of a cell still run after those of the grid. On a grid of 10 000 cells an arrow press takes 0.4 ms instead of 3 ms, a click 0.1 ms instead of 2.4 ms, and a step of a pointer drag 2.9 ms instead of 5.7 ms in Chromium.
  - A pointer drag of `Grid` follows only the pointer that started it, and ends when the browser cancels that pointer, such as when a native drag of an image or a link in a cell starts, so moving the mouse afterwards no longer extends the selection.
  - `Mod+A` of `Grid` selects all in a keyboard layout without Latin letters too, such as the Russian one.
  - `Grid` ignores the keys of an input method composition, so Escape that cancels a composition in a field of a cell keeps the focus in the field.
  - Tab and Shift+Tab inside an open popup of a cell are left to the popup and the browser instead of moving between the controls of the cell.
  - Shift + arrows of a multiple selection no longer bring back a key the app removed from `value` while the selection was being extended.
  - `focus` of the `apiRef` of `Grid` and a focus inside the grid no longer make a cell with `excluded` the active one, so `onChangeActive` never gets an excluded key.
  - `Grid` takes `cells`, its cells as data: the key, row and column of every cell, rendered or not. With it the server HTML has the right tab stop without `defaultActive`, the cells mount in one commit instead of two, the arrow keys, Shift + arrows and Ctrl+A move through and select cells that are not rendered, and a grid that renders only part of its cells no longer needs `compare`, `getNextKey` and `resolveRange` for that. A rendered cell that is not in `cells` is not seen by the grid.
  - The `DataGridCoordinates` and `DataGridResolveValue` types are removed; `GridIntent` and `GridRangePosition` are added.
  - `defaultActive` no longer defaults to `''`.
  - `GridCell` takes `disabled`, which sets `aria-disabled` and keeps the cell focusable.
  - Excluded cells are not focusable at all: they have no `tabindex` and never become the active cell, also on click.
  - `selection='multiple'` extends the selection with Shift + arrows and with a pointer drag, like `selection='range'`: the cells between the cell where the extension started and the current cell are added, and reversing the direction removes them again. Disabled cells are skipped.
  - The user's `onFocus`, `onClick`, and `onKeyDown` of `GridCell` run after the internal handlers.

  - The grid always has exactly one tab stop when it has a focusable cell: the active cell when it is focusable, otherwise the first selected focusable cell, otherwise the first focusable cell. A picker without `defaultActive` was not reachable with Tab.
  - Changing `exclude`, `disabled`, or the `excluded` prop of a cell after mount updates the keyboard navigation and the tab stop; the arrows no longer get stuck on a cell that was excluded later.
  - PageUp and PageDown move to the nearest row towards the current one that has a focusable cell in the column when the first or last row has none, for example from a Wednesday of March 2024 to March 27.
  - A range drag starts also from an element inside the start or end cell, such as a `span` with the label.
  - `DayPicker`, `MonthPicker`, and `YearPicker` run on one period widget of `@vega-ui/core` that wraps the steps of the `Grid` widget: it owns the focused date, derives the active cell from it by the tab-stop rules of days, months, and years, and handles Shift+PageUp/PageDown, showing a page, and focusing a date as steps and commands, not as effects of the components. `Calendar` is a widget of its own that composes the three pickers through their public props (`focusedDate`, `value`, `autoFocus`, `apiRef`): the view, the previous and next buttons, picking a month or a year, and Escape are its steps, and it shares no state with the pickers. A controlled `focusedDate` renders once per key press, `Calendar` moves the focused day of its day and year grids itself, so the previous and next buttons move it in one render, and a swipe to another month calls `onChangeFocusedDate` once with the same day of that month instead of first with the first day of it.
  - `Grid` sets `aria-multiselectable="true"` for `selection='multiple'` and `selection='range'`.
  - `DayPicker` (`month`), `MonthPicker` and `YearPicker` (`year`) lose the visible period prop and `active`, `defaultActive`, `onChangeActive`; they take `focusedDate`, `defaultFocusedDate`, `onChangeFocusedDate`, and `today`. `DayPickerScroller` loses `defaultMonth`, `YearPickerScroller` loses `defaultYear`.
  - `disabled` of `DayPicker`, `MonthPicker`, and `YearPicker`, the disabled dates, is renamed `disabledDates`, like `CalendarDatesDisabled` of `Calendar`. The pickers take `autoFocus`, which focuses the tab stop on mount like a native `autofocus`, and `focus()` of their `apiRef` without a date focuses the tab stop.
  - `Calendar` loses `month`, `defaultMonth`, and `onChangeMonth`; it takes `focusedDate`, `defaultFocusedDate`, `onChangeFocusedDate` (reports the focused day, e.g. Next from January 15 reports February 15), and `today`. The shape of `useCalendarContext()` changed accordingly.
  - `locale` of `Calendar`, `DayPicker`, `MonthPicker`, and `YearPicker` defaults to `"en-US"` instead of the runtime locale, and today is read after hydration (or given with `today`), so the server and the client render the same markup.
  - New `CalendarHeading`: an `h2` (another level with `as`) with `aria-live="polite"` that names the day grid; it wraps the `CalendarViewButton`s directly.
  - The tab stop of the pickers and the calendar is the focused date when it is available, otherwise the selected date or today in the shown period, otherwise the first available date; a disabled today is never the tab stop.
  - Day navigation follows the WAI-ARIA date picker pattern in `DayPicker` too: arrows cross months, Home/End go to the start/end of the week, PageUp/PageDown to the same day of the previous/next month, and Shift+PageUp/PageDown to the same day of the previous/next year, with February 29 clamped to February 28.
  - In `YearPickerScroller`, PageUp and PageDown move the focus by a page of years, also past the rendered pages. The page size is `period` of `YearPicker`, moved from `YearPickerScroller`: `<YearPickerScroller period={20}>` becomes `<YearPicker period={20}>`, and the keys are a step of the picker, so `event.preventDefault()` in your `onKeyDown` on the picker stops them.
  - After a month or a year is picked, or Escape closes the month or year view, `Calendar` moves the focus to the focused day of the day view.
  - Day cells mark today with `aria-current="date"`. Without `today`, it follows the device: checked every minute and when the page becomes visible again, so it moves at midnight and with the time zone.
  - `CalendarPrevButton` and `CalendarNextButton` keep the focus on the button.
  - `IndexedSnapScroller` follows quick changes of a controlled `index` far outside its window without "Maximum update depth exceeded", calls the user's `onScrollSnapChange` after its own handler, and is no longer a Tab stop of its own in Firefox.
  - `SnapScroller` scrolls to `defaultIndex` when it is first shown if it was mounted hidden (`display: none`), so a `Calendar` in a hidden tab, a popover or a Storybook story starts on its month and pages smoothly from the first click.
  - `Calendar` does not follow a `disabled` `<fieldset>`; use its `disabled` prop.
  - Closing the month or year view no longer makes the calendar jump: the focus returning to the days scrolled `CalendarContent` while the days were still sliding in. `CalendarContent` and `CalendarHeader` clip their content with `overflow: clip` instead of `overflow: hidden`.
  - The swiping and the grids of `Calendar` are separate parts, so a calendar can page with its buttons only or render its own grid. The days are `CalendarDaysScroller` > `CalendarDaysScrollerContent` > `CalendarWeeks`, or `CalendarWeeks` right in `CalendarDays` without swiping; `onChangePeriod` moves from `CalendarWeeks` to `CalendarDaysScroller`. The months are `CalendarMonths` > `CalendarMonthsGrid`, which takes `cols` and `format` instead of `CalendarMonths`. The years are `CalendarYears` > `CalendarYearsScroller` > `CalendarYearsScrollerContent` > `CalendarYearsGrid`, or `CalendarYearsGrid` right in `CalendarYears`, which then pages with the previous and next buttons; `format` moves from `CalendarYears` to `CalendarYearsGrid`.
  - `CalendarBase` and its parts are removed: `Calendar` takes `size`, `variant`, and `compact` itself, and its parts replace the base ones (`CalendarHeader` for `CalendarBaseHeader`, `CalendarWeekdays` and `CalendarWeekday` for `CalendarBaseWeekLabels` and `CalendarBaseWeekLabel`, `CalendarViewButton` for `CalendarBasePickerButton`, `CalendarPrevButton` and `CalendarNextButton` for `CalendarBaseControlIconButton`). `useCalendarBaseContext` is removed, and `CalendarBaseSize` and `CalendarBaseVariant` are renamed `CalendarSize` and `CalendarVariant`. Outside `Calendar`, render a weekday row as a `role="row"` element with `role="columnheader"` cells.

  BREAKING: `DateField`, `DateRangeField`, and `DateTimeField` follow the WAI-ARIA Date Picker Dialog pattern and validate like native date inputs.

  - The roots take `readOnly`, mirrored to the input: the calendar still opens and navigates, the day grid gets `aria-readonly="true"`, and a pick does not change the value. A read-only field is submitted, a disabled one is not.
  - The roots take `today`, passed to the calendar and used to read a two-digit year.
  - The calendar is a `dialog` named by the user (`aria-label` on `*FieldCalendar`) and the trigger has `aria-haspopup="dialog"`. Opening the calendar moves the focus into the day grid: the selected date, otherwise today, otherwise the first available date. Picking a day writes the value, closes the calendar, and returns the focus to the trigger; `DateRangeField` closes after the end, `DateTimeField` after the date and keeps the time. To keep the calendar open, control `open` of the popover and set it back to `true` in `onChangeValue`. The calendar stays non-modal: Tab leaves it.
  - An incomplete value, a value outside `min` and `max`, and an unavailable date make the input invalid through `setCustomValidity` with the message of the browser, so `:invalid`, `reportValidity()`, and the submit check work without `pattern`. `required` works natively.

  - A read-only field no longer changes from the calendar (#9).
  - A two-digit year (`yy`) is read within 80 years before and 19 years after the year of today, like CLDR, instead of always in the 1900s or 2000s (#20).
  - The trigger takes the focus on click in Safari, so the focus returns to it when the calendar closes.
  - `Calendar` takes `readOnly` and `autoFocus`, and without a focused or selected day it starts on `today` clamped to `min` and `max`.
  - `@vega-ui/utils`: new `expandTwoDigitYear`, `getTabbables` (every element Tab can reach, in document order), and `createKeyMatcher` (matches a key, a list of keys, or a predicate; a list is put into a `Set` once, so each check is constant time); `parseTemplateDate`, `parseTemplateRange`, and `normalizeTemplateDate` take an optional reference date for two-digit years.
  - `@vega-ui/utils`: `mergeEventHandlers` takes handlers of any event type, not only React synthetic events, and infers the most specific event of the handlers it merges.
  - `@vega-ui/utils` (breaking): the `Grid`, `Matrix`, `MatrixRow`, `MatrixNode`, and `MatrixIndexes` classes are removed. The `Grid` component no longer uses them: it keeps its cells in a registry and finds the neighbours by the row and column numbers.
  - `Grid` renders the selected cell of `selection='single'` as the tab stop in the server HTML when it has no `active` or `defaultActive`, so the grid is reachable with Tab before it hydrates.
  - `Grid` no longer sorts its cells by their DOM position on every arrow press, click, or pointer move: the navigation goes by the row and column numbers and the cells are found by key or element, so the DOM order is read only for the first cell and `Ctrl+A`. A Shift or pointer range in `multiple` mode takes the cells between its ends in the `compare` order, by default the row and then the column, like `min`, `max`, and the `range` mode, instead of the DOM order. Each cell subscribes to the store by its key with one subscription instead of five: moving the active cell wakes only the two cells whose active state changes, and only a change of `exclude`, `disabled`, or the selection wakes all of them, so an arrow press takes about the same time in a grid of 1,000 and of 20,000 cells.

- 1af9fda: `Calendar`, the pickers and the date fields work in any calendar system

  New package `@vega-ui/i18n` with no dependencies and no knowledge of the components; every function that needs a calendar takes it as the first argument:

  - the `CalendarSystem` adapter interface, the `GregorianCalendar` class (extendable with `super`, methods bound to the instance) and its shared instance `gregorianCalendar`; `createCalendarSystem(identifier)`, any other calendar built into `Intl` (Persian, Hebrew, Japanese, Buddhist, Islamic, Chinese…) with no dependencies: months numbered from the start of the year (13 in a Hebrew leap year), `Intl` era names, a year that ends with an era keeps only its own months, a year past the end of an era is clamped to its last year, an unknown era throws a `RangeError`; custom calendars plug in through the interface
  - calendar-aware helpers over `YYYY-MM-DD` strings: `addCalendarMonths`, `addCalendarYears`, `getCalendarMonthStart` / `End`, `getCalendarYearStart` / `End`, `getCalendarMonthsDistance`, `getCalendarYearsDistance`, `getCalendarMonthsOfYear`, `getSameDayInCalendarMonth`, `getSameMonthInCalendarYear`, `isSameCalendarMonth`, and the calendar-neutral `DAYS_IN_WEEK`, `addISODays`, `getISOWeekday`, `isoDateToUTC`, `utcToISODate`, `padDatePart`; like `<input type="date">` they cover the years 0001–9999 and throw a `RangeError` outside them
  - locale helpers: `getDefaultLocale()`, the runtime locale `Intl` uses by default, and `getFirstDayOfWeek`, `getWeekDayNames`, `getDateFormat`, `getDateSeparator`, moved from `@vega-ui/utils`: they take the locales argument of `Intl` and default to the runtime locale instead of `en-US`; `getDateFormat` / `getDateSeparator` take the calendar system first, describe the numeric fields, leave out eras and bidi marks (`ar-SA` gives `/`, not `\u200F/`), and use the Gregorian order of the locale for calendars that name their months (Hebrew, Chinese); new `toLatinDigits`
  - `Intl` formatting: `formatCalendarDate`, `formatCalendarDay` (bare day numbers, `15` rather than `15日`), `createCalendarDateFormatter` / `createCalendarDayFormatter` (one `Intl.DateTimeFormat` reused for many days; the day, month and year grids create one per layout instead of one per cell)

  `@vega-ui/utils` (now depends on `@vega-ui/i18n`):

  - typed entry of the date fields over a calendar system, `formatTemplateDate`, `parseTemplateDate`, `parseTemplateRange`, `normalizeTemplateDate`, `stepTimeSegment` (time only, no calendar) and `getDateTemplate` (the field template of a date format: `dd.MM.yyyy` → `dd.mm.yyyy`), `getTimeTemplate` (`HH:mm` → `HH:MM`) and `getDateTimeTemplate` (the template of `DateTimeField`: `dd.mm.yyyy, HH:MM`); new `getISODatePart` / `getISOTimePart`, the date and time parts of an ISO date time; `snapToStep(value, { min, max, step })`, the step grid of `<input type="range">`

  `Calendar`, `DateField`, `DateTimeField`, `DateRangeField`, `DayPicker`, `MonthPicker`, `YearPicker`:

  - new `calendar` and `locale` props on the root, applied to every part (labels, weekday names, week start, day, month and year grids); defaults are the Gregorian calendar and the runtime locale, like `Intl`. There is no global provider: for app-wide settings, wrap the component (`<Calendar locale={appLocale} {...props} />`). Values stay ISO strings in every calendar
  - `Calendar` sets `lang` on its root when `locale` is given
  - PageUp / PageDown move focus to the same day of the previous / next month, Shift+PageUp / Shift+PageDown to the same day of the previous / next year (WAI-ARIA date picker pattern)

  `Calendar` composition (breaking), one part per view instead of four nesting levels:

  - removed `CalendarDayPicker` and its `Item` / `Row` / `RowGroup` / `Scroller` / `ScrollerContent` / `ScrollerLayout`, `CalendarMonthPicker` and its `Item` / `Row` / `RowGroup` / `Layout`, `CalendarYearPicker` and its `Item` / `Row` / `RowGroup` / `Scroller` / `ScrollerContent` / `ScrollerLayout`, `CalendarMonthPickerButton`, `CalendarYearPickerButton`, `CalendarPickerButtonGroup`, `CalendarPrevYearGroupButton`, `CalendarNextYearGroupButton`, `CalendarWeekLabel`, `CalendarWeekLabels`
  - new `CalendarDays` (the day view, holding the new `CalendarWeekdays`, weekday names in the calendar's locale with `format`, and `CalendarWeeks`, the swipeable day grid with `format` and `includeOverflowDays`), `CalendarMonths` (`cols`, `format`), `CalendarYears` (`format`)
  - weekdays and cells are customized with template children, no render functions: the children of `CalendarWeekdays` / `CalendarWeeks` / `CalendarMonths` / `CalendarYears` render once per weekday or cell, read it with `useCalendarWeekdayContext()` (column, `weekday` as in `Date#getDay()`, name) / `useCalendarDayContext()` / `useCalendarMonthContext()` / `useCalendarYearContext()` (ISO date, fields in the calendar system, formatted label) and render `CalendarWeekday` / `CalendarDay` / `CalendarMonth` / `CalendarYear`; the template is required, there is no implicit default cell
  - `CalendarViewButton view='month' | 'year'` replaces the month and year picker buttons and their group; put the buttons in `CalendarHeading`
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
  - `Grid` ignores key presses whose default was already prevented
  - in range mode the bounds are always reported in order (`[start, end]`, `start` not after `end`), also when the range is picked backwards; the same holds for `Calendar`'s `onChangeValue`
  - without `defaultActive` the tab stop is always a cell in view: today when it is in the visible month / year, otherwise the first selected cell there, otherwise the first cell (`YearPicker`: the visible `year`); before, Tab skipped the grid when today was not shown
  - `YearPickerScroller` reports the page in view with `onChangePeriod(year)`, like `DayPickerScroller`

  Right-to-left:

  - the calendars and pickers follow the inherited text direction (`dir` on the page, an ancestor or the component), like native elements: the grids run right to left, ArrowLeft / ArrowRight are mirrored, the default Prev / Next chevrons point the right way, range ends are rounded on the correct side, and swiping and the scrollers page in the right direction

  Fixes:

  - `Calendar` without `selection` is typed as single selection, so `onChangeValue={setState}` with `useState<string>` type-checks
  - `getCalendarMonthsOfYear` (`@vega-ui/i18n`) returns only the months of each era in a year where a Japanese era changes (no duplicated months in `MonthPicker`)
  - `getFirstDayOfWeek` (now in `@vega-ui/i18n`) reads `Intl.Locale` week info correctly (`getWeekInfo()` or `weekInfo`, Sunday = 7) and falls back to the region of the locale (`fa-IR` → Saturday, `pt-BR` → Sunday) when the runtime has no week info
  - `NumberField`, `PhoneField`, `PinField`: after `form.reset()` the − / + buttons, the detected country and the PIN slots match the restored value. Breaking for custom parts: `useNumberFieldContext` and `usePhoneFieldContext` no longer expose `onInput`
  - `IndexedSnapScroller` (and every calendar scroller built on it) no longer moves pages under an ongoing scroll: it appends pages while a scroll reaches the end and re-centers the window once the scroll settles, so swiping to the edge in WebKit and Firefox no longer jumps two pages further (e.g. December → February) and fast swipes keep going; `onOffset(-1)` now fires when the scroll settles on the first page
  - `IndexedSnapScroller` keeps a scroll made right after a snap settles instead of jumping back a page (seen with fast swipes on a busy page)
  - `IndexedSnapScroller` re-syncs to a controlled `index` only when that prop changes, so the year picker no longer jumps back to the visible year after scrolling
  - `Calendar` month and year arrows no longer stop working after a few clicks: each click moves one page from the page the scroll is already heading to (clicks during a smooth scroll were lost in Firefox), the window grows when the target is outside it, and focus keeps the same day across quick month changes
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

- a876533: `Collapsible` and `Accordion` run on `@vega-ui/core` widgets, with the same markup and look.

  - A `Collapsible` the parent opens through `open`, and an `Accordion` item the parent opens through `opened`, now show their content. Before, the content stayed hidden unless the trigger was pressed first. The content animates whether the parent or the trigger opens or closes it
  - `onChangeOpen(true)` is called at the press, not one frame later
  - BREAKING: `CollapsibleContent` animates its height only while it opens or closes and keeps `height: auto` while open, so content that grows after opening is no longer clipped. It no longer sets the `--content-height` variable. Set the duration with `--transition-state-delay` or `animation-duration` on the content
  - The content is hidden once its closing animations finish, read from the browser, instead of on `transitionend`, so it also hides when no transition runs
  - `CollapsibleTrigger` and `AccordionTrigger` take button attributes such as `disabled` in their types
  - The trigger runs the user's `onClick` first, and `event.preventDefault()` in it keeps the section as it is. Before, the section toggled before the user's handler ran
  - Two `Accordion` items with the same `value` both follow it: both open and close together, as their `aria-expanded` already said
  - `useCollapsibleContext()` returns `{ handle }` and `useAccordionContext()` returns `{ handle, size }`, where `handle` is the widget handle; the old fields are gone. The accordion context was registered under the name of the alert context, which is fixed

- 1064f43: BREAKING: components get their own layout defaults, so the common workarounds are no longer needed.

  - **Roundness.** New `--br-ratio` token in `@vega-ui/tokens-core` (default `0.333`). `Button`, the fields, `TextArea`, `PinField`, `Checkbox`, `Option`, `Select`, `SegmentedControl`, `GridItem` and `Badge` read their `--*-br-ratio` from it, and `Code` takes its radius as its line height times it, so one value makes them all square, rounder or pill-shaped. It works on a nested element too. Update `@vega-ui/tokens-core` with `@vega-ui/react`.
  - **`Badge` radius variable.** `--badge-border-radius-ratio` is renamed to `--badge-br-ratio`, like on the other components.
  - **`Fieldset`.** The browser margin is reset. A transparent `Fieldset` puts `var(--spacing-6)` under its legend, which the flex `gap` does not reach.
  - **`FieldsetLegend` size.** The legend uses the `Label` text size instead of a larger one.
  - **`Checkbox` layout.** The root is an `inline-flex` row with centered items and a `var(--spacing-4)` gap, so the box no longer sits on its own line above the text. `CheckboxIndicator` does not shrink.
  - **`SegmentedControl`.** Segments share the width equally and can shrink in a narrow container instead of overflowing it. A disabled segment uses `--disable-label-text-color`, like a disabled `Option`.
  - **`Pagination`.** The list has no browser margin or padding, and the gap between items is `var(--spacing-2)` instead of `var(--spacing-6)`.
  - **`TextArea` size.** The sizes match `TextField`: one row is 36, 42 and 48px tall for `sm`, `md` and `lg`, like a `Button` of the same size.
  - **`Calendar` width.** `CalendarContent` no longer reports the width of all its scrolled pages, so a calendar in a flex row or a shrink-to-fit container is as wide as one month instead of several.
  - **Picker items.** `GridItem` has `var(--spacing-3)` inline padding inside its minimum width, so month and year labels no longer touch.
  - **`Table`.** The default `dataAlign="between"` aligns the middle columns to the start instead of centering them. A `TableHeading` inside `TableHead` draws the line under the row itself, so the line stays with sticky headings.
  - **`AvatarFallback`.** Its font size no longer uses `!important`, so `style` can override it.
  - **Selected `Option`.** Inside a selected option `--label-secondary` and `--label-tertiary` follow `--option-color`, so secondary text stays readable on the selected fill.
  - **`Code` wrapping.** Long tokens wrap with `overflow-wrap: anywhere`.
  - **`Avatar`.** The avatar does not shrink in a flex row.
  - **`MeterStack`.** The root has `role="group"`. Name it with `aria-label` or `aria-labelledby`.
  - **`Switch`.** `--switch-indicator-transition-delay` applies again.

- 6f10f80: The value of the masked fields moves to the root, like `Slider`: the input part only shows it, so a controlled field keeps every keystroke and follows a value changed outside.

  - **Breaking:** `NumberField` takes `value`, `defaultValue` and `onChangeValue` as a number, `NaN` for an empty field; `NumberFieldInput` no longer takes `value` and `defaultValue`
  - **Breaking:** `PhoneField` takes `value`, `defaultValue` and `onChangeValue`; `PhoneFieldInput` no longer takes `value` and `defaultValue`. The country of `defaultValue` is selected unless `country` is set
  - **Breaking:** `DateField` takes `value`, `defaultValue` and `onChangeValue` as a `YYYY-MM-DD` day, `DateTimeField` as a `YYYY-MM-DDTHH:mm[:ss]` timestamp, `DateRangeField` as a `[start, end]` tuple of days; `''` while the text is empty or incomplete. Their input parts no longer take `value` and `defaultValue`
  - the input parts still fire their own `onChange` and `onInput` on every edit of the text, and `name` still submits the text
  - a form reset restores `defaultValue` unless the field is controlled
  - the increment and decrement buttons of `NumberField` follow changes of `min` and `max`
  - **Breaking for custom parts:** the contexts of these fields expose the shown `text` and `changeText` instead of `setText`, `detectCode` and `changeDate` / `changeTime`

  `@vega-ui/utils`: new `formatTemplateRange(calendar, [start, end], template, separator)`, the counterpart of `parseTemplateRange`.

- 39c05d0: BREAKING: new `Listbox`, and `Select` is built on it instead of the floating-ui interaction hooks. Positioning stays on floating-ui.

  - New `Listbox`, `ListboxOption`, and `ListboxGroup`: an always visible list like a native `select` with `size`. Name it with `aria-labelledby` or `aria-label`. `label` on an option sets its text for typeahead and does not change what `SelectValue` shows. With `multiple`, `value`, `defaultValue`, and `onChangeValue` use arrays, `Space` and `Enter` toggle the active option, and adjacent selected options merge into one shape. `Enter` and `Space` select the active option without calling its `onClick`, and only the options whose active state changes re-render on arrows.
  - `Listbox` runs on a `@vega-ui/core` widget: the list reads its options from the DOM, so options added, removed or reordered are followed, including a reorder with the same keys; the active option follows the pointer; the list remembers its active option while unfocused and starts from the first selected one when it has none; with `multiple`, `Shift+Space` selects from the most recently selected option to the active one, `Ctrl+Shift+Home` and `Ctrl+Shift+End` select to the first or last option, and `Ctrl+A` selects every enabled option. `PageUp` and `PageDown` move the active option by ten. `useListboxContext` returns the widget `handle` with `size` and `disabled` instead of the store and selection callbacks.
  - `Select` runs on its own `@vega-ui/core` widget that shares the option logic with `Listbox`: the open state, the active option, the value, typeahead and the form reset are steps of one state, so the active option is set in the same commit that opens the list. The list closes when the focus leaves the select by hiding its popover, so a controlled parent hears `onChangeOpen(false)` once for an outside click. `useSelectContext` returns the widget `handle`, `selected` and `open` instead of `comboboxProps` and `changeOpen`.
  - `Option` is a `div` instead of a `button`: its `ref` points to an `HTMLDivElement`, it no longer takes `value` and is not generic, `focusable` is replaced by `active`, and `disabled` sets `aria-disabled` and uses the `--disable-label-text-color` and `--disable-background-color` tokens like `GridItem`.
  - `SelectListbox` has no `data-status`, style it with `:popover-open`, and `useSelectContext` no longer returns `status`.
  - `SelectHiddenSelect` renders only the selected `option`: it submits the value and no longer lists all options.
  - `SelectListbox` is hidden with `visibility` instead of the `inert` and `hidden` attributes, and its options no longer shrink to fit `max-height`, so a long list scrolls at the full option height.
  - `value={null}` clears a controlled `Select` or single `Listbox`, `undefined` still makes it uncontrolled. `Select` stays closed while `disabled` or `readOnly`, even with `open` or `defaultOpen`, ignores arrows with `Meta` or `Ctrl`, and typing that matches nothing no longer opens it. A disabled `Option` does not call `onClick`.
  - `SelectListbox` is a native `popover="auto"` element: the browser closes it on `Escape` and an outside click. In a `Dialog`, `Escape` closes only the list.
  - The focus stays on the `SelectCombobox`, which points to the active option with `aria-activedescendant` and sets `aria-haspopup`, `aria-expanded`, and `aria-controls`.
  - `Select` keyboard follows the WAI-ARIA select-only combobox: arrows stop at the ends of the list, typing while closed opens the list and moves to the match instead of selecting it, typeahead matches from the start of the label instead of anywhere in it, `typeMatchEnabled` is renamed to `typeahead`, `Tab` selects the option moved to with the keyboard and moves on, and without such a move keeps the value, `Alt+ArrowUp` closes the list, and `PageUp` and `PageDown` jump by ten options.
  - `useSelectContext` no longer returns the floating-ui `context`, `itemProps`, `listboxProps`, `elementsRef`, `labelsRef`, `activeIndex`, `selectedIndex`, `selectRef`, `update`, and `onSelect`, and `valueRef` is replaced by `valueElement` and `setValueElement`. `SelectComboboxProps` no longer has `readOnly` and `variant`, set them on `Select`. `SelectValueProps` extends the attributes of a `span` instead of `TextProps`. `SelectListbox` ignores `id`, and `ListboxOption` and `SelectOption` do not take `id`, `selected`, or `active`.

- a876533: `Dialog`, `Drawer` and `Sheet` run on one `@vega-ui/core` modal widget, with the same markup and look.

  - The user's handlers run first: `event.preventDefault()` in `onClick` of the trigger or the close button, or in `onCancel` or `onSubmit` of the content, keeps the overlay as it is. Before, the overlay acted before the user's handler
  - `useDialogContext()`, `useDrawerContext()` and `useSheetContext()` return the widget `handle` instead of `open` and `changeOpen`
  - The swipe of `Drawer` and the drag, the snap points and the backdrop of `Sheet` run in the widget, with the same motion: the drag writes its frame without a render, `SheetHandle` sends a command, and `useSheetContext()` returns only `{ handle }`, so `changeHeight`, `height`, `viewport`, `offsets`, `activeSnapPoint`, `changeActiveSnapPoint` and `steppedSnapPoints` are gone; `useSnapshot(handle, (state) => state.activeSnapPoint)` reads the chosen snap point. The user's `onClick` of `SheetHandle` runs first, and `event.preventDefault()` in it keeps the snap point

- 1990f69: Rename `getCommited` to `getCommitted` in the `SnapScroller` api ref
- ce0b569: BREAKING: `IconSize` no longer includes `null`. Omit `size` or pass `undefined` instead of `size={null}`.
- a876533: Fields show the error state from the native semantics of their control instead of an `error` prop.

  - **Breaking:** the `error` prop of `TextField`, `TextArea` and `PinField`, and so of `DateField`, `DateRangeField`, `DateTimeField`, `TimeField`, `NumberField`, `PhoneField` and `PasswordField`, is removed, and so is their `data-error` attribute. A field shows the error state when its control has `aria-invalid="true"`, for an error only the app knows, or fails native validation after the user edited it or tried to submit the form (`:user-invalid`), for `required`, `pattern`, `min`, `max` or `setCustomValidity`
  - **Breaking:** `PinFieldInput` no longer sets `aria-invalid` itself; pass it to the input like to any other field
  - **Breaking:** the `error` prop of `HelperText` is renamed to `invalid`, and its `data-error` attribute to `data-invalid`
  - `HelperText` shows its own tertiary and error colors; the color of `Text` used to override them
  - `TimeField`, `DateField`, `DateTimeField`, `DateRangeField`, `NumberField`, `PhoneField` and `PinField` dispatch `change` when the user leaves the input after changing its text, like a native input; a pick in the calendar or a step that already dispatched `change` is not reported again. The browser does not count a text these fields write as an edit of the user, so `:user-invalid` stays off for them in Chromium and WebKit: the input gets `data-user-edited` instead, and a form reset removes it. Style an invalid field the user has left with `:is(:user-invalid, [data-user-edited]:invalid)`
  - `Checkbox`, `CheckboxCard`, `Radio`, `Switch`, `Select` and `Slider` show the error state the same way: `aria-invalid="true"` on `CheckboxInput`, the `Radio` input, `SwitchInput`, `SelectCombobox` or `SliderThumbInput`, or `:user-invalid` of the native control, like a `required` checkbox or a `required` `SelectHiddenSelect` after a submit attempt

- a876533: `TimeField`, `DateField`, `DateTimeField`, `DateRangeField`, `PinField`, `NumberField` and `PhoneField` run on `@vega-ui/core` widgets, with the same markup, look and typing: the widget masks every edit before the browser applies it, and `@maskito/core`, `@maskito/kit`, `@maskito/phone` and `@maskito/react` are no longer dependencies.

  - the input parts still fire their own `onChange` and `onInput` on every edit of the text, also on one the mask corrected or ArrowUp / ArrowDown made
  - a text the browser enters without an edit, like autofill, is calibrated by the same mask
  - picking a day in the calendar writes the text like typing does and dispatches `input` and `change`, like a native date picker; a read-only input keeps its text
  - a controlled field shows an edit that changes its value once the parent accepts the value, so a character the parent rejects never reaches the input
  - `PinField` moves the caret between slots by the logical direction, so in a right-to-left field ArrowLeft selects the next slot
  - `NumberField` groups, clamps and pads the number as before, steps it with the arrows, the wheel and the buttons with `input` and `change` like a native number input, and keeps the page from scrolling while the wheel steps a focused field
  - `PhoneField` formats the number by the template of its country as before, keeps a collapsed caret after the calling code of a strict mask, and writes the calling code of a selected country with `input` and `change`
  - **Breaking:** `TimeField`, `DateField`, `DateTimeField` and `DateRangeField` keep a typed value outside `min` and `max` and make the input invalid through `setCustomValidity`, like a native date or time input, instead of replacing it with the nearest bound; a change of `min` or `max` changes only the validity, without `input` or `onChangeValue`, and a controlled value outside them is shown as it is. `TimeFieldInput` is invalid for an incomplete time or one outside `min` and `max`, like the date inputs. A parent that wants a dependent field to follow another, like a check-out after a check-in, sets its value in `onChangeValue` of the first
  - ArrowUp / ArrowDown in `TimeField` and `DateTimeField` stop at `min` and `max` instead of stepping past them
  - a change of `format`, `separator`, `calendar` or another option of a masked field shows the value by the new options without changing it or calling `onChangeValue`, like a native input whose attribute changes
  - **Breaking:** the `precision` prop of `NumberField` is removed, it never had an effect; `maximumFractionDigits` limits the digits after the decimal point
  - **Breaking for custom parts:** `useNumberFieldContext()` returns `handle` instead of `text`, `changeText` and `inputRef`
  - **Breaking for custom parts:** `usePinFieldContext()` returns `handle`, `size`, `placeholder`, `disabled`, `error` and `maxLength`; the code, the active slot and the select-all state are read from `handle` with `useSnapshot` instead of `value`, `active`, `selectedAll`, `setValue`, `setActive`, `setSelectedAll`, `syncActive`, `inputRef` and `innerInputRef`
  - **Breaking for custom parts:** `usePhoneFieldContext()` returns `handle` instead of `inputRef`, `phone`, `changePhone`, `code` and `onSelectValue`; the country is read from `handle` with `useSnapshot`

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

  `Select` renders its list in the top layer with `popover="auto"` and `Tooltip` its content with `popover="manual"` when the browser supports it, so a modal dialog or an `overflow` container no longer clips or covers them. `SelectPortal` and `PhoneFieldSelectPortal` are removed: render `SelectListbox` directly inside `Select`. `SelectListbox` stays at least as wide as the combobox, also when the combobox resizes while the list is open, and only fades with reduced motion.

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
  - `SegmentedControl`: `onChange` with the radio's `change` event is replaced by `onChangeValue`, called with the value of the selected item, a number item value as a number. `SegmentedControl` is generic over that value, so `value={period}` types `onChangeValue` as the type of `period`; `SegmentedControlValue` is exported. The root's `onChange` is now the native `change` event that bubbles from the radio: `event.currentTarget` is the root, so take the value from `onChangeValue`. Migrate `onChange={(event) => setPeriod(event.currentTarget.value)}` to `onChangeValue={setPeriod}`.

- d27ca41: Overlay and listbox fixes, and the WAI-ARIA keyboard and focus behavior they were missing.

  - `DialogContent`, `DrawerContent`, and `SheetContent` take `container` to portal into another element, `document.body` by default, and enforce `closedBy` in browsers without the native `closedby`: `none` ignores `Escape`, and `any` closes on a press that starts and ends on the backdrop. `ModalDialogClosedBy` is exported.
  - `DialogTrigger`, `DrawerTrigger`, and `SheetTrigger` take the focus on click, so the focus returns to them on close in Safari too. `DialogClose`, `DrawerClose`, and `SheetClose` set `type="button"` with `asChild` too, pass `type="submit"` to submit a form instead.
  - `Drawer` and `Sheet` slide in again when a browser extension, such as a password manager, reads their style before they open: a closed `DrawerContent` or `SheetContent` keeps the native `display: none`.
  - `Dialog`, `Drawer`, and `Sheet` close once their `::backdrop` has faded out too, so the `Sheet` backdrop no longer vanishes halfway with reduced motion.
  - The `::backdrop` of `Dialog`, `Drawer`, and `Sheet` covers the whole screen while the page overscrolls, `Drawer` slides out past its outer space, and `SheetContent` is at most `600px` wide.
  - `Select` resets to `defaultValue` with its form, and `PhoneField` resets its country. The hidden select forwards the focus to the combobox, so an invalid required `Select` gets focused on submit, and WebKit re-validates it after a change. `Tab` from the combobox calls `onChangeOpen(false)` once instead of two or three times. A choice closes the list before it calls `onChangeValue`, as a native `<select>` closes before `change`, so picking a country in `PhoneField` calls `onChangeOpen(false)` once too. `PhoneFieldSelect` calls your `onChangeValue` after it has updated the country. The list keeps its place while it fades out inside a `container-type` ancestor, and the `PhoneField` country list no longer stretches across the screen.
  - `SelectValue` truncates a long value with an ellipsis, `SelectCombobox` shows the focus ring only on keyboard focus, `SelectIcon` takes `--select-icon-color`, `SelectCombobox` takes `--select-combobox-gap`, and `SelectListbox` takes `--select-listbox-br-ratio` and scales in and out.
  - `Listbox` with `multiple` supports the optional WAI-ARIA keys: `Shift+Arrow` moves and toggles, `Shift+Space` selects from the last toggled option, `Ctrl+Shift+Home` and `Ctrl+Shift+End` select to the first or last option, and `Ctrl+A` selects or clears all. Arrow keys in a multiple `Listbox` re-render only the two options whose active state changes, not every option. `Listbox` is rounded, and `Option` grows with wrapped text, padded with `--spacing-2` and `--spacing-10`.
  - BREAKING: `PhoneFieldSelectCombobox`, `PhoneFieldSelectValue`, `PhoneFieldSelectIcon`, `PhoneFieldSelectHiddenSelect`, `PhoneFieldSelectListbox`, and `PhoneFieldSelectOption` are removed. Put `SelectCombobox`, `SelectValue`, `SelectIcon`, `SelectHiddenSelect`, `SelectListbox`, and `SelectOption` inside `PhoneFieldSelect` instead, and set the gap and alignment of an option with several parts yourself. Picking a country in `PhoneFieldSelect` fires the input `input` and `change` events.
  - BREAKING: a close made by the browser is final, as the platform cannot cancel it. `PopoverContent` and the `SelectListbox` list are native `popover="auto"`, so an outside click, `Escape`, a trigger click, or another popover opening hides them for good: a controlled parent that keeps `open` true no longer gets them shown again, they stay hidden until `open` changes, so set `open={false}` in `onChangeOpen`. This also fixes two controlled open lists or popovers showing each other in an endless loop. `aria-expanded` and `data-open` of `SelectCombobox` and `SelectIcon` follow the list the browser shows, not the `open` prop, so they turn off at once after a light dismiss. An open from `PopoverTrigger` is final the same way: a controlled parent that keeps `open` false no longer gets the popover hidden back. `DialogContent`, `DrawerContent`, and `SheetContent` still let a controlled parent turn down `Escape`, a backdrop click, and a `<form method="dialog">` submit, since the native `cancel` allows it, but a close the browser makes without asking, such as `close()` on the element or a forced close after repeated `Escape`, now stays closed until `open` changes.
  - BREAKING: `useSelectContext` no longer returns `isSelected`, as it repeated the one of the list: read it from the `Listbox` context instead. `Select` closes its list when the focus leaves the whole `Select`, through its own `onBlur`, instead of through `SelectCombobox` and `SelectListbox`.
  - BREAKING: `onChangeValue` of `Select` and single `Listbox` is typed `(value: V | null) => void` instead of `V | undefined`, as it is called with `null` when the value is cleared. Type your handlers with `null`.
  - `PopoverTrigger` and `TooltipTrigger` point to the `id` you give `PopoverContent` or `TooltipContent`: before, such an `id` kept `Popover` from opening and dropped the tooltip from the trigger `aria-describedby`.
  - New `PopoverClose` closes its `Popover`, and `PopoverAnchor` positions the content against another element than the trigger.
  - `Escape` closes an open `Tooltip` alone, leaving the `Dialog`, `Drawer`, or `Sheet` around it open for the next `Escape`.
  - `TooltipContent` unmounts when its CSS transition ends instead of after a fixed delay, and keeps the native `display: none` until it opens.
  - `Tooltip` waits `250` ms by default before it hides after the pointer leaves, so the pointer can cross the gap onto the tooltip, as WCAG asks of content shown on hover. Pass `delayClose={0}` to hide at once. Another `Tooltip` hovered meanwhile still shows at once, without its `delayOpen`.
  - BREAKING: `Popover` and `Tooltip` render no element of their own, only their children, so they no longer take `className`, `style`, or other `<div>` attributes: put them on `PopoverContent`, `TooltipContent`, or a wrapper of your own.
  - BREAKING: `DialogTrigger`, `DrawerTrigger`, and `SheetTrigger` no longer set `aria-expanded`, as a modal covers its trigger and the state never reaches the user, matching the WAI-ARIA dialog pattern. They keep `aria-haspopup="dialog"`.
  - BREAKING: `Dialog` no longer takes `fluid`. Stretch `DialogContent` with `style` or `className` instead, as the full-screen dialog example shows.
  - `Tooltip` takes `placement`, shows at once on keyboard focus, stays open while hovered, and keeps the user `aria-describedby` on the trigger.

  `@vega-ui/hooks`: BREAKING: `useResize` is removed, use a `ResizeObserver` or a `resize` listener of your own, and `useGrid` and `useIndexes` are removed, as they served only `Grid` and `IndexedSnapScroller` and now live inside `@vega-ui/react`. `useScrollSnap` is removed: `SnapScroller` and `IndexedSnapScroller` run on a `@vega-ui/core` widget that reads the snapped page from the scroll position. The published types keep `| null` and `| undefined`, since the declarations are built in strict mode. `useSelection` is removed: selection is a `selection` step of `@vega-ui/core` now, which `Listbox` and `Select` run, and a single `Listbox` or `Select` does not call `onChangeValue` when the chosen option is picked again, as a native `<select>` fires no `change`. `@vega-ui/utils`: `mergeProps` joins `aria-describedby` lists.

- a876533: `PageControl` runs on a `@vega-ui/core` widget:

  - The arrows follow the text direction, so they are mirrored in right-to-left, where the items are laid out from right to left. Before, → always moved to the next index, which is the item on the left in right-to-left.
  - Home and End activate the first and the last item.
  - The arrows skip a gap in the `index` values and a disabled item. Before, they stopped at a missing index and activated a disabled item they could not focus.
  - A press activates an item on pointer down instead of on click.
  - The user's handlers run before the control's, and `event.preventDefault()` in `onKeyDown` stops the keyboard navigation.
  - `usePageControlContext()` no longer returns `itemRef`.

- 66c846d: Rebuild `Pagination` as navigation with links.

  BREAKING CHANGE: 🧨

  - `Pagination` renders a `<nav>` instead of a `<ul>`, and its `ref` points to it. Name it with `aria-label`
  - New `PaginationList` renders the `<ul>`, and `PaginationItem` now renders the `<li>`
  - New `PaginationLink` replaces the button-based `PaginationItem`: it renders an `<a>`, `current` sets `aria-current='page'`, `appearance` replaces the default look (`fill` for the current page, `transparent` for the others), and `asChild` renders a router link or a `<button>` instead
  - `PaginationEllipsis` renders an `<li>` hidden from assistive technologies, as wide as a link of the same size, with `…` by default. It goes in `PaginationList` directly, not inside a `PaginationItem`
  - Removed `PaginationListItem`, `PaginationTriggerIconButton` and `PaginationText`. Use `PaginationLink` with an `Icon` and an `aria-label` for the arrows, and `Text` for the status

- a876533: `PhoneField` keeps the number in E.164 and the country as a hint.

  - **Breaking:** `value`, `defaultValue` and `onChangeValue` of `PhoneField` are the number in E.164, like `"+79123456789"`, not the text of the input: the digits typed so far, `''` while the field has no digit after the calling code. The input shows the number formatted
  - **Breaking:** `code`, `defaultCode` and `onChangeCode` of `PhoneField` are renamed to `country`, `defaultCountry` and `onChangeCountry`
  - **Breaking:** a `country` changed by the parent or by a control of your own changes only the country shown in `PhoneFieldSelect` and the calling code a strict mask starts an empty field with; it no longer writes the calling code into the input and never changes the number. A country the user picks in `PhoneFieldSelect` writes its calling code and reports `onChangeValue` and `onChangeCountry` in the same pick, also when the parent controls `country`. A strict mask keeps the calling code the number starts with
  - `PhoneField` takes `disabled`, which disables the input and the country select and leaves the number out of the form data
  - A number too short or too long for its country makes `PhoneFieldInput` invalid through `setCustomValidity` with the message of the browser
  - The country detected from a typed number is reported with the edit, also when the parent controls `value`; it used to change silently once the parent accepted the number
  - A strict `PhoneField` keeps the first digit typed into an empty field: it used to drop it and show only the calling code
  - A `required` `PhoneFieldInput` that shows only the calling code is invalid with the message of an empty field: the browser counted its text as filled

- 6f10f80: `PinField` input reworked:

  - **Breaking:** `PinFieldHiddenInput` is renamed to `PinFieldInput`, like `PasswordFieldInput` and `TextFieldInput`
  - **Breaking:** `PinFieldInput` no longer takes `disabled` and `maxLength`; set them on `PinField`, so the input and the slots always agree
  - **Breaking:** `PinField` takes `value`, `defaultValue` and `onChangeValue`; `PinFieldInput` no longer takes `value` and `defaultValue` and still fires its own `onChange` and `onInput`. The slots follow a controlled `value` changed outside, and a form reset restores `defaultValue` unless the field is controlled
  - `maxLength` of `PinField` is optional and defaults to `4`
  - the `placeholder` of `PinField` is also set on the input
  - Home and End move to the start and the end; Shift with an arrow key extends the selection natively
  - the `PinField` context is named `PinFieldContext` in errors

- a876533: `Popover` runs on a `@vega-ui/core` widget, with the same markup and look.

  - `PopoverClose` is a native `popovertarget` button with `popovertargetaction="hide"`: the child given with `asChild` must be a button, `event.preventDefault()` in its `onClick` keeps the popover open, and its close is made by the browser, so it is final like a light dismiss instead of waiting for a controlled parent
  - The user's `onToggle` on `PopoverContent` runs before the popover's own handler
  - The children of `PopoverContent` render once the browser shows the popover and stay until its closing animations end
  - `usePopoverContext()` returns `handle` and `close()` instead of `open` and `changeOpen`; `close()` hides the popover unless a controlled parent keeps `open`

- 51fe5bc: **`Heading` whitespace.** BREAKING: `Heading` no longer sets `white-space: pre-line` and collapses whitespace like a native heading, as `Text` does. Set `whiteSpace: 'pre-line'` where a newline in the string must break the line.

  **Indeterminate `Progress`.** An indeterminate `Progress` leaves out `aria-valuenow`, also when it gets a `value`, so a screen reader does not announce a number for work whose amount is unknown.

  **Flag references.** `FlagCC`, `FlagCI`, `FlagHR`, `FlagKP`, `FlagKR`, `FlagNZ`, `FlagVG` and `FlagVI` no longer carry `mask` references to masks they do not contain. The browsers ignored them, so the flags look the same.

- d66a438: - The AvatarStack types and context are named after the component: `AvatarGroupProps` is `AvatarStackProps`, `AvatarGroupStackItemProps` is `AvatarStackItemProps`, `AvatarGroupSize` is `AvatarStackSize`, `AvatarGroupVariant` is `AvatarStackVariant` and `useAvatarGroupContext` is `useAvatarStackContext`. The context shows as `AvatarStackContext` in React DevTools instead of `CheckboxContext`.
  - `SegmentedControl` renders `role='radiogroup'` on its root, so the group is named by its `aria-label` or `aria-labelledby` without passing the role.
  - `defaultValue` no longer narrows the type of the value to its literal in `Select`, `Combobox`, `Listbox`, `Grid` and `SegmentedControl`, so `defaultValue='day'` lets `onChangeValue` compare the value with `'week'`; `onChangeValue` of `Slider` gets a `number` or a `number[]`, not the literal of `defaultValue`.
  - `PinField` marks no slot active until the field has the focus: an untouched field used to draw the active ring on its first slot.
  - `PinField` writes a pasted code over the slots from the selected one, as if it were typed character by character: pasting `1234` into a full field from its first slot used to replace only that slot and drop the rest.
- a876533: The remaining component logic runs on `@vega-ui/core` widgets, with the same markup and look:

  - `Select` restores its default value through the form reset of the widget
  - `PasswordField` keeps `shown` in a widget
  - `CheckboxInput` writes `indeterminate` to the input through a widget
  - `Collapsible` calls `onChangeHidden` from its widget, also when a controlled parent opens or closes it
  - `AvatarImage` keeps showing `fallbackSrc` once it loads instead of switching back to the failed `src` and around again, tries a new `src` from the start, and calls your own `onLoad` and `onError` too
  - **Breaking for custom parts:** `usePasswordFieldContext()` no longer returns `inputRef`, which nothing read

- a876533: - **Breaking:** `onChange` of `SegmentedControlItemInput` runs before `onChange` of `SegmentedControl`, like a native `change` event bubbling from the radio to the group, and `event.stopPropagation()` in it keeps the root's `onChange` from running. The root's `onChange` used to run first.
- a876533: The undocumented deep entry points `@vega-ui/react/Listbox/contexts`, `@vega-ui/react/SnapScroller/contexts` and `@vega-ui/react/TextField/contexts` are removed: code shared by several components no longer lives in one component's folder. `useListboxContext` and `useSnapScrollerContext` stay exported from `@vega-ui/react`.
- 46cd85f: BREAKING: `Sheet` `activeSnapPoint` and the `onChangeActiveSnapPoint` value are now indexes into `snapPoints` in the order you pass them, like `defaultSnapPoint`. They used to point into the snap points sorted by position. `onChangeActiveSnapPoint` no longer fires on mount when `defaultSnapPoint` is set, and the sheet opens at `defaultSnapPoint` on the first frame.

  With `steppedSnapPoints`, an edge swipe down no longer closes a `Sheet` with `closable={false}`, and a closing swipe no longer also moves to the next snap point.

- a876533: `Slider` runs on a `@vega-ui/core` widget with the same markup, look and native range inputs: each `SliderThumbInput` is a root of the widget, which keeps the thumbs between their neighbours, steps them by the arrows, PageUp and PageDown the same in every browser, and restores the default value on a form reset.

  - Safari mirrors the horizontal arrows in a right-to-left slider
  - Firefox moves by a hundredth of the range on the arrows with `step='any'` instead of jumping to the end
  - A key the slider steps fires `input` and `change` on the thumb, like the native input, so `onChange` on a thumb and on a form sees it
  - **Breaking for custom parts:** `useSliderContext()` returns `handle` instead of `changeThumb`

- a876533: `SnapScroller` and `IndexedSnapScroller` run on one `@vega-ui/core` widget:

  - The page offsets are measured when the pages or the size of the scroller change, and the snapped page is read from them on every scroll, without a measure per frame.
  - An item whose `index` changes is reported under its new index. Before, the scroller could keep the old index of the element and skip the callbacks.
  - `useSnapScrollerContext()` returns the widget `handle` instead of `itemRef` and `removeItemRef`.
  - `IndexedSnapScroller` keeps its window of pages, the controlled `index`, the scroll position across a re-centered window and the pending scroll of `next()`, `prev()` and `setIndexTo()` in the widget instead of component effects.
  - `IndexedSnapScroller` keeps reporting a swipe after `setIndexTo()` is called with the page already shown. Before, the scroller waited for a scroll that never came and skipped `onScrollSnapChanging` until a wheel or a press.
  - `DayPicker` and `YearPicker` keep the first focused month and year, which the pages of their scrollers count from, in the widget instead of component state; `useDayPickerContext()` gives it as `anchor`, like `useYearPickerContext()`.

- a876533: - `Switch` moves its thumb by the writing direction: in a right-to-left page the thumb of a checked switch stays inside the track at its left end instead of sliding out of it
  - **Breaking:** the `--switch-indicator-transform` custom property of `Switch` is replaced by `--switch-indicator-offset`, the distance of the thumb from the inline start of the track
- f827279: `TimeField` keeps its value on the root like the other masked fields:

  - **Breaking:** `TimeField` takes `value`, `defaultValue` and `onChangeValue` as a `HH:mm` time (`HH:mm:ss` when the format has seconds), `''` while the text is empty or incomplete; `TimeFieldInput` no longer takes `value` and `defaultValue`. A form reset restores `defaultValue` unless the field is controlled
  - **Breaking:** `format` uses the notation of `DateTimeField.timeFormat`: `'HH:mm' | 'HH:mm:ss'` instead of `'HH:MM' | 'HH:MM:SS'`
  - **Breaking:** `min` and `max` bound the whole time like a native `<input type="time">`: a complete time outside them is replaced by the nearest bound, instead of bounding each segment separately; invalid bounds are ignored
  - ArrowUp / ArrowDown step the hours by one and the minutes or seconds under the caret by `step`, like `DateTimeField`; digits of other numbering systems are accepted

  `@vega-ui/utils`: new `parseTemplateTime`, `formatTemplateTime` and `normalizeTemplateTime` for times typed by a `HH:MM[:SS]` template, and `isISOTime`, a check for `HH:mm[:ss]` strings

- a876533: `Tooltip` runs on a `@vega-ui/core` widget, with the same markup and look.

  - `group` says which tooltips warm each other up, so the next one opens without `delayOpen`: all tooltips share one group by default, and `createTooltipGroup()` makes a separate one, like for the tooltips of one toolbar. `TooltipGroup` is its type
  - The user's handlers on `TooltipTrigger` and `TooltipContent` run before the tooltip's own: `event.preventDefault()` in `onKeyDown` keeps the tooltip open on `Escape`
  - `useTooltipContext()` returns the widget `handle` instead of `open`, `changeOpen`, `show`, `showNow`, `hide`, `hideAfterDelay` and `cancelHide`; `useSnapshot(handle, (state) => state.open)` reads the open state

- a876533: - **Breaking:** the parts below call your handler before their own, and `event.preventDefault()` in it skips their own, like on the other parts of the library: `onClick` of `NumberFieldIncrementButton`, `NumberFieldDecrementButton`, `PasswordFieldToggle`, `CalendarPrevButton`, `CalendarNextButton`, `CalendarViewButton`, `DateFieldTrigger`, `DateTimeFieldTrigger` and `DateRangeFieldTrigger`, `onPointerDown` of `PinFieldSlot` and `onFocus` of `SelectHiddenSelect`. Your handler used to run after the step, the toggle or the focus had already happened
- 1eeb9d7: BREAKING: components render valid HTML and keep their roles.

  - **`PageControl` root.** The root is a `<div role="tablist">` instead of a `<ul>`, whose children could only be `<li>`. Its `ref` and attributes are typed for `HTMLDivElement`. Put the items straight inside it, without `<li>`.
  - **Current `PageControlItem`.** `current` no longer disables the item, so the current page stays focusable and keyboard users can reach it. Pass `disabled` yourself to disable it.
  - **Active `PageControlProgress`.** The active item stays a `tab` with `aria-selected="true"` instead of becoming a `meter`, so the tablist keeps its selected tab. It no longer sets `aria-valuemax` or `aria-valuenow`, and the fill is visual only. `current` now marks the item like on `PageControlItem`.
  - **`CheckboxCardControl`.** It renders a `<span>` instead of a second `<label>` inside the card's label. Its `ref` and attributes are typed for `HTMLSpanElement`. `Checkbox` takes `asChild` to render through its child for the same case.
  - **`Badge`, `Avatar`, `AvatarStackItem` and `VisuallyHidden`.** They render a `<span>` instead of a `<div>`, so they are valid inside `<p>`, `<label>` and `<button>`. Their `ref` and attributes are typed for `HTMLSpanElement`. `<VisuallyHidden asChild><span>` is no longer needed for that.
  - **`AlertContent`.** It renders its children in a `<div>` instead of a `<p>`, so it can hold paragraphs and lists. Wrap plain text in your own `<p>` where you need a paragraph.
  - **`Text` whitespace.** `Text` no longer sets `white-space: pre-line` and collapses whitespace like a native `<span>`, so hard-wrapped copy reads as one paragraph. Set `whiteSpace: 'pre-line'` where the newlines matter, such as an address.
  - **`Card` alignment.** The children of `Card` stretch to its width, as in any column flexbox, instead of shrinking to their content. Set `alignSelf: 'flex-start'` on a child, such as a button, that should keep its own width.

### Minor Changes

- a876533: `Grid`, `DayPicker`, `MonthPicker` and `YearPicker` take `readOnly`, like a native `readonly` input: the grid gets `aria-readonly="true"`, navigation still works, and selecting a cell neither changes the selection nor calls `onChangeValue`. `Calendar` passes its `readOnly` to the days.

  `Calendar` keeps all of its behavior in its widget, without changes for the user: the month and year views stay mounted until their exit animations end, the previous and next buttons scroll `CalendarDaysScroller` and `CalendarYearsScroller` and are hidden past `min` and `max`.

- fa3d436: New `Combobox`: a text input with a list of suggestions, following the WAI-ARIA combobox pattern.

  - `Combobox` holds the picked option in `value`, `defaultValue` and `onChangeValue`, and the list state in `open`, `defaultOpen` and `onChangeOpen`. Editing or clearing the text calls `onChangeValue(null)`.
  - `ComboboxInput` goes inside a `TextField` and keeps its text as a plain input value, controlled with `value` and `onChange` or uncontrolled. Picking an option writes the option label and fires `input`, so `onChange` receives it.
  - `ComboboxListbox` is the list, a native `popover="manual"` element shown while the combobox is open and has options. Put `ListboxOption` and `ListboxGroup` in it; the app filters the options itself.
  - `ComboboxTrigger` is a button inside the `TextField` that opens and closes the list for the pointer and touch. It stays out of the tab order and keeps the focus in the input. `ComboboxIcon` goes inside it: a chevron by default, sized like the icon of a `Select` and marked `data-open` while the list is shown.
  - `autocomplete` on the root sets `aria-autocomplete` on the input: `list` by default, when the app filters the options by the text, `none` when the options stay the same, and `both` to also complete the typed text with the label of the first matching option, the part after the typed text selected, or `inline` to only complete it, with the list left closed while typing. Typing goes over the completed rest, `Backspace` removes it, the arrow keys write the label of the option they reach with the same rest selected, `Enter` picks the option, `Escape` puts the typed text back, and leaving the input keeps the completion. The text before the selection is what the user typed, so the app filters by it.
  - The active option is marked `aria-selected`, and the picked one while no option is active. Hovering an option only highlights it and leaves the active option to the keyboard, as in the WAI-ARIA examples.
  - Typing opens the list without an active option. `ArrowDown` and `ArrowUp` open it at the first or last option and move through it, the trigger and `Alt+ArrowDown` open it scrolled to the picked option without an active one, `Enter` and `Alt+ArrowUp` pick the active option, `Escape` closes the list and clears the text when the list is closed, and any key left to the input, like `ArrowLeft`, `ArrowRight`, `Home`, `End` or `Backspace`, returns to the text without closing the list, even when the caret cannot move. `Enter` without an active option and `Escape` with nothing to clear reach the form and the page.
  - `@vega-ui/widgets/combobox` exports the framework-free widget, and `@vega-ui/widgets/listbox` exports the `activeExists` invariant it shares with `Listbox` and `Select`.
  - `@vega-ui/core` writes the selection of `act.setText` before it dispatches `input`, so an `onChange` reads the selection along with the text.
  - `@vega-ui/core` looks only at added nodes to follow a reorder of the registered items, so rendering a long list down to a few options no longer checks every removed node against every remaining item.
  - `@vega-ui/core` adds the `text.key` input: a widget that declares it hears the keys it yields to a text field inside its root, such as the caret keys and typed characters, without preventing them.

- d80f57a: New `ContextMenu`: a menu that opens where the user asks for it, built from the parts of `Menu`.

  - `ContextMenu` reports whether the menu is shown through `onChangeOpen` and takes a `size`; it renders only a hidden point for the menu to open at and has no `open` or `defaultOpen`, as the menu opens only at a point the user gives. `ContextMenuTrigger` is the area, a `<div>` or your own element with `asChild`, without menu button semantics.
  - A right click, the context menu key or Shift+F10 on the area opens the `MenuContent` at the point instead of the menu of the browser, with the focus on the first item; a long touch that stays in place opens it on touch screens, also on iOS, which has no `contextmenu` event. The menu flips to stay in the viewport. A text field inside the area keeps the menu of the browser and its selection on a long touch.
  - The items, groups, checkbox and radio items and submenus are the ones of `Menu`. Escape, Tab, Shift+Tab, a click outside or an item that runs closes the menu, and the browser gives the focus back to where it was. Name the menu with `aria-label` on `MenuContent`.
  - `@vega-ui/widgets/menu` adds `contextMenuWidget`.

- 7d971b9: Controlled state for `Tooltip` and `PasswordField`:

  - `Tooltip` takes `open`, `defaultOpen` and `onChangeOpen`, like `Popover`
  - `PasswordField` takes `shown`, `defaultShown` and `onChangeShown` for the password visibility
  - `PasswordFieldToggle` exposes the visibility with `aria-pressed` and keeps the focus like a native button instead of moving it to the input, so mobile keyboards do not open on every toggle; give it a fixed label such as "Show password"
  - a custom `onClick` on `PasswordFieldToggle` no longer replaces the toggle
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

  - `@vega-ui/utils`: new `formatISODate`, `parseISODate`, `parseISODateTime`, `sanitizeISODates`

  Breaking: the `Calendar` props above and the `min` / `max` / `disabledDates` types of the date fields change.

- 33697d3: New `Menu`: a list of actions or options that a menu button shows, following the WAI-ARIA menu button and menu patterns.

  - `Menu` holds whether the menu is shown in `open`, `defaultOpen` and `onChangeOpen`, and takes a `placement` and a `size` (`xs`, `sm`, `md`, `lg` or `xl`, as in Select and Listbox). It renders no element of its own.
  - `MenuTrigger` is the `<button aria-haspopup="menu">` with `aria-expanded` and `aria-controls`, or your own element with `asChild`. A click, Enter or Space shows the menu with the focus on its first item; the Down arrow shows it on the first item and the Up arrow on the last one.
  - `MenuContent` is the `role="menu"` popover in the top layer, anchored to the trigger with CSS anchor positioning and named by the trigger unless you pass `aria-label` or `aria-labelledby`. The focus moves on the items themselves: the Up and Down arrows wrap around the ends, Home and End jump to the first and last item, typing moves to the next item whose label starts with the typed text, and the item under the pointer takes the focus. Escape and Shift+Tab close the menu with the focus back on the trigger, Tab closes it and moves on, and a click outside closes it.
  - `MenuItem` is a `<button role="menuitem">`, or an `<a>` that navigates with `asChild`. A click, Enter or Space runs its `onClick`, closes the menu and gives the focus back to the trigger; `preventDefault` in `onClick` keeps the menu open. `disabled` sets `aria-disabled`, so the item stays focusable as the pattern asks but never runs.
  - `MenuCheckboxItem` (`menuitemcheckbox`) holds `checked`, `defaultChecked` and `onChangeChecked`; `MenuRadioGroup` holds the `value`, `defaultValue` and `onChangeValue` of its `MenuRadioItem` (`menuitemradio`). A click, Enter or Space checks the item and keeps the menu open, for view options a user toggles one after another; `keepOpen={false}` makes a click and Enter close the menu as on a plain item. `MenuItemIndicator` holds the check mark you pass as its children: it keeps its place in every item and shows only in a checked one.
  - `MenuGroup` is a `role="group"` for related items; `Separator` divides the groups.
  - `@vega-ui/widgets/menu` is the framework-free widget behind it, with `menuCheckboxWidget` and `menuRadioGroupWidget` for the checked state.
  - `MenuSubmenu` and `MenuSubmenuTrigger` nest a submenu inside a `MenuContent`, to any depth. `MenuSubmenuTrigger` is a `menuitem` with `aria-haspopup="menu"`, `aria-expanded` and `aria-controls` that names its submenu; the submenu opens beside it, at the end of the line in the writing direction. Enter, Space, the arrow toward the submenu or a click open it with the focus on its first item, and the pointer resting on the item opens it without moving the focus. Escape and the arrow away from it close only the submenu with the focus back on its item; an item of a submenu that runs closes every menu and gives the focus back to the menu button. While the pointer heads from the item toward the open submenu, the items it crosses do not take the focus, so the submenu stays open. `@vega-ui/widgets/menu` adds `submenuWidget`

- a876533: `@vega-ui/i18n` has the `PhoneNumbering` adapter for phone numbers: `format` formats an international number as it is typed, `parse` reads its calling code, national number and country (a number without `+` as a number of a given country, without its national prefix), `getLength` checks its length against its country, and `getCallingCode` returns the calling code of a country. The default `phoneNumbering` runs on `libphonenumber-js/min`, now a dependency of `@vega-ui/i18n`. `PhoneCountry` is the ISO 3166-1 alpha-2 code of a country, the same as `CountryCode` of `libphonenumber-js`.

  `PhoneField` reads, checks and formats numbers through the new `numbering` prop, `phoneNumbering` by default: another engine replaces libphonenumber with an object of the same four methods. `country`, `defaultCountry` and `onChangeCountry` are typed with `PhoneCountry` from `@vega-ui/i18n`.

- 411e6ad: New `Tabs`: a list of tabs that shows one panel at a time, following the WAI-ARIA tabs pattern.

  - `Tabs` holds the selected tab in `value`, `defaultValue` and `onChangeValue`. Without a value the first enabled tab is shown. `orientation` is `horizontal` or `vertical`, `size` is `sm`, `md` or `lg`, and `variant` (`primary` or `secondary`, the default) colors the line under the selected tab.
  - `activation='automatic'` (the default) shows a tab as soon as the arrow keys move to it; `activation='manual'` only moves the focus, and Enter, Space or a click shows the focused tab.
  - `TabsList` is the `tablist`: the arrow keys along its orientation move between the tabs and wrap around the ends, Home and End jump to the first and last tab, and the list is one Tab stop that leads to the shown panel.
  - `TabsTab` is a `<button role="tab">` with a `value`; native `disabled` takes it out of the arrow keys.
  - `TabsPanel` is the `tabpanel` of the tab with the same `value`. Hidden panels stay mounted with `hidden="until-found"`, so the browser's find in page and text fragment links reach their text and show their tab; a controlled parent that keeps `value` hides the panel again. They are `aria-hidden` and out of the focus order until shown.
  - A line under the selected tab follows it with CSS anchor positioning and needs no extra part; a vertical list puts it on a rail along the start edge.
  - `@vega-ui/widgets/tabs` is the framework-free widget behind it.

- 9dcbb8e: New `Toast`, `ToastRegion` and `ToastClose`, with `createToastQueue` and `useToastContext`.

  - `createToastQueue<Content>()` makes a queue you keep in a module of your own, with no provider: `add(content, { timeout })` shows a toast from anywhere, React or not, and returns its key, `close(key)` closes it. A toast without `timeout` stays until it is closed.
  - `ToastRegion` shows the toasts of a queue as a named `role="region"` live region in the top layer, mounted before the first toast so the screen reader reads every one. It renders its children once per toast as a template that reads the toast with `useToastContext()`, shows the `limit` newest toasts (3 by default) and keeps the older ones waiting. `placement` puts them at the top or the bottom edge, at the start, centered or at the end (`top-end` by default), always centered on a narrow screen. Over an open modal `<dialog>`, `Dialog`, `Drawer` and `Sheet` included, the region moves into the dialog, so the toasts stay above it and the user can still press them.
  - The timers pause while the pointer or the focus is on the toasts, while the window has no focus and while the tab is hidden, and run on with the time they had left.
  - The toasts stack as a deck that expands while the pointer or the focus is on it. A swipe in one of the `swipeDirections` (by default toward the edge the toasts sit at and the nearer side edge, which follows a right-to-left page) closes a toast once it goes far or fast enough, and resists and springs back the other way; Escape closes the focused toast, and the focus moves to the next one, or back to where it was before the toasts once the last one closes.
  - `Toast` is one toast, `role="status"` by default; pass `role="alert"` for an urgent one and name it with `aria-labelledby`. `ToastClose` closes its toast after your `onClick`, unless it calls `preventDefault`, and takes your own button with `asChild`, like an Undo that also dismisses.
  - The styles move with springs and fall back to a fade with reduced motion. `--toast-inset`, `--toast-gap`, `--toast-peek`, `--toast-br-ratio`, `--toast-radius` and `--toast-shadow` on the region tune the look. The state is in `data-expanded` on the region and `data-index`, `data-front`, `data-status`, `data-swiping`, `data-swipe-direction` with `--toast-index`, `--toast-offset`, `--toast-height`, `--toast-front-height`, `--toast-swipe-x`, `--toast-swipe-y` and `--toast-release-duration` on each toast.
  - `@vega-ui/widgets/toast` is the framework-free queue and widget behind them.
  - `@vega-ui/core` adds `act.restoreFocus()`, which focuses again the element that had the focus before it entered the widget, `act.pauseTimer(name)` and `act.resumeTimer(name)`, which keep the time a timer has left, `act.awaitAnimationsAt(key)`, which answers `browser.animationEnd` with the `key` once the animations of an item have finished, `browser.inactive` and `browser.active` when the window loses or regains the focus or the tab is hidden or shown, and `stayOnTop(container, popover)`, which keeps a popover above the other top layer elements and moves its container into the topmost modal dialog and back.

  `@vega-ui/tokens-core` adds `--black-shadow-strong`, a dark shadow with a sharp edge, and the dark theme gives it to `--surface-shadow`, so menus, popovers, dialogs and toasts stand out from the page and from a surface of the same color under them; the light theme keeps its shadow.

- ffcf60f: New `Toolbar`, `Toggle`, `ToggleGroup` and `ToggleGroupToggle`, following the WAI-ARIA toolbar pattern.

  - `Toolbar` is a `role="toolbar"` with `aria-orientation` that takes one Tab stop: the arrow keys of its `orientation` move the focus between its items and wrap around the ends, Home and End jump to the first and last item, and Tab comes back to the item that had the focus last. Name it with `aria-label`.
  - `ToolbarItem` makes a control one of the items: a `<button>`, or your own `Button`, `MenuTrigger`, `Toggle` or text field with `asChild`. `disabled` on it disables the child and the arrows skip it. A text field keeps its arrows for the caret, and a menu opened from an item keeps the arrows inside the menu.
  - `Toggle` is a button that stays pressed, with `aria-pressed`, `pressed`, `defaultPressed` and `onChangePressed`; a click, Enter or Space turns it on and off. It is a `Button` that takes `square` for one icon, or your own element with `asChild`, transparent when released and tinted in the primary color when pressed.
  - `ToggleGroup` holds the `value`, `defaultValue` and `onChangeValue` of the `ToggleGroupToggle`s inside it, each with its own required `value`: one pressed button at a time as a `radiogroup` of `radio` buttons with `aria-checked`, or each button by itself with `multiple`, with `aria-pressed` and an array value. The arrow keys of both axes move the focus without pressing, and Tab enters on the pressed button. Inside a `Toolbar` its buttons join the arrows and the one Tab stop of the toolbar. `ToggleGroupToggle` is a `Button` that takes `square` and `asChild` like `Toggle`, and `disabled`, which the arrows skip; `size` and `disabled` on the group apply to every toggle in it.
  - `@vega-ui/widgets/toolbar`, `@vega-ui/widgets/toggle` and `@vega-ui/widgets/toggle-group` are the framework-free widgets behind them.

- 4ceaa2e: `SnapScroller` takes `orientation='vertical'`, typed `SnapScrollerOrientation`: the items stack in a column, the scroller snaps along the block axis after its `scroll-padding-block-start` and marks itself with `data-orientation`. The `snap-scroller` widget takes the same `orientation` option, and `SNAP_TO` takes `'animated'`: the scroller scrolls to the item over its own `animation-duration` and `animation-timing-function` and reports the item it stops at, even the one it started from.

  New `WheelPicker`, `WheelPickerColumn`, `WheelPickerOption` and `WheelPickerFace`: columns of options that turn like wheels around one selection band, for a time, a duration or a value with its unit. Each column is a `spinbutton` and a vertical `SnapScroller` in one element, with its own `value`, `defaultValue` and `onChangeValue`, scrolls with native scroll snapping and turns with ArrowUp/ArrowDown, PageUp/PageDown, Home/End and typeahead; `loop` makes it go on past the last option to the first one, repeating the options 15 rows past each end. Disabled options are skipped. `size` on `WheelPicker`, `xs` to `xl` and `md` by default, sets the rows and the text like the fields of the same size. The wheels bend into a cylinder with scroll-driven animations where the browser has them and from the scroll position elsewhere. An option is a row that stays in place as a stop of the scroll, and what it shows goes in its `WheelPickerFace`, which bends along the cylinder: browsers stop a scroll by where an element is drawn, so one element cannot be both. A `WheelPickerFace` without children shows the text of its option, its `label` or `value`. The new `wheel-picker` widget holds the column logic.

  `SnapScroller` and `IndexedSnapScroller` measure their items in layout pixels while an ancestor is scaled, like a popover in its opening animation: the scroller used to open a few pixels off and snap to a neighbouring item. The core measure reports `offsetWidth` and `offsetHeight` of a scroller for this, and an element with `role="spinbutton"` reads its arrow keys as plain keys, like a horizontal widget. The new core action `act.animateScroll(part, options)` scrolls a part over its `animation-duration` and `animation-timing-function` without snapping, stops when the user turns the wheel or presses, and answers with one `scroll.end`. The core action `act.scrubWithScroll(part, { keyframes })` drives a paused animation of a part by its scroll, for browsers without scroll timelines; `act.stopScrub` stops it. Several widgets can share one element: `act.send(part, input)` reaches every widget whose root is that part, and `registryOf` becomes `registriesOf`, which lists them.

  `TimeField` picks the time on wheels: `TimeFieldTrigger` opens a `Popover`, and `TimeFieldColumn` with a `unit` of `hour`, `minute` or `second` inside a `WheelPicker` shows the time of the field, goes by `step`, disables the times outside `min` and `max` and writes the time it turns to into the input. The children of a time column are the required template of its options: `<TimeFieldOption><WheelPickerFace /></TimeFieldOption>`, a `WheelPickerOption` with its face for your own class, style or content, with the option read through `useTimeFieldOptionContext()`. A `WheelPickerOption` with neither text nor `label` announces its `value`. `TimeField` takes `disabled` and `readOnly` for the input, the trigger and the wheels. `WheelPickerColumn` takes `autoFocus`. The `time-field` widget takes `PICK_VALUE` and exports the wheel helpers `getTimeWheelOptions`, `getTimeWheelValue` and `pickTimeWheel` with the type `TimeFieldUnit`, which `@vega-ui/react` re-exports. `DateTimeField` picks the time on wheels too: `DateTimeFieldColumn` with the same `unit` turns the time of the date and keeps the day, goes by `timeStep`, takes `today` within `min` and `max` for the date of an empty field and disables the times outside `min` and `max` on their days; its options use `TimeFieldOption`. The calendar and the time wheels of `DateTimeField` share one popover, like the picker of a native `<input type="datetime-local">`: picking a day in `DateTimeFieldCalendar` writes it and keeps the popover open for the time instead of closing it, and `DateTimeFieldCalendar` is no longer a `role="dialog"` of its own; set `role="dialog"` and the name on `PopoverContent`. The time goes on a button under the calendar, as on iOS: `DateTimeFieldTime` shows the time of the field, or its `placeholder` while there is none, for the button that opens the wheels in a nested popover, and the `date-time-field` widget exports `timeOf`. A `Popover` that closes with the focus still inside returns it to the element it came from, since the browsers leave it inside a nested popover, also when the browser drops that focus before the `toggle` event, as Firefox does on a busy page. The popups follow the size of their field: `WheelPicker` takes the size of the field around it unless it has its own, and `DateFieldCalendar`, `DateRangeFieldCalendar` and `DateTimeFieldCalendar` take it on the same scale unless they have their own `size`, so the calendar of a field of the default `md` size grows from `xs` to `md`. `PICK_VALUE` of the `date-time-field` widget takes a full date and time as well as a day, and the widget exports `getDateTimeWheelOptions`, `getDateTimeWheelValue` and `pickDateTimeWheel`.

  `PopoverContent` starts its opening animation together with its children: the fade and scale ran on the compositor while the children were still rendering, so heavy content such as wheels showed an empty box first.

### Patch Changes

- 471516f: Accordion no longer adds an already opened value to `opened` again, so `onChangeOpened` never receives duplicates.
- dc610af: `AccordionTrigger` passes its other props, such as `onClick`, `id`, `aria-*` and `asChild`, to the trigger button instead of dropping them
- b9abf4a: `Listbox` and `Select` set `aria-activedescendant` only to an option that exists, so a controlled `active` the items lack no longer points assistive technology at a missing id.
- 03a8337: Alert `fill` appearance uses the same translucent tinted background and text color as Badge `ghost`.
- b8ee302: `Alert` keeps its content at the start of the row when it has no `AlertMain` instead of pushing it to the end
- 5feb6c9: fixed merging events & snapping to step
- b9abf4a: **A list or sheet the browser closed stays closed.** When the browser closed the list of a controlled `Select` (outside click, `Escape`) or a controlled `Sheet`, `Drawer` or `Dialog`, and the parent kept `open` true, a change of another prop, like the `value` of the `Select` or the `activeSnapPoint` of the `Sheet`, showed it again. It now shows again only when `open` changes, as the docs say, or, for a `Select`, when it becomes enabled.
- afa700c: `ButtonBase` (and `Button` and other buttons built on it) no longer sets the native `disabled` attribute on the child element with `asChild`. The child owns its disabled state: a disabled link is an `<a>` without `href`, with `aria-disabled="true"` for the disabled styling and announcement.
- ffd63aa: `DialogTrigger`, `DrawerTrigger`, `SheetTrigger`, `PopoverTrigger`, `TooltipTrigger` and `Option` render `type="button"`, so clicking them inside a form no longer submits it. A `type` prop still overrides it, and `asChild` leaves the child element untouched
- a876533: `Calendar` marks the real today with `aria-current="date"` when today is before `min` or after `max`. Before, it marked the `min` or `max` day instead, so screen readers announced the wrong day as today.
- 184b98f: `Card` types its `ref` as `Ref<HTMLElement>` to match the rendered `<article>` (or the `asChild` element) and its `HTMLAttributes<HTMLElement>` props.
- bf2b34c: `DialogContent` fades in and out together with its scale transition instead of appearing and disappearing at full opacity
- a876533: Every option key gets its own element id. Before, keys like `a.b` and `a_b` got the same id, so `aria-activedescendant` in `Listbox`, `Select` and `Combobox` could point a screen reader to the wrong option, and keys with `'`, `(`, `)`, `!`, `~` or `*` produced ids with those characters.
- 171e217: `DrawerContent` now lets its own props win over the drawer's internal floating props, like `DialogContent` and `SheetContent`. A `role` passed to `DrawerContent` is no longer replaced by `dialog`, and internal event handlers run before yours.
- 480483c: `DrawerTrigger` registers itself as the reference element instead of the floating one, so focus returns to the trigger when the drawer closes
- a876533: - Flags: every rendered flag gets its own ids for masks, gradients and filters. Before, two copies of one flag shared ids, so a copy inside a hidden list made the visible one lose its gradients and filters in Chromium and Firefox
  - `Badge` no longer declares the unused `--badge-padding-inline`
  - `FieldsetLegend` and `FieldsetHeader` JSDoc: put the legend first in `Fieldset`, not inside `FieldsetHeader`, so it names the group
  - JSDoc for `Progress.indeterminate`, `SliderTrack.ref`, `SliderRange.ref` and `Slot.children`
- 5603707: Changed badge colors to WCAG
- b9abf4a: **`Grid` click after a drag.** A drag selection that ended outside the grid left it waiting for the click that ends a drag, so the next click on a cell without a press, like one from a screen reader, did not select it. The grid now swallows only the click in the same task as the release, through a zero timer `DRAGGED` of the `selection` fragment.
- a876533: Grid isolates its stacking context, so the GridItem range highlight is no longer hidden behind the background of a wrapping element.
- a876533: - `Icon` sizes the SVG by `width` and `height`. Before, they were dropped and only turned off the size token
  - `Slot` with a text or a list of children throws its own `` [Slot] `asChild` must be a valid React-element. `` instead of the React `Children.only` error
  - `VisuallyHidden` accepts every `<div>` attribute in its types, such as `id` and `aria-live`
  - `Text` with `fontWeight={600}` renders semi-bold. Before, the value was allowed by the types but had no style
- a876533: An image root that loaded or failed before its widget connected, for example during server-side rendering before hydration, is now reported to the widget. `AvatarImage` rendered on the server shows its photo after hydration, or its `fallbackSrc` if the photo failed, instead of staying hidden.
- b9abf4a: **Removed active option and disabled selected cells.** When the active option of a `Listbox` or `Select` is removed or disabled, the next enabled option becomes active, or the previous one when it was the last, instead of no option, so the keyboard continues from the same place. A `Grid`, `DayPicker`, `MonthPicker` or `YearPicker` range from `resolveRange` leaves out the disabled cells, as the range across rendered cells already did. Like a native `select` that loses its selected option, neither calls `onChangeActive` or `onChangeValue`.
- b9abf4a: **Keyboard click after a touch drag.** After a touch drag of a `Sheet` or `Drawer` that the browser ended without a click, the next click inside it was swallowed even when it came from the keyboard or a screen reader, so Enter on the close button did nothing once. The adapter now swallows only a click made by the pointer.
- 5170410: `Checkbox`, `Switch` and `SegmentedControlItem` props extend `LabelHTMLAttributes<HTMLLabelElement>`, so label attributes such as `htmlFor` and `form` are typed.
- 03bf865: Size, variant and appearance types (`ButtonSize`, `TextFieldSize`, `BadgeVariant`, `HeadingSize` and the rest) suggest their known values in the editor again. They were unions with `string` or `number`, which TypeScript collapses into a plain `string` or `number`; they now end with `(string & {})` or `(number & {})`, so any other value is still accepted.
- a876533: A read-only field no longer changes from the keyboard, the wheel or its buttons, like a native `readonly` input: ArrowUp and ArrowDown do not step `TimeField`, `DateTimeField` and `NumberField`, the wheel does not step `NumberField` and its − / + buttons are disabled, and a country picked in `PhoneFieldSelect` for a read-only `PhoneFieldInput` changes only the country, not the number.
- a876533: A date or time field forgets a picked value its controlling parent turned down once the focus leaves. Before, if the parent later set the same value itself, the field dispatched `input` and `change` as if the user had picked it and marked itself as edited by the user, so `:user-invalid` styles could show up.
- 02aec39: `MeterTrack` fills relative to `min` and `max` like the native `<meter>`, and the fill is clamped to the range. Previously `min` was ignored and values outside the range overflowed. The `max` JSDoc now states the actual default of `1`.
- a876533: A `<textarea>` or a `contenteditable` element inside a component keeps ArrowUp, ArrowDown, PageUp, PageDown and Enter, so the caret moves between lines and Enter starts a new line. Before, a `Grid`, `Listbox` or another component with keyboard navigation took these keys and moved its own focus instead.
- 0d7649f: `NumberField` follows `<input type="number">`:

  - stepping keeps the decimals of the value and of `step`: `0.7` + `0.1` gives `0.8` (before, the mask cut `0.7999999999999999` to `0.79`)
  - the wheel steps the value only when the input is focused and under the pointer; over an unfocused field it no longer blocks the page scroll
  - a root `onKeyDown` runs after the built-in arrow keys instead of replacing them

  `@vega-ui/utils`:

  - new `addWithPrecision(value, delta)`, a sum rounded to the decimals of its operands
  - new `countDecimals(value)`, the decimals of a number, also in exponent notation (`1.5e-7` → 8)
  - `snapToStep` keeps the precision of steps written in exponent notation (`step={1e-7}` no longer rounds to integers)

- c4672d5: Backdrop, PopoverContent and SelectListbox use the `--z-index-overlay` / `--z-index-popover` tokens instead of a hardcoded `z-index: 1`, so popovers and listboxes open above dialogs, drawers and sheets. The backdrop fade now uses `--transition-state-delay`, matching the overlay unmount timing so the fade-out is no longer cut off.
- a876533: A click on a `PageControlItem` leaves the focus to the browser, like on a native button: a dot clicked after the arrow keys no longer keeps the focus ring, and Safari no longer focuses a clicked dot, as it does not focus a clicked button.
- 6f1f6f2: PageControlProgress cancels its progress animation frame when the item stops being active or unmounts, so stale loops no longer overwrite its progress value.
- b9abf4a: **`PageControl` tab stop.** A page control without an active page, with an active page outside its items, or with a disabled active page had no page in the Tab order, so the keyboard could not reach it. The first enabled page now takes the tab stop in those cases; the active page still keeps it otherwise.
- a876533: A form reset brings back the calling code of the default country in a strict `PhoneField`, as the field shows it when it mounts; the field used to stay empty until the user typed.
- a876533: `onChange` of `PinFieldInput` fires on every edit of a controlled `PinField`. Before, the input took each new controlled value as its default value, and React stopped calling `onChange` for it.
- a876533: A `PinField` with a controlled `value` no longer marks a slot active without the focus when the parent sets a code it rejected earlier, after the field lost the focus.
- 2cb6801: **Closing `Popover` in Chrome.** The content stays mounted from the moment the popover opens until its closing animation ends. Before, it unmounted for a frame between the hide and the browser's `toggle` event and then came back for the fade, so a popover closed by picking a date, Escape or a click outside seemed to hide twice. This affected every field with a calendar popover.
- 7ce2cf5: `Popover` passes the HTML attributes allowed by its props, such as `id`, `style` and `data-*`, to its root element instead of dropping them
- a876533: `data-status` on `PopoverContent` tells whether the popover is shown. Before, it followed `open`, so a controlled popover the browser closed by an outside click or `Escape` kept `data-status="open"` while hidden, and styles keyed on `data-status="close"` did not apply.
- b9abf4a: **A prevented pointer move.** `event.preventDefault()` in an `onPointerMove` handler did not stop the drag of a `Sheet`, `Drawer`, `Slider` or a `Grid` selection for that move, unlike the other events, where the user's handler runs first and a prevented event skips the widget. A prevented move is now left out of the drag; the release still ends it. A wheel stays out of reach: React attaches `onWheel` as a passive listener, so a widget cannot see its `preventDefault()`.
- a876533: - `Progress`: the fill starts at `min` instead of zero, so `min={50} max={150} value={100}` fills half of the track. New CSS variable `--progress-min`
  - `MeterStack`: segments are measured against `max - min`, and the `max` description now says its default is 1. New CSS variable `--meter-stack-min`
  - `YearPicker` scroller and the years view of `Calendar`: Ctrl+Home and Ctrl+End go to the first and last year of the visible page
  - `NumberFieldInput` has `role="spinbutton"` and `aria-valuenow`; `aria-valuemin` and `aria-valuemax` appear only when `min` and `max` are set. Queries by `role="textbox"` in your tests now need `spinbutton`
  - `NumberField`: PageUp and PageDown change the value by ten steps; Home and End go to `min` and `max` when they are set and stay native otherwise
  - `PageControl`: ArrowRight on the last item moves to the first one and ArrowLeft on the first item moves to the last one, as in the WAI-ARIA tabs pattern
- a89803a: Enable `react-hooks` lint rules repo-wide; fix all stale-closure findings; add `useEventCallback`

  `eslint-plugin-react-hooks` was installed but none of its rules were enabled — the class of bugs behind the recent Slider and Calendar stale closures was invisible to CI. `rules-of-hooks` and `exhaustive-deps` now run as errors (with `rules-of-hooks` off for Storybook CSF `render` functions, which are false positives).

  - new `@vega-ui/hooks` export: `useEventCallback` — a stable-identity wrapper that always calls the latest handler (the industry "latest ref" pattern à la MUI/Radix/Floating UI), throws in development if called during render
  - `Calendar`: `onSelectDay` no longer freezes the first `onChange` — it reads the latest callback through `useEventCallback` while keeping a stable identity (regression-tested by swapping `onChange` between renders)
  - `NumberField`: `decrement` no longer clamps against a stale `max`; the native non-passive `wheel` listener is attached only while `changeOnWheel` is enabled and no longer resubscribes when `min`/`max`/`step` or the value change
  - `Collapsible`: `onChangeHidden` fires only when `hidden` actually changes — an inline callback no longer re-triggers the notification effect on every parent render
  - all remaining findings were stable-value dependencies added for free, plus three documented intentional suppressions (`useMutationObserver` per-field options deps, `createContext` shallow-by-value memoization, `SnapScrollerContent` unmount-only unregistration)

- b9abf4a: **Readable type parameters.** Generic types and functions name their type parameters in words (`Key`, `State`, `Value`, `SelectionMode`, `Multiple`) instead of single letters, so editor hints and the API tables read as `CalendarValue<SelectionMode>` instead of `CalendarValue<S>`. Nothing else changes.
- 2d877ef: Respect `prefers-reduced-motion` in SnapScroller, Calendar, SegmentedControl, PageControl and Collapsible: scrolling jumps, sliding and resizing are instant, and PageControlProgress fades in over its duration, so `animationend` still fires.
- a876533: A component no longer keeps what it rendered for items that left its collection. Before, a `Listbox`, `Select` or `Combobox` whose options kept changing, or a `Calendar` paged through many months, held on to every item it had ever rendered until it unmounted.
- a876533: Right-to-left layouts mirror where they did not; left-to-right looks the same as before.

  - `Table` without `edgePadded`: the first and the last cells drop the padding at the start and the end of the row instead of the physical left and right
  - `AccordionTrigger` aligns its text to the start instead of the left
  - `MeterStackSegment`: the last segment rounds its end corners instead of the right ones
  - `AvatarStack`: the cut-out of each avatar faces the previous avatar in right-to-left too

- 6bf061e: **Closing `Select` list in Firefox and Safari.** The list hides at once when it closes in a browser without the CSS `overlay` property. Before, it stayed on screen for the fade after it left the top layer, positioned against another ancestor, so it jumped and seemed to open again.

  **JSDoc.** `PageControlProgress` no longer promises a completion callback: the native `onAnimationEnd` fires once the fill completes. `Calendar` and the date field calendars state the defaults of `selection` and `defaultView` with `@default`, `Icon` no longer calls `children` required, and `Accordion.defaultOpened` has its code span closed.

- df7c7be: `Select` without `defaultValue` starts with no selection instead of `''`, so an option with `value=''` is no longer selected by default and a numeric `Select` no longer holds a string. `defaultValue=''` still shows the placeholder.
- a876533: `Select` hides its open list when it becomes `disabled` or `readOnly`, like a native `<select>`, and keeps following the browser while disabled. Before, the list stayed open, a close by the browser was ignored so `onChangeOpen(false)` never came, and the list opened again by itself once the select was enabled.
- 3b2445b: Fix Select typeahead skipping options with falsy values

  `onMatch` (typeahead selection while the listbox is closed) guarded the matched value with `if (!value) return`, so options whose value is `0` or an empty string could be highlighted but never actually selected — common with numeric IDs. The guard now checks for `undefined` (a missing map entry) only. Covered with a regression test that selects a `value={0}` option by typing.

- fa3d436: Fix a Select list that kept opening above the trigger in Chrome and Safari after it had once flipped up for lack of space below. The closed list is now `display: none`, so the browser picks the side again on every opening, and the opening and closing animations stay as they were.
- 70c9eb0: Fix a Select listbox inside a Dialog that could open off-screen because its position was measured before it entered the top layer.
- a876533: - `Select`: Alt+ArrowUp selects the active option before it closes the list, as the select-only combobox pattern says. Before, it only closed the list
  - `SegmentedControlItem` with `disabled` disables its input too, so the item can no longer be selected. Before, only `data-disabled` was set
  - `PageControlItem` keeps its own `size` over the `size` of `PageControl`
  - `PinFieldSlot` shows `•` for each entered character while `PinFieldInput` has `type='password'`
- b9abf4a: **Shift + arrows after the parent changed the selection.** In a multiple `Grid` or `Listbox`, a Shift + arrow after the parent wrote a new value continued the previous extension and dropped the new value: with `[a, b]` extended by Shift + →, a parent value `['g', 'h']` and one more Shift + → gave `[a, b, c]`. The extension now continues only while the value is the one it produced, so the same keys give `[g, h, b, c]`.
- b9abf4a: **Extending a large multiple selection.** Shift + arrows, Shift + Home / End and a drag in a `Listbox` with `multiple` or a multiple `Grid` took time that grew with the square of the selected options: Shift + Mod + Home with 10 000 options selected took about 6 s. The `selection` fragment now looks selected keys up in a set, so the same step takes a few milliseconds.
- a876533: Picking what is already selected no longer calls `onChangeValue`, like a native `<select>`. Before, `Listbox`, `Select` and `Combobox` reported the same value again when an already selected option was pressed in single or range mode, or when Mod+A was pressed with every option already selected.
- c7fea40: `Separator` sets `aria-orientation`, so a vertical separator is announced as vertical.
- a876533: - `mergeProps` passes a single `ref` through as is and adds no `ref` when none is given. Before, it always created a merged callback ref, so server components such as `Icon`, `Code` and any `asChild` part failed in React Server Components with "Refs cannot be used in Server Components"
  - `AvatarStackItem` cuts its overlap with a plain circle mask, so the avatars after the first show in Safari again. Chromium and Firefox render the same pixels as before
  - `AccordionIcon` no longer shrinks to zero width next to a long title
- db3c63f: `Sheet` animates its release, opening and closing through its registered `--sheet-*` variables instead of `transform` and `clip-path`, so the clip, the surface and the position stay in sync, and the bottom edge no longer jerks at snap points. The sheet no longer widens while it opens. `--sheet-inset` and `--sheet-background` must now be set on `SheetContent` itself: a value from an ancestor no longer reaches them
- cd1589b: Remove the stray JSDoc block above `dismissible` of `Sheet` and document its `true` default
- 0efc57b: Overlay parts of `Dialog`, `Drawer`, `Popover`, `Select`, `Sheet` and `Tooltip` no longer detach and attach a passed `ref` on every render. Make `Sheet` drag run without React renders on its moves, layout or style recalculation of its content. `--sheet-offset`, `--sheet-expansion` and `--sheet-clip` are no longer inherited by the children of `SheetContent`. `blurred` on `SheetContent` now defaults to `false`, like a native iOS sheet. The surface of the sheet is now a separate layer: set its color with `--sheet-background` instead of `background`. `::after` of `SheetContent` is now taken. The content of `SheetContent` keeps its width between snap points, with `--sheet-inset` added to its side padding. The sheet follows the pointer exactly, stops under a press while it settles, and with `steppedSnapPoints` resists a drag past the next snap point. It settles on a curve without overshoot, and stops below the top safe area. A light flick no longer closes the sheet: momentum counts less towards closing than towards a snap point. The sheet closes over the same duration as it opens, and after a drag it continues at the speed of the pointer. Snap points that share an offset report the last index, and a drag back to the active offset keeps the active snap point
- a876533: A `Sheet` with a controlled `open` reopens at its lowest snap point, or at `defaultSnapPoint`, like an uncontrolled one; it used to reopen at the snap point it was closed at.
- b9abf4a: An open `Sheet` moves to the new offset of its snap point when the parent changes `snapPoints`, instead of keeping the old offset until the next measure or drag.
- 83b8a95: Size types match the styles:

  - `OptionSize` includes `xs` and `xl`, which `Option` already styles and `Select` passes down
  - `PageControlSize`, `TextSize` and `CalendarVariant` suggest their values and accept a custom one, like the other components
  - the glossary documents the size scales: named sizes for controls and containers, numeric font steps for `Heading`, `Text` and `Spinner`

- b5afed6: Changed badge ghost colors
- 065975a: `Slider` no longer calls `Array.prototype.at`, so it works in browsers without it (Safari before 15.4)
- 7609961: `SnapScroller` creates its `apiRef` once instead of on every render, so a callback `apiRef` is no longer detached and attached again on each render.
- b9abf4a: **`SnapScroller` step toward a page it cannot reach.** When `next()` or `prev()` asked for a page the browser cannot scroll to, like one of the last pages of a scroller wider than them, the scroller kept that page as its goal: the next step counted from it and `onSnapChanging` stayed silent for the pages the user scrolled to. A goal past the end of the scroll is now dropped once the scroll ends.
- a876533: `SnapScroller`, `IndexedSnapScroller` and the scrollers of `Calendar`, `DayPicker` and `YearPicker` keep paging when the text direction changes while they are shown, for example when the page switches to Arabic or Hebrew. Before, `next()`, `prev()` and the step buttons did nothing until the scroller was resized.
- a876533: `IndexedSnapScroller` reaches the page of several quick `prev()` or `next()` calls that step past its window; it used to stay on the page it started from once the new pages rendered.
- d7a7658: Table, Calendar, DayPicker, YearPicker, AvatarStack and Switch use `--spacing-*` tokens instead of hardcoded pixel spacing, so they follow a customized `--spacing` scale. No visual change with the default tokens.
- 16303cb: `Spinner` has `role="progressbar"` without a value, like a native `<progress>` without `value`, so screen readers announce it as a busy indicator. Name it with `aria-label` or `aria-labelledby`; set `aria-hidden` when it only decorates something that already announces the loading state.
- a876533: `DateField`, `DateTimeField`, `DateRangeField` and `TimeField` complete a one-digit segment with a leading zero when a separator follows it, typed, pasted or filled in by the browser: `1.2.2026` becomes `01.02.2026` and `9:30` becomes `09:30`, as in a native input. The separator used to be dropped, so the digits after it slid into the segment and the text turned into another date or time, like `12.13.26` or `23:0`.
- 3e998c5: `--text-color-inverce` is renamed to `--text-color-inverse`.

  Breaking: themes that set `--text-color-inverce` must set `--text-color-inverse` instead.

- a876533: An error thrown in an `onChangeX` callback no longer leaves the component out of sync. The error goes to the `onError` of the widget, never to the console, and the component still updates, calls the other change callbacks and finishes handling the event. Before, it kept the new value without rendering it, skipped the remaining callbacks, and did not focus, scroll or prevent the browser default.
- b9abf4a: **Escape before a `Tooltip` opens.** Escape pressed on a hovered trigger while the tooltip waited for `delayOpen` did nothing, and the tooltip opened anyway. It now cancels the pending open and still leaves the key to the browser.
- 93dce53: `TooltipContent` stays mounted until its close transition ends instead of disappearing at once
- d8b4396: `Tooltip` passes the floating styles to its content without copying them on every render
- a876533: A tooltip group shows one tooltip at a time: moving the pointer to the next trigger hides the previous tooltip at once instead of leaving both on screen for `delayClose`. `TooltipGroup.hold` takes an optional `hide` callback for this.
- a876533: `DialogTrigger`, `DrawerTrigger`, `SheetTrigger` and the calendar triggers of `DateField`, `DateTimeField` and `DateRangeField` leave the focus to the browser on click, like a native button. In Safari a mouse click no longer focuses the trigger, so the trigger no longer shows a focus ring after the dialog or calendar closes, and the focus returns to the page body as on any native button there; keyboard activation still returns it to the trigger.
- a876533: **Starting an empty `NumberField`.** Arrow keys and leaving a field that does not allow empty start at `max` when it is below zero. Before, they started at `0`, above `max`.

  **Turned-down text after the focus leaves.** `NumberField` forgets a number its controlling parent turned down once the focus leaves, like the date and time fields. Before, a later value from the parent was written as the rejected text into the unfocused field (`1.50` instead of `1.5`), with a selection.

  **Read-only grids.** `Grid`, `DayPicker`, `MonthPicker` and `YearPicker` drop a disabled cell from an uncontrolled value also when read-only. Before, a read-only grid kept the disabled cell selected.

  **One writing direction.** The arrow keys follow the `dir` attribute of the page or an ancestor, like the styles of the components and the drag of `Drawer` and `SnapScroller` already did. Before, the keys read the CSS `direction` property, so a page with only `direction: rtl` in CSS got arrows that disagreed with the layout of the same component. Set `dir="rtl"`; the CSS property alone is not supported.

  **After a remount.** A `Tooltip` that was open when its effects ran again, as in `StrictMode` or a hidden `<Activity>`, closes on `Escape`; before, it ignored the key. The letters typed into `Listbox` and `Select`, and a tooltip waiting to show or hide, run out as usual after such a remount; before, their timers were lost.

  **`indeterminate` removed.** A `CheckboxInput` whose `indeterminate` prop goes from `true` to unset is no longer indeterminate; before, it stayed so.

  **Sheet snap point after a close.** `onChangeActiveSnapPoint` of an uncontrolled `Sheet` now also fires when the sheet closes and returns to its default snap point, with that index, so the reported value always tells where the sheet opens next. Before, the return went unreported and the last reported index went stale.

  **Deleting a word.** Ctrl+Backspace (Option+Backspace on macOS) and Ctrl+Delete in `PhoneField` and `NumberField` find the word by the Unicode rules a native text field uses. `PhoneField` deletes the last group of digits (`+1 201 555-0123` becomes `+1 201 555`) instead of everything after the last space. The date and time fields keep deleting one segment, like a native date input.

  **Typed letters after the focus leaves an open `Select`.** The letters typed into an open `Select` are forgotten once the focus leaves, as in a closed one and in `Listbox`. Before, a search typed right after the focus came back went on from the old letters.

  **Plain inputs.** `focus.leave` no longer carries the element the focus moved to as `to`, so every input a step or `onDispatch` sees is plain data.

  **Same options, less work.** A widget keeps its state when it gets new options with the same content, so a re-render with unchanged props no longer reruns its checks or notifies its subscribers.

- 6f10f80: - **Breaking:** `setValue` and `dispatchEvents` are removed: the components write the text of their inputs themselves
  - the context of `NumberField` is named `NumberFieldContext` in errors instead of `PhoneFieldContext`
  - `getPending()` and `getCommitted()` of the `SnapScroller` api ref and `index` of the `IndexedSnapScroller` api ref are typed `number | null`: they are `null` until the scroller has measured its items
- Updated dependencies [b9abf4a]
- Updated dependencies [5feb6c9]
- Updated dependencies [b9abf4a]
- Updated dependencies [a876533]
- Updated dependencies [1af9fda]
- Updated dependencies [fa3d436]
- Updated dependencies [d80f57a]
- Updated dependencies [6f10f80]
- Updated dependencies [cef5d19]
- Updated dependencies [7c5e42b]
- Updated dependencies [a876533]
- Updated dependencies [0efc57b]
- Updated dependencies [b9abf4a]
- Updated dependencies [ed90a1c]
- Updated dependencies [b9abf4a]
- Updated dependencies [a876533]
- Updated dependencies [b9abf4a]
- Updated dependencies [3580f9f]
- Updated dependencies [b9abf4a]
- Updated dependencies [33697d3]
- Updated dependencies [af29e8c]
- Updated dependencies [a876533]
- Updated dependencies [0d7649f]
- Updated dependencies [d27ca41]
- Updated dependencies [b9abf4a]
- Updated dependencies [a876533]
- Updated dependencies [2cb6801]
- Updated dependencies [b9abf4a]
- Updated dependencies [a89803a]
- Updated dependencies [b9abf4a]
- Updated dependencies [f7b7849]
- Updated dependencies [a876533]
- Updated dependencies [b9abf4a]
- Updated dependencies [b9abf4a]
- Updated dependencies [a876533]
- Updated dependencies [a876533]
- Updated dependencies [b9abf4a]
- Updated dependencies [cef5d19]
- Updated dependencies [b9abf4a]
- Updated dependencies [2e5cc1b]
- Updated dependencies [b9abf4a]
- Updated dependencies [411e6ad]
- Updated dependencies [f7b7849]
- Updated dependencies [a876533]
- Updated dependencies [f827279]
- Updated dependencies [9dcbb8e]
- Updated dependencies [399fd0d]
- Updated dependencies [ffcf60f]
- Updated dependencies [b9abf4a]
- Updated dependencies [b9abf4a]
- Updated dependencies [b9abf4a]
- Updated dependencies [6f10f80]
- Updated dependencies [4ceaa2e]
- Updated dependencies [a876533]
- Updated dependencies [8b75a64]
- Updated dependencies [6f10f80]
  - @vega-ui/widgets@3.0.0
  - @vega-ui/utils@3.0.0
  - @vega-ui/hooks@3.0.0
  - @vega-ui/i18n@3.0.0
  - @vega-ui/core@3.0.0

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
