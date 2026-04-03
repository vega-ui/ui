# PageControl Accessibility

## Labeling

- The surrounding UI should explain what the items represent, especially in carousels and onboarding flows.

## Keyboard Behavior

- Left and right arrows move active state between items.

## Focus Behavior

- Each item is a focusable button-like control with roving `tabIndex`.

## Screen Reader Semantics

- The root uses `role='tablist'`.
- Items expose tab-like semantics and active selection.
- Progress items may expose meter semantics while active.

## Form Semantics

- `PageControl` is navigation, not form input.

## Accessibility Risks

- no contextual label for what the dots represent
- relying only on color to show the active item
- timed progress indicators that change faster than users can process
