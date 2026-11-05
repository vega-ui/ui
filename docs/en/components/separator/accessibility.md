# Separator Accessibility

## Labeling

- `Separator` is usually unlabeled and decorative.

## Keyboard Behavior

- `Separator` has no keyboard behavior.

## Focus Behavior

- `Separator` is not focusable.

## Screen Reader Semantics

- The component renders with `role='separator'`.
- It communicates structural separation, but not a named region or heading.

## Form Semantics

- `Separator` can visually divide form sections, but it does not replace `Fieldset` or `FieldsetLegend`.

## Accessibility Risks

- using only a separator where a heading or legend is needed
- rendering decorative dividers so frequently that they add noise without structure
