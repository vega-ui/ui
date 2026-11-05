# DateField Accessibility

## Labeling

`DateField` should receive a visible label through the surrounding field row or the underlying input. The trigger icon button should not be the only naming source.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | On the trigger button: opens or closes the calendar popup. The focus stays on the button. |
| <kbd>Tab</kbd> | From the open trigger: moves the focus into the popup, to its first header button. |
| <kbd>Enter</kbd> | On a day in the popup: writes the day into the input. The popup stays open; the other calendar keys work as in Calendar. |
| <kbd>Escape</kbd> | Closes the popup without changing the date and returns the focus to the trigger button. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

- Typing works without opening the calendar. Inside the calendar, navigation only moves the focus; the value changes only when a day is picked.
- Typing is validated in the field's calendar system: a single digit that cannot start a two-digit segment is zero-padded, complete segments are clamped (the day to the month length), and a complete value is clamped to `min` / `max`.

## Focus Behavior

- Focus usually starts in `DateFieldInput`.
- Opening the calendar should not make it unclear how to return to the input.
- Overlay composition inside dialogs or sheets should be tested for focus restoration.

## Screen Reader Semantics

- The text input should communicate the expected date format in label, hint, or error copy.
- The calendar should be supplemental, not the only way to understand the value.
- The trigger icon button still needs an accessible label such as "Open calendar".

## Form Semantics

- `DateField` behaves like a field because it is built on top of the input semantics from `TextField`.
- Validation messages should stay attached to the input state, not only to visual calendar affordances.

## Accessibility Risks

- Hiding the expected date format only inside placeholder text.
- Using the trigger icon button as the only accessible description of the control.
- Opening the calendar inside another overlay without testing focus and dismissal together.
