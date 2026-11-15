# NumberField Accessibility

## Labeling

- Pair `NumberFieldInput` with a visible `Label`.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>↑</kbd> | Increases the value by one `step`, up to `max`. An empty field gets `min`, or 0 without it. |
| <kbd>↓</kbd> | Decreases the value by one `step`, down to `min`. |
| <kbd>Page Up</kbd> | Increases the value by ten steps, up to `max`. |
| <kbd>Page Down</kbd> | Decreases the value by ten steps, down to `min`. |
| <kbd>Home</kbd> | Sets the value to `min`. Without `min` the caret moves as in a plain input. |
| <kbd>End</kbd> | Sets the value to `max`. Without `max` the caret moves as in a plain input. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

- Standard text editing still happens through the native input.

## Focus Behavior

- Focus lives on the input and any stepper buttons.
- Ensure adjacent controls remain keyboard reachable in a sensible order.

## Screen Reader Semantics

- The input has `role="spinbutton"` and `aria-valuenow` with the current number.
- `aria-valuemin` and `aria-valuemax` appear only when `min` and `max` are set.

## Form Semantics

- `name`, `required`, and submission behavior belong to `NumberFieldInput`.
- Bounds and stepping are product behavior, not a replacement for backend validation.

## Accessibility Risks

- unlabeled numeric field
- wheel-based changes surprising users when focus is on the field
- unclear meaning of adjacent decrement/increment buttons
