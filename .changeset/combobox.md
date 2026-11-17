---
'@vega-ui/react': minor
'@vega-ui/widgets': minor
'@vega-ui/core': minor
---

New `Combobox`: a text input with a list of suggestions, following the WAI-ARIA combobox pattern.

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
