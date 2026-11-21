# @vega-ui/hooks

## 3.0.0

### Major Changes

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

- f7b7849: Remove exports the components no longer use:

  - **Breaking:** `@vega-ui/hooks` no longer exports `useControlledState`, `useLatest`, `useRefMap`, `useMap`, `useBiMap`, `useResizeObserver` and `useMutationObserver`; use a `Map`, a `ResizeObserver` or a `MutationObserver` of your own
  - **Breaking:** `@vega-ui/utils` no longer exports `inRange`, `safeSetPointerCapture` and `BiMap`

- 6f10f80: - **Breaking:** `useIsomorphicLayoutEffect` is removed; use `useLayoutEffect`, which React 19 runs without a warning on the server.

### Minor Changes

- 0efc57b: Add `useMergeRefs`, which merges refs into one that keeps its identity until one of them changes
- a89803a: Enable `react-hooks` lint rules repo-wide; fix all stale-closure findings; add `useEventCallback`

  `eslint-plugin-react-hooks` was installed but none of its rules were enabled — the class of bugs behind the recent Slider and Calendar stale closures was invisible to CI. `rules-of-hooks` and `exhaustive-deps` now run as errors (with `rules-of-hooks` off for Storybook CSF `render` functions, which are false positives).

  - new `@vega-ui/hooks` export: `useEventCallback` — a stable-identity wrapper that always calls the latest handler (the industry "latest ref" pattern à la MUI/Radix/Floating UI), throws in development if called during render
  - `Calendar`: `onSelectDay` no longer freezes the first `onChange` — it reads the latest callback through `useEventCallback` while keeping a stable identity (regression-tested by swapping `onChange` between renders)
  - `NumberField`: `decrement` no longer clamps against a stale `max`; the native non-passive `wheel` listener is attached only while `changeOnWheel` is enabled and no longer resubscribes when `min`/`max`/`step` or the value change
  - `Collapsible`: `onChangeHidden` fires only when `hidden` actually changes — an inline callback no longer re-triggers the notification effect on every parent render
  - all remaining findings were stable-value dependencies added for free, plus three documented intentional suppressions (`useMutationObserver` per-field options deps, `createContext` shallow-by-value memoization, `SnapScrollerContent` unmount-only unregistration)

### Patch Changes

- 3580f9f: Mark the packages as free of side effects so bundlers like webpack can drop unused modules
- b9abf4a: **Readable type parameters.** Generic types and functions name their type parameters in words (`Key`, `State`, `Value`, `SelectionMode`, `Multiple`) instead of single letters, so editor hints and the API tables read as `CalendarValue<SelectionMode>` instead of `CalendarValue<S>`. Nothing else changes.
- 2e5cc1b: Fixed disabled compare
- Updated dependencies [5feb6c9]
- Updated dependencies [a876533]
- Updated dependencies [1af9fda]
- Updated dependencies [6f10f80]
- Updated dependencies [7c5e42b]
- Updated dependencies [ed90a1c]
- Updated dependencies [3580f9f]
- Updated dependencies [af29e8c]
- Updated dependencies [0d7649f]
- Updated dependencies [d27ca41]
- Updated dependencies [b9abf4a]
- Updated dependencies [f7b7849]
- Updated dependencies [a876533]
- Updated dependencies [f7b7849]
- Updated dependencies [f827279]
- Updated dependencies [399fd0d]
- Updated dependencies [6f10f80]
  - @vega-ui/utils@3.0.0

## 2.5.0

### Patch Changes

- 1007aae: Fix broken `main` field in hooks, utils and react-context

  In `@vega-ui/hooks`, `@vega-ui/utils` and `@vega-ui/react-context` the `main` field pointed to `./dist/index.ts` — a file that doesn't exist in `dist/` (the build only outputs `.js` and `.d.ts`). Modern bundlers masked the problem by resolving through the `exports` map, but environments that rely on `main` (Node without conditional exports support, Jest with legacy resolution, ts-node, CDNs like esm.sh) got `MODULE_NOT_FOUND` or tried to parse TypeScript as JS.

  Changes:

  - `main` now points to `./dist/index.js`
  - added `module: "./dist/index.js"` (consistent with `@vega-ui/react`)
  - added the missing top-level `types: "./dist/index.d.ts"` to utils and react-context so resolvers that don't support `exports` can find the type declarations

- 9834a4c: Remove React from `dependencies`, keep it only in `peerDependencies`

  `react` (and `react-dom` in `@vega-ui/react`) were declared in both `dependencies` and `peerDependencies`. With strict resolution (Yarn PnP, pnpm with `shamefully-hoist=false`, strict npm) consumers ended up with two copies of React — `Invalid hook call`, contexts not matching, rendering breaking with no clear error.

  Changes:

  - removed `react`/`react-dom` from `dependencies` in `@vega-ui/react`, `@vega-ui/hooks` and `@vega-ui/icons`; they stay in `peerDependencies` and were added to `devDependencies` for local development
  - `vite.config.ts` of `@vega-ui/react` and `@vega-ui/hooks` derived rollup `external` from `Object.keys(dependencies)` only, so React would have been bundled into `dist` after this change — externals now include `peerDependencies` as well

