# Heading Accessibility

## Labeling

- Headings label sections of content, not form inputs.

## Keyboard Behavior

- `Heading` has no keyboard behavior.

## Focus Behavior

- The heading itself is not focusable unless explicitly composed with a focusable element.

## Screen Reader Semantics

- `as` determines whether assistive technology sees `h1` through `h6`.
- Use heading levels to create a meaningful outline.

## Form Semantics

- `Heading` can introduce a form section, but it does not replace `Label` or `FieldsetLegend`.

## Accessibility Risks

- choosing heading levels by visual size instead of hierarchy
- skipping levels without a structural reason
- using `Heading` where a label or legend is required
