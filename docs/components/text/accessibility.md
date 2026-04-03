# Text Accessibility

## Labeling

- `Text` does not create labels on its own.
- When text labels a control, use `Label` or `FieldsetLegend` instead.

## Keyboard Behavior

- `Text` has no keyboard behavior.

## Focus Behavior

- `Text` is normally non-focusable unless `asChild` composes with a focusable element.

## Screen Reader Semantics

- Screen reader semantics depend on the rendered element.
- If semantic headings are needed, use `Heading` rather than styling `Text` to look like one.

## Form Semantics

- `Text` is suitable for helper copy, descriptions, and validation messages around fields.

## Accessibility Risks

- using `Text` as a visual heading without heading semantics
- using low-contrast overrides for primary content
