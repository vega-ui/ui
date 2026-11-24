# @vega-ui/widgets

## 3.0.0

### Minor Changes

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

- 33697d3: New `Menu`: a list of actions or options that a menu button shows, following the WAI-ARIA menu button and menu patterns.

  - `Menu` holds whether the menu is shown in `open`, `defaultOpen` and `onChangeOpen`, and takes a `placement` and a `size` (`xs`, `sm`, `md`, `lg` or `xl`, as in Select and Listbox). It renders no element of its own.
  - `MenuTrigger` is the `<button aria-haspopup="menu">` with `aria-expanded` and `aria-controls`, or your own element with `asChild`. A click, Enter or Space shows the menu with the focus on its first item; the Down arrow shows it on the first item and the Up arrow on the last one.
  - `MenuContent` is the `role="menu"` popover in the top layer, anchored to the trigger with CSS anchor positioning and named by the trigger unless you pass `aria-label` or `aria-labelledby`. The focus moves on the items themselves: the Up and Down arrows wrap around the ends, Home and End jump to the first and last item, typing moves to the next item whose label starts with the typed text, and the item under the pointer takes the focus. Escape and Shift+Tab close the menu with the focus back on the trigger, Tab closes it and moves on, and a click outside closes it.
  - `MenuItem` is a `<button role="menuitem">`, or an `<a>` that navigates with `asChild`. A click, Enter or Space runs its `onClick`, closes the menu and gives the focus back to the trigger; `preventDefault` in `onClick` keeps the menu open. `disabled` sets `aria-disabled`, so the item stays focusable as the pattern asks but never runs.
  - `MenuCheckboxItem` (`menuitemcheckbox`) holds `checked`, `defaultChecked` and `onChangeChecked`; `MenuRadioGroup` holds the `value`, `defaultValue` and `onChangeValue` of its `MenuRadioItem` (`menuitemradio`). A click, Enter or Space checks the item and keeps the menu open, for view options a user toggles one after another; `keepOpen={false}` makes a click and Enter close the menu as on a plain item. `MenuItemIndicator` holds the check mark you pass as its children: it keeps its place in every item and shows only in a checked one.
  - `MenuGroup` is a `role="group"` for related items; `Separator` divides the groups.
  - `@vega-ui/widgets/menu` is the framework-free widget behind it, with `menuCheckboxWidget` and `menuRadioGroupWidget` for the checked state.
  - `MenuSubmenu` and `MenuSubmenuTrigger` nest a submenu inside a `MenuContent`, to any depth. `MenuSubmenuTrigger` is a `menuitem` with `aria-haspopup="menu"`, `aria-expanded` and `aria-controls` that names its submenu; the submenu opens beside it, at the end of the line in the writing direction. Enter, Space, the arrow toward the submenu or a click open it with the focus on its first item, and the pointer resting on the item opens it without moving the focus. Escape and the arrow away from it close only the submenu with the focus back on its item; an item of a submenu that runs closes every menu and gives the focus back to the menu button. While the pointer heads from the item toward the open submenu, the items it crosses do not take the focus, so the submenu stays open. `@vega-ui/widgets/menu` adds `submenuWidget`

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

- 8b75a64: New package `@vega-ui/widgets` holds the widgets that `@vega-ui/react` components run on: the state, steps and output of each component on `@vega-ui/core`, with no dependency on React or the DOM, so an adapter for another framework can reuse them and a test can run them in node.

  - One entry point per widget and no root import: `@vega-ui/widgets/select`, `@vega-ui/widgets/date-range-field`, and the shared widgets `grid`, `listbox`, `dates` (the day, month and year pickers), `modal-dialog` and `snap-scroller`. An entry point exports everything an adapter needs to drive its widget, like the `PICK_VALUE` command of a date field; the helpers the widgets share, like the masks and the drag, are not an entry point
  - The package is `0.x`: the shape of a widget can change in a minor release

### Patch Changes

