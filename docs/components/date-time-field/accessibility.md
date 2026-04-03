# DateTimeField Accessibility

## Labeling

`DateTimeField` needs a label that explains both date and time expectations. If timezone matters, state it in helper text instead of expecting users to infer it.

## Keyboard Behavior

- Typing should remain possible without opening the calendar.
- The trigger icon button should stay reachable through tab order.
- Keyboard users should be able to understand whether they are editing the date, the time, or both.

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
