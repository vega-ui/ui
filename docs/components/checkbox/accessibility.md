# Checkbox Accessibility

## Labeling

The visible label should describe the independent choice clearly. The full row should usually be one clickable label surface.

## Keyboard Behavior

- The checkbox should be reachable in normal tab order.
- The control should toggle predictably from the keyboard.
- Indeterminate state should still be explained by surrounding product logic when it matters.

## Focus Behavior

- Focus should land on the hidden native input.
- Visible focus treatment should remain obvious on the indicator surface.

## Screen Reader Semantics

- Hidden input participation helps preserve native checkbox semantics.
- Indeterminate state should not become a mysterious third value without surrounding explanation.
- The visible text should remain attached to the same interaction row.

## Form Semantics

- Use `CheckboxHiddenInput` when the control belongs to a native form.
- Required agreement checkboxes should expose their error state clearly.

## Accessibility Risks

- Missing hidden input in real form flows.
- Detached label text that is not part of the same clickable unit.
- Using checkbox semantics for mutually exclusive choices.
