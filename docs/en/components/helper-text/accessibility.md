# HelperText Accessibility

## Labeling

- `HelperText` does not replace a visible `Label`.

## Keyboard Behavior

- `HelperText` has no keyboard behavior.

## Focus Behavior

- `HelperText` is not focusable by default.

## Screen Reader Semantics

- The component renders paragraph-like helper content.
- Associate it with the control when your form pattern relies on described-by relationships.

## Form Semantics

- Use helper text for supplemental guidance near the field.
- Keep real invalid state on the field itself, not only in the helper copy.

## Accessibility Risks

- using helper text instead of a label
- surfacing error state only through text color
