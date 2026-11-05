# DateTimeField Accessibility

## Labeling

`DateTimeField` needs a label that explains both date and time expectations. If timezone matters, state it in helper text instead of expecting users to infer it.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>↑</kbd> / <kbd>↓</kbd> | With the caret in the hours: steps them by one. In the minutes or seconds: steps them by `timeStep`. A segment wraps around its range without changing the others; in the date part the arrows do not change the value. `timeStep={0}` turns stepping off. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | On the trigger button: opens or closes the calendar popup. The focus stays on the button. |
| <kbd>Tab</kbd> | From the open trigger: moves the focus into the popup, to its first header button. |
| <kbd>Enter</kbd> | On a day in the popup: writes the day into the input and keeps the time. The other calendar keys work as in Calendar. |
| <kbd>Escape</kbd> | Closes the popup and returns the focus to the trigger button. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

- Typing works without opening the calendar. Inside the calendar, navigation only moves the focus; the value changes only when a day is picked.
- Typing is validated in the field's calendar system: a single digit that cannot start a two-digit segment is zero-padded, complete segments are clamped (the day to the month length), and a complete value is clamped to `min` / `max`.

## Focus Behavior

- Focus usually starts in the input.
- Opening the calendar should not make it unclear how to return to timestamp entry.
- Nested overlay use should be tested for focus restoration and dismissal.

## Screen Reader Semantics

- The field should communicate the expected timestamp format in label, hint, or error text.
- The trigger icon button still needs an accessible label such as "Open calendar".
- Timestamp meaning such as workspace timezone or scheduled execution time should remain explicit outside the picker.

## Form Semantics

- `DateTimeField` behaves like a field through the underlying input.
- Error messaging should treat the value as one timestamp, not two isolated fragments.

## Accessibility Risks

- Omitting timezone guidance where the product depends on it.
- Using placeholder text as the only explanation of the required date-time format.
- Allowing overlay composition to interfere with keyboard or focus behavior.
