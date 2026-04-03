# MeterStack Accessibility

## Labeling

- Surrounding text should explain what the stacked metric represents.

## Keyboard Behavior

- `MeterStack` has no keyboard behavior.

## Focus Behavior

- The component is not focusable by default.

## Screen Reader Semantics

- Each segment exposes `role='meter'` with the shared min/max context.
- Because segmented meters can be hard to interpret from visuals alone, nearby text labels are often necessary.

## Form Semantics

- `MeterStack` is display-only, not form input.

## Accessibility Risks

- no textual explanation of what the segments mean
- color-only differentiation between segments
