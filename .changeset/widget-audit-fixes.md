---
'@vega-ui/core': patch
'@vega-ui/widgets': patch
'@vega-ui/react': patch
---

**Starting an empty `NumberField`.** Arrow keys and leaving a field that does not allow empty start at `max` when it is below zero. Before, they started at `0`, above `max`.

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
