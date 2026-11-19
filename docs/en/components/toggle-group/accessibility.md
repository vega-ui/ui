# ToggleGroup Accessibility

## Labeling

- Pass `aria-label` or `aria-labelledby` to the group, naming the choice, like "Alignment" or "View"; the components never set a label themselves.
- An item with text is named by its text. An icon-only item with `square` needs `aria-label` or `aria-labelledby`, which its type requires.
- Point `aria-describedby` of the group at a hint when an item is disabled for a reason, like a plan limit.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>→</kbd> / <kbd>↓</kbd> | Moves the focus to the next enabled item without pressing it, skipping disabled ones. From the last item it moves to the first. The Left and Right arrows follow the text direction, so they are mirrored in right-to-left. |
| <kbd>←</kbd> / <kbd>↑</kbd> | Moves the focus to the previous enabled item without pressing it. From the first item it moves to the last. |
| <kbd>Home</kbd> / <kbd>End</kbd> | Moves the focus to the first or last enabled item without pressing it. |
| <kbd>Space</kbd> / <kbd>Enter</kbd> | Presses the focused item. Without `multiple`, it releases the item that was pressed, and pressing the pressed item keeps it pressed; with `multiple`, it presses or releases the focused item by itself. |
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | The group is one tab stop on the pressed item, or on the first enabled item when none is pressed. Tab and Shift+Tab leave the group from any item, and once the focus has left, the tab stop goes back to the pressed item. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

## Focus Behavior

- The group is one Tab stop. Tab enters it on the pressed item, or on the first enabled item when none is pressed; with `multiple`, on the item of the first value in the array. Once the focus leaves the group, its Tab stop goes back to the pressed item.
- The arrow keys move the focus without pressing: the user reaches an item first and presses it with Space or Enter, as in the [WAI-ARIA toolbar example](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/).
- Disabled items are natively disabled: Tab and the arrow keys skip them.
- Inside a [Toolbar](../toolbar/), the toolbar owns the Tab stop and the arrows of its axis, and the items of the group are items of the toolbar.

## Screen Reader Semantics

- Without `multiple`, the group is a `radiogroup` and every item a `radio` with `aria-checked`, announced with its state and position, like "Align center, radio button, not checked, 2 of 3".
- With `multiple`, the group is a `group` and every item a `button` with `aria-pressed`, announced as a toggle button, pressed or not pressed.
- The name of the group is announced when the focus enters it.
- A disabled item is announced as unavailable, with its pressed state.

## Accessibility Risks

- A group without a name, or an icon-only item without `aria-label`.
- Expecting the arrow keys to select, as with native radios: here they only move the focus. Show the pressed item clearly, so focused and pressed look different.
- A pressed state shown only by color: the default look tints the background and the icon; a custom look needs a difference that is more than a hue.
- A group used as a form value: a form reads its inputs, and the items are buttons. Use [SegmentedControl](../segmented-control/), [Radio](../radio/) or [Checkbox](../checkbox/).
