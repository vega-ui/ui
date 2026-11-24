# WheelPicker Accessibility

## Labeling

- Name `WheelPicker` with `aria-label` or `aria-labelledby`, like "Alarm time", and each `WheelPickerColumn` too, like "Hours" and "Minutes". The components never set a label themselves.
- A column announces the text of the selected option as `aria-valuetext`. Give an option with an icon or other rich content a `label`.
- Text between the columns, like "min", is visible only: hide it with `aria-hidden` when the column name says it, or name the column with it through `aria-labelledby`.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>Tab</kbd> | Moves the focus to the next column, and out of the picker after the last one. |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Selects the next or the previous enabled option and turns the wheel to it. A looped column goes on past the last option to the first one; a bounded column stops. |
| <kbd>Page Up</kbd> / <kbd>Page Down</kbd> | Moves as many options as the picker shows rows, forward or back. |
| <kbd>Home</kbd> / <kbd>End</kbd> | Selects the first or the last enabled option. |
| <kbd>1</kbd> | Selects the next option whose text starts with the typed characters; characters typed in quick succession form one search. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

## Focus Behavior

- Every column is a Tab stop, in the order of the columns; Tab and Shift+Tab move between them.
- A disabled column leaves the Tab order; a read-only column stays in it and ignores the keys.
- The focus stays on the column while it turns; the rows inside it never take the focus.

## Screen Reader Semantics

- `WheelPicker` is a `group` with the name you give it.
- Each column is a `spinbutton` with `aria-valuetext`, the text of the selected option, and `aria-valuenow`, `aria-valuemin` and `aria-valuemax`, its position among the options. A screen reader announces it like "Hours, 07, spin button".
- The rows are `aria-hidden`: the column tells the value, and the rows around it are decoration.
- On touch screens, swiping up and down on a focused spinbutton steps it with VoiceOver and TalkBack.

## Accessibility Risks

- Columns without names: a screen reader announces "spin button, 30" without telling minutes from hours.
- Options whose text is not the value, like an icon: give them a `label`.
- A long list on a wheel, like a hundred years, is slow from the keyboard but for typeahead: keep the typed text of the options short and distinct, or offer a field instead.
- Disabled options shown only by a lighter color: the keys skip them, but tell why they are unavailable, like "Booked times are skipped".
