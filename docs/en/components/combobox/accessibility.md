# Combobox Accessibility

## Responsibilities

### Built In

- `role="combobox"` on the input with `aria-autocomplete` from the `autocomplete` prop, `aria-expanded` and `aria-controls` pointing to the list
- the active option through `aria-activedescendant` while the focus stays in the input
- `role="listbox"` on the list with `tabIndex={-1}`, so `Tab` never stops in a scrollable list, and `role="option"` with `aria-selected` and `aria-disabled` on the options
- `aria-controls` and `aria-expanded` on `ComboboxTrigger`, which stays out of the tab order
- `autoComplete="off"` on the input, so the browser autofill list does not cover the suggestions
- the keyboard model below, following the WAI-ARIA combobox pattern: list autocomplete with manual selection by default, and inline completion with `both` and `inline`

### Your Part

- an accessible name for the input: a visible `Label` or `aria-label`
- an accessible name for the list: `aria-label` or `aria-labelledby` on `ComboboxListbox`
- an accessible name for `ComboboxTrigger`: `aria-label`, such as "Show cities"
- an `autocomplete` value that matches what the app does with the text: `list` when it filters, `none` when it does not
- filtering the options and telling users when nothing matches, outside the list
- a status message for loading and for the number of results when they come from a server
- the form wiring of the picked value when the server needs it, not only the text

## Labeling

The component never adds a name by itself.

- Name the input with a `Label` pointing to its `id`, or with `aria-label` when there is no visible label.
- Name the list with `aria-label` or `aria-labelledby`, for example "Cities" for a "City" field.
- Name `ComboboxTrigger` with `aria-label`; its icon has no text.
- Name every `ListboxGroup` with `aria-labelledby` pointing to its heading, or with `aria-label`.
- Connect hints, errors and result counts to the input with `aria-describedby`.

The placeholder is not a label: it disappears as soon as the user types.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>a</kbd> | Typing a character opens the list with the options the app renders for the new text. No option is active, and the focus stays in the input. |
| <kbd>a</kbd> | With `autocomplete` set to `both`: typing a character with the caret at the end also writes the label of the first option that starts with the text, selects the part after the typed text and makes that option active. The next character replaces the rest. With `inline` the text is completed the same way, but the list stays closed. |
| <kbd>Backspace</kbd> / <kbd>Delete</kbd> | With completion: removes the selected completed rest without completing again, so the start of the label stays and no option is active. |
| <kbd>↓</kbd> / <kbd>↑</kbd> | On a closed list: opens it and makes the first or last option active. |
| <kbd>Alt</kbd> + <kbd>↓</kbd> | On a closed list: opens it without an active option. A picked option in the list is scrolled into view and keeps `aria-selected`. |
| <kbd>↓</kbd> / <kbd>↑</kbd> | In the open list: moves the active option to the next or previous enabled one and stops at the ends. Without an active option, `ArrowDown` goes to the first one and `ArrowUp` to the last. |
| <kbd>↓</kbd> / <kbd>↑</kbd> | With `autocomplete` set to `both` or `inline`: also writes the label of the reached option into the input when it starts with the typed text, ignoring case, and selects the part after the typed text. Otherwise the text stays. |
| <kbd>Enter</kbd> | Picks the active option: writes its label into the input, calls `onChangeValue` and closes the list. Without an active option, `Enter` is left to the page, so a form submits. With completion, `Enter` picks the completed option, also on a closed list with `inline`. |
| <kbd>Alt</kbd> + <kbd>↑</kbd> | Picks the active option and closes the list. Without an active option it only closes the list. |
| <kbd>Escape</kbd> | Closes the open list and keeps the text; with completion, it puts back the typed text without the completed rest, also on a closed list with `inline`. On a closed list it clears the text and the picked value. With nothing to clear, `Escape` is left to the page, so a dialog around the field closes. |
| <kbd>←</kbd> / <kbd>→</kbd> / <kbd>Home</kbd> / <kbd>End</kbd> / <kbd>Backspace</kbd> / <kbd>Delete</kbd> | Keys the input handles itself return to the text: no option stays active, the list stays open, and the caret moves or the text changes as in any text field. |
| <kbd>Space</kbd> | Types a space like any other character; it never picks an option. |
| <kbd>Tab</kbd> | Closes the list without picking and moves the focus on. The text stays as typed. With completion, the completed option is picked. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

## Focus Behavior

- The focus never leaves the input: the arrow keys move `aria-activedescendant`, and a click on an option picks it while the input keeps the focus.
- Hovering an option only highlights it, as in the WAI-ARIA examples: the active option and `aria-activedescendant` stay with the keyboard.
- Keys the input handles, such as the caret keys and typing, return to the text: the active option is cleared and the list stays open.
- The list closes when the focus leaves the input, without picking anything. With `both` or `inline`, leaving the input with a completion in it picks the completed option.
- `ComboboxTrigger` is not in the tab order: a press opens or closes the list and the focus stays in the input. Keyboard users open the list with `ArrowDown` or `Alt+ArrowDown`.
- Inside a `Dialog`, the focus trap of the dialog keeps working, and `Escape` closes the list before it reaches the dialog.

## Screen Reader Semantics

- The input is announced as a combobox with its name, its text and whether the list is expanded.
- `aria-expanded` is `true` only while the list is shown, so an open list without options is announced as collapsed.
- Moving through the list announces the active option. `aria-selected` follows the active option, as in the WAI-ARIA examples; while no option is active, it marks the option of the picked value.
- Reopening a field with a picked value: `ArrowDown` and `ArrowUp` start at the first or last option, as in the WAI-ARIA examples. `Alt+ArrowDown` and `ComboboxTrigger` open without an active option and scroll the picked option into view.
- `aria-autocomplete` tells screen readers what to expect: `list` and `none` suggest options, `both` also completes the text and shows the list, `inline` only completes the text.
- With `both` or `inline`, typing and the arrow keys write the full label of the matched or reached option into the input, in the casing of the label, and select the part after the typed text, as in the WAI-ARIA reference example, so the field shows the option a screen reader announces.
- With completion, the completed rest is selected text in the input, so screen readers read it as a selection, and the matching option becomes active while the list is shown.
- Options with markup should read as one choice. Give them a `label` with the plain text that is written into the input.
- Messages outside the list, such as "No results" or "5 cities found", need `role="status"` or `aria-live` to be announced.

## Form Semantics

- `name` on `ComboboxInput` submits the text, and `required`, `pattern` or `minLength` validate the text natively.
- The picked value is not submitted. Render `<input type="hidden">` from your state when the server needs the value instead of the text.
- `Enter` without an active option submits the form, like in any text field. With an active option, it picks the option and does not submit.
- A form reset restores the uncontrolled text and value to their defaults.

## Accessibility Risks

- an input or a list without a name
- a "no results" message inside the list, where it breaks the listbox structure and hides with the list
- a result count or loading state shown only visually
- options with markup and no `label`, which write icon text or secondary text into the input
- interactive controls inside an option, which cannot be reached while the focus stays in the input
- relying on `aria-activedescendant` without testing in the screen readers you support
