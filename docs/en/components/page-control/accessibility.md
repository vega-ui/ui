# PageControl Accessibility

## Labeling

- The surrounding UI should explain what the items represent, especially in carousels and onboarding flows.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>→</kbd> / <kbd>←</kbd> | Activates and focuses the next or previous enabled item, skipping disabled ones. From the last item it moves to the first, and from the first to the last. The keys follow the text direction, so they are mirrored in right-to-left. |
| <kbd>Home</kbd> / <kbd>End</kbd> | Activates and focuses the first or last enabled item. |
| <kbd>Tab</kbd> | Moves the focus to the active item and then out of the control: the items are one tab stop. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

## Focus Behavior

- Each item is a focusable button-like control with roving `tabIndex`.

## Screen Reader Semantics

- The root uses `role='tablist'`.
- Items expose tab-like semantics and active selection.
- Progress items stay tabs while active; the fill is visual only.
- An item marked `current` stays focusable and gets `aria-current='page'`.

## Form Semantics

- `PageControl` is navigation, not form input.

## Accessibility Risks

- no contextual label for what the dots represent
- relying only on color to show the active item
- timed progress indicators that change faster than users can process
