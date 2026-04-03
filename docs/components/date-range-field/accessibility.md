# DateRangeField Accessibility

## Labeling

`DateRangeField` needs a label that explains both the business meaning and whether the range is inclusive or otherwise constrained. Placeholder text alone is not enough.

## Keyboard Behavior

- Typing should remain possible without opening the calendar.
- The trigger button should stay reachable through tab order.
- If the range picker opens in a popover, keyboard movement between input and overlay should remain predictable.

## Focus Behavior

- Focus usually starts in the input.
- Opening and closing the calendar should not strand focus away from the range field.
- Nested overlay use should be tested for restoration and dismissal.

## Screen Reader Semantics

- The field should communicate that it captures a start and end date, not one opaque string.
- Helper text should explain the range format and any booking or reporting rules.
- The trigger icon button still needs an accessible label such as "Open date range calendar".

## Form Semantics

- `DateRangeField` behaves like a field through the underlying input.
- Error messaging should cover incomplete or inverted ranges explicitly.

## Accessibility Risks

- Ambiguous labeling that does not explain the meaning of the range.
- Error copy that flags the field as invalid without explaining which side is missing.
- Overlay composition that hides the picker behind clipping or focus issues.
