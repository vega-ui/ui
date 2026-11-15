# DateField Accessibility

The field follows the WAI-ARIA [Date Picker Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/) pattern: a text input for typing, a trigger button, and a calendar dialog for picking.

## Labeling

- Name the input with a visible `Label` (`htmlFor`), or with `aria-label` / `aria-labelledby` on `DateFieldInput`.
- Name the trigger with `aria-label` on `DateFieldTriggerIconButton`, for example "Choose date"; the field never adds a label of its own.
- Name the dialog with `aria-label` or `aria-labelledby` on `DateFieldCalendar`. It is `role="dialog"` by default; do not also set `role` on the `Popover`.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | On the trigger button: opens the calendar popup and moves the focus into the day grid: to the selected date, otherwise today, otherwise the first available date. |
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | In the popup: moves the focus between the header buttons and the day grid. The popup is not modal: Tab from its last element leaves it, and it stays open until Escape, an outside click or a pick. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | On a day in the popup: writes the day into the input, closes the popup and returns the focus to the trigger button. The other calendar keys work as in Calendar. |
| <kbd>Escape</kbd> | Closes the popup without changing the date and returns the focus to the trigger button. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

- Typing works without opening the calendar. Inside the calendar, navigation only moves the focus; the value changes only when a day is picked.
- Typing is validated in the field's calendar system: a single digit that cannot start a two-digit segment is zero-padded, complete segments are clamped (the day to the month length), and a complete value outside `min` / `max` stays as typed and makes the input invalid.

## Focus Behavior

- The trigger has `aria-haspopup="dialog"`; it opens the popup through the native `popovertarget`, which exposes `aria-expanded` and the controlled popup.
- On open, the focus moves into the day grid: to the selected date, otherwise today (clamped to `min` and `max`), otherwise the first available date. The popup opens on the month of that date.
- Picking a day (click, <kbd>Enter</kbd> or <kbd>Space</kbd>) writes it into the input, closes the popup and returns the focus to the trigger.
- <kbd>Escape</kbd> and an outside click close the popup without a change; the browser returns the focus to the trigger. In Safari a mouse click does not focus a button, so after a mouse-opened popup closes the focus returns to the page body; keyboard activation returns it to the trigger.
- Deviation from the APG modal dialog: the popup is a non-modal `popover="auto"`. <kbd>Tab</kbd> can leave it, and it stays open until <kbd>Escape</kbd>, an outside click, a pick or another popover closes it. This keeps the page usable, like the native date pickers of the browsers.
- To keep the popup open after a pick, control `open` on the `Popover` and set it back to `true` in `onChangeValue` of `DateFieldCalendar`, which runs after the field closes it.

## Screen Reader Semantics

- The input should communicate the expected format in its label, hint, or error copy, not only in the placeholder.
- The day grid is named by `CalendarHeading`, which announces the shown month politely when it changes.
- With `readOnly` on the root, the input is `readonly` and the day grid has `aria-readonly="true"`: the calendar opens to show the date, navigation works, and picking does not change the value.
- The field never sets `aria-invalid`. The error look follows `:user-invalid` and `[data-user-edited]:invalid`, so an incomplete, out-of-range or unavailable date is marked once the user edits the field and leaves it, or tries to submit; for an error only your app knows, set `aria-invalid` on `DateFieldInput` together with your error message.

## Form Semantics

- `DateFieldInput` submits the shown text under its `name`, like a native text input; the `YYYY-MM-DD` day comes from `onChangeValue`.
- `disabled` and `readOnly` on the root work like the native attributes: a disabled field (also inside a disabled `<fieldset>`) is not submitted, a read-only one is.
- The input reports native validity through `setCustomValidity` with the message of the browser: an incomplete date, a date before `min` or after `max`, and a day from `disabledDates` are invalid, so `:invalid`, `reportValidity()`, and the browser's submit check work. `required` on `DateFieldInput` works natively. The field owns `setCustomValidity` of the input; show your own message from `onInvalid`.
- A form reset restores `defaultValue` unless the field is controlled.

## Accessibility Risks

- Hiding the expected date format only inside placeholder text.
- Leaving the trigger or the dialog without a name.
- Opening the calendar inside another overlay without testing focus and dismissal together.
