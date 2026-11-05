# Checkbox Accessibility

## Labeling

The visible label should describe the independent choice clearly. The full row should usually be one clickable label surface.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>Space</kbd> | Checks or unchecks the focused checkbox. An indeterminate checkbox becomes checked. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

- Indeterminate state should still be explained by surrounding product logic when it matters.

## Focus Behavior

- Focus should land on the native input.
- Visible focus treatment should remain obvious on the indicator surface.

## Screen Reader Semantics

- Hidden input participation helps preserve native checkbox semantics.
- Indeterminate state should not become a mysterious third value without surrounding explanation.
- The visible text should remain attached to the same interaction row.

## Form Semantics

- Use `CheckboxInput` when the control belongs to a native form.
- Required agreement checkboxes should expose their error state clearly.

## Accessibility Risks

- Missing `CheckboxInput`.
- Detached label text that is not part of the same clickable unit.
- Using checkbox semantics for mutually exclusive choices.
