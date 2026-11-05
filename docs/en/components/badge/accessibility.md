# Badge Accessibility

## Labeling

Badge text should stay short and understandable on its own. Avoid abbreviations that only make sense visually.

## Keyboard Behavior

- A badge is usually static and does not need focus.
- If the badge becomes interactive, the design should switch to a more appropriate control.

## Focus Behavior

- Non-interactive badges should not participate in tab order.

## Screen Reader Semantics

- The text content should remain meaningful without color.
- If the badge conveys important state, the surrounding UI should also explain it structurally.

## Form Semantics

- `Badge` is not a form control.

## Accessibility Risks

- Encoding meaning only by color.
- Overusing abbreviations or cryptic counts.
- Turning a badge into an action surface without changing semantics.
