# PageControl Accessibility

## Labeling

- The surrounding UI should explain what the items represent, especially in carousels and onboarding flows.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>→</kbd> / <kbd>←</kbd> | Activates and focuses the next or previous item. Stops at the first and last item. The keys do not follow the text direction: → always moves to the next index, also in right-to-left. |
| <kbd>Tab</kbd> | Moves the focus to the active item and then out of the control: the items are one tab stop. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

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
