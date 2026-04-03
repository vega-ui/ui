# DateField Accessibility

## Labeling

`DateField` should receive a visible label through the surrounding field row or the underlying input. The trigger icon button should not be the only naming source.

## Keyboard Behavior

- Typing should remain possible without opening the calendar.
- The trigger button should be reachable in normal tab order.
- If the calendar opens in a popover, keyboard interaction should stay predictable inside that overlay.

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