- b9abf4a: `Listbox` and `Select` set `aria-activedescendant` only to an option that exists, so a controlled `active` the items lack no longer points assistive technology at a missing id.
- b9abf4a: **A list or sheet the browser closed stays closed.** When the browser closed the list of a controlled `Select` (outside click, `Escape`) or a controlled `Sheet`, `Drawer` or `Dialog`, and the parent kept `open` true, a change of another prop, like the `value` of the `Select` or the `activeSnapPoint` of the `Sheet`, showed it again. It now shows again only when `open` changes, as the docs say, or, for a `Select`, when it becomes enabled.
- b9abf4a: **`Grid` click after a drag.** A drag selection that ended outside the grid left it waiting for the click that ends a drag, so the next click on a cell without a press, like one from a screen reader, did not select it. The grid now swallows only the click in the same task as the release, through a zero timer `DRAGGED` of the `selection` fragment.
- b9abf4a: **Removed active option and disabled selected cells.** When the active option of a `Listbox` or `Select` is removed or disabled, the next enabled option becomes active, or the previous one when it was the last, instead of no option, so the keyboard continues from the same place. A `Grid`, `DayPicker`, `MonthPicker` or `YearPicker` range from `resolveRange` leaves out the disabled cells, as the range across rendered cells already did. Like a native `select` that loses its selected option, neither calls `onChangeActive` or `onChangeValue`.
- b9abf4a: **`PageControl` tab stop.** A page control without an active page, with an active page outside its items, or with a disabled active page had no page in the Tab order, so the keyboard could not reach it. The first enabled page now takes the tab stop in those cases; the active page still keeps it otherwise.
- 2cb6801: **Closing `Popover` in Chrome.** The content stays mounted from the moment the popover opens until its closing animation ends. Before, it unmounted for a frame between the hide and the browser's `toggle` event and then came back for the fade, so a popover closed by picking a date, Escape or a click outside seemed to hide twice. This affected every field with a calendar popover.
- b9abf4a: **Readable type parameters.** Generic types and functions name their type parameters in words (`Key`, `State`, `Value`, `SelectionMode`, `Multiple`) instead of single letters, so editor hints and the API tables read as `CalendarValue<SelectionMode>` instead of `CalendarValue<S>`. Nothing else changes.
- b9abf4a: **Shift + arrows after the parent changed the selection.** In a multiple `Grid` or `Listbox`, a Shift + arrow after the parent wrote a new value continued the previous extension and dropped the new value: with `[a, b]` extended by Shift + →, a parent value `['g', 'h']` and one more Shift + → gave `[a, b, c]`. The extension now continues only while the value is the one it produced, so the same keys give `[g, h, b, c]`.
- b9abf4a: **Extending a large multiple selection.** Shift + arrows, Shift + Home / End and a drag in a `Listbox` with `multiple` or a multiple `Grid` took time that grew with the square of the selected options: Shift + Mod + Home with 10 000 options selected took about 6 s. The `selection` fragment now looks selected keys up in a set, so the same step takes a few milliseconds.
- b9abf4a: An open `Sheet` moves to the new offset of its snap point when the parent changes `snapPoints`, instead of keeping the old offset until the next measure or drag.
- b9abf4a: **`SnapScroller` step toward a page it cannot reach.** When `next()` or `prev()` asked for a page the browser cannot scroll to, like one of the last pages of a scroller wider than them, the scroller kept that page as its goal: the next step counted from it and `onSnapChanging` stayed silent for the pages the user scrolled to. A goal past the end of the scroll is now dropped once the scroll ends.
- b9abf4a: **Escape before a `Tooltip` opens.** Escape pressed on a hovered trigger while the tooltip waited for `delayOpen` did nothing, and the tooltip opened anyway. It now cancels the pending open and still leaves the key to the browser.
- b9abf4a: `command<Payload>()(name)` declares the payload a command carries: `createInput` refuses another one, and `input.is(command)` types the payload for the step, so `input.to` of `SELECT_COUNTRY` is a `PhoneCountry` without a cast. `SELECT_COUNTRY`, `SNAP_TO`, `SNAP_INDEX` and the `PICK_VALUE` of `date-field`, `date-time-field` and `date-range-field`, now each typed by its own value, carry their payload types.
- b9abf4a: `state({ parts })` names the parts of a widget, so an action on a part it does not declare, like `act.showPopover('listbx')`, is a type error instead of an action that waits for that part forever. `Action`, `Result` and `Step` take the part names from the snapshot, `act` keeps the literal part name, and a shape without `parts` takes any name as before. The widgets declare their parts.
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

- Updated dependencies [5feb6c9]
- Updated dependencies [a876533]
- Updated dependencies [1af9fda]
- Updated dependencies [fa3d436]
- Updated dependencies [6f10f80]
- Updated dependencies [cef5d19]
- Updated dependencies [7c5e42b]
- Updated dependencies [a876533]
- Updated dependencies [b9abf4a]
- Updated dependencies [ed90a1c]
- Updated dependencies [b9abf4a]
- Updated dependencies [a876533]
- Updated dependencies [3580f9f]
- Updated dependencies [b9abf4a]
- Updated dependencies [af29e8c]
- Updated dependencies [a876533]
- Updated dependencies [0d7649f]
- Updated dependencies [d27ca41]
- Updated dependencies [a876533]
- Updated dependencies [b9abf4a]
- Updated dependencies [b9abf4a]
- Updated dependencies [f7b7849]
- Updated dependencies [a876533]
- Updated dependencies [b9abf4a]
- Updated dependencies [b9abf4a]
- Updated dependencies [a876533]
- Updated dependencies [a876533]
- Updated dependencies [cef5d19]
- Updated dependencies [b9abf4a]
- Updated dependencies [f7b7849]
- Updated dependencies [a876533]
- Updated dependencies [f827279]
- Updated dependencies [9dcbb8e]
- Updated dependencies [399fd0d]
- Updated dependencies [b9abf4a]
- Updated dependencies [b9abf4a]
- Updated dependencies [4ceaa2e]
- Updated dependencies [a876533]
- Updated dependencies [6f10f80]
  - @vega-ui/utils@3.0.0
  - @vega-ui/i18n@3.0.0
  - @vega-ui/core@3.0.0