- 5ebae4b: Fix inverted `useIsomorphicLayoutEffect`

  The ternary picked `useLayoutEffect` on the server and `useEffect` in the browser — exactly backwards. On SSR this triggered React's "useLayoutEffect does nothing on the server" warning; in the browser, everything built on the hook (`useLatest`, and through it layout measurements in `useResize`/`useScrollSnap` consumers) ran after paint instead of before it, allowing a frame of stale layout.

  Also renamed the file to fix the typo: `useIsomophicLayoutEffect.ts` → `useIsomorphicLayoutEffect.ts` (internal only — the exported name was always spelled correctly).

- c652925: Fix crash paths and null/undefined confusion in `useScrollSnap`

  `getPointed()` returns `undefined` when the scroller ref is not attached, but `measure()` dereferenced its result unconditionally (TypeError on mount when the scroller renders later, or when calling the public `measure()` too early), and `commit()` destructured it unconditionally (TypeError when the scroller leaves the DOM while a debounced commit is pending). With an empty scroller (no registered items) `onSnapChange`/`onSnapChanging` fired with `(undefined, undefined)` despite their `(el: HTMLElement, key: K)` signatures, and the `key !== null` guard in `commit` never worked because `key` was `K | undefined`, never `null`.

  Now: `getPointed` normalizes misses to `null` and all callers guard against an absent scroller; snap callbacks only fire with a real element and key; `measure()` skips items whose snap point cannot be computed instead of storing `undefined` in the points map; `scrollToElement` no longer looks up points with an `undefined` key.

- 0ffc52f: `useSelection`: optional `compare` no longer crashes; new `compare` util

  `compare?` was declared optional but invoked unconditionally in `edges`, `isSelected` and `isDisabled` — range selection or `min`/`max` clamping without a user-provided comparator threw `compare is not a function` (while `expand` had a guard, confirming the option was meant to be optional).

  - `@vega-ui/utils` now exports `compare` — a three-way comparator constrained to the new `Comparable` type (`number | string | bigint | Date`), so types with no universal ordering (objects, symbols) are rejected at compile time; covered with unit tests
  - `useSelection` falls back to it when no `compare` is passed, mirroring the existing `equals ?? Object.is` pattern; pass an explicit `compare` for non-primitive key types
  - `expand` no longer silently no-ops without a user comparator
  - empty or `undefined` `selected` no longer produces `undefined` range edges: `edges()` returns `[]`, `isSelected` returns `false` instead of comparing `undefined`
  - `DataGridSelectable` reuses the shared `compare` instead of its own inline duplicate of the same fallback (no behavior change)

- Updated dependencies [1007aae]
- Updated dependencies [55a8c44]
- Updated dependencies [0ffc52f]
  - @vega-ui/utils@2.5.0

## 2.4.0

### Patch Changes

- @vega-ui/utils@2.4.0

## 2.3.1

### Patch Changes

- @vega-ui/utils@2.3.1

## 2.3.0

### Patch Changes

- @vega-ui/utils@2.3.0

## 2.2.1

### Patch Changes

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

- Updated dependencies [798d27c]
  - @vega-ui/utils@2.2.0

## 2.1.1

### Patch Changes

- 60ef267: Removed unused hook - useMediaQuery
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
  - @vega-ui/utils@2.1.0

## 2.0.1

### Patch Changes

- @vega-ui/utils@2.0.1

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

- e0a38ab: The SegmentedControl component has become more composable: the SegmentedControlItemHiddenInput and SegmentedControlIndicator have been added.
- eab55a8: The responsive-ui package is no longer supported due to inconsistencies in the overall component design approach

  The components that the responsive ui package contained are easily implemented using the composition of existing ones and do not require the support and development of a separate package

### Patch Changes

- 9fcad60: Fixed ts problems
- Updated dependencies [50bc30f]
- Updated dependencies [eab55a8]
  - @vega-ui/utils@2.0.0

## 1.14.3

### Patch Changes

- 7711364: Renamed BaseCalendar to CalendarBase
- Updated dependencies [7711364]
  - @vega-ui/utils@1.14.3

## 1.14.2

### Patch Changes

- 55809c0: Changed deps
- Updated dependencies [55809c0]
  - @vega-ui/utils@1.14.2

## 1.14.1

### Patch Changes

- d76eea5: Deleted unused dependencies
- Updated dependencies [9bb4a3b]
- Updated dependencies [d76eea5]
  - @vega-ui/utils@1.14.1

## 1.14.0

### Minor Changes

- a387fda: Added new calendar primitives:

  - **CalendarBase** — foundational layout and styling provider for all calendar components (size, variant, compact mode).
  - **Calendar** — high-level fully interactive calendar with day/month/year pickers, scroll-based navigation, controlled/uncontrolled selection modes, and full provider-based state management.

  These components form the new core of the calendar system and enable building flexible, Radix-style declarative/imperative calendar interfaces.

### Patch Changes

- Updated dependencies [a387fda]
  - @vega-ui/utils@1.14.0

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
  - @vega-ui/utils@1.13.0

## 1.12.4

## 1.12.3

## 1.12.2

## 1.12.1

### Patch Changes

- 22dea95: A bug was fixed in which it was impossible to expand the selected range on mobile devices and scroll in SnapScroller, as well as minor edits were made: when changing the range to the beginning and end, reset is not triggered.

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

## 1.3.0

## 1.2.2

## 1.2.1

## 1.2.0

## 1.1.1

## 1.1.0

## 1.0.1

### Patch Changes

- fb2ec42: Changed logo
