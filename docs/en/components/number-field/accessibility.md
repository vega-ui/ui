# NumberField Accessibility

## Labeling

- Pair `NumberFieldInput` with a visible `Label`.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>↑</kbd> | Increases the value by one `step`, up to `max`. An empty field gets `min`, or 0 without it. |
| <kbd>↓</kbd> | Decreases the value by one `step`, down to `min`. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

- Standard text editing still happens through the native input.

## Focus Behavior

- Focus lives on the input and any stepper buttons.
- Ensure adjacent controls remain keyboard reachable in a sensible order.

## Screen Reader Semantics

- The meaningful input is still a native input.
- `aria-valuemin` and `aria-valuemax` are exposed on the input from context.

## Form Semantics

- `name`, `required`, and submission behavior belong to `NumberFieldInput`.
- Bounds and stepping are product behavior, not a replacement for backend validation.

## Accessibility Risks

- unlabeled numeric field
- wheel-based changes surprising users when focus is on the field
- unclear meaning of adjacent decrement/increment buttons
