# Toolbar Accessibility

## Labeling

- Pass `aria-label` or `aria-labelledby` to `Toolbar`, naming what it acts on, like "Formatting" or "Drawing tools". The components never set a label themselves.
- Every icon-only item needs its own `aria-label`, like "Bold" or "Insert link". A `Toggle` keeps the same label in both states: "Bold" pressed, not "Remove bold".
- Name every `ToggleGroup` inside the toolbar with `aria-label`, like "Text style" or "Alignment": a screen reader announces the name of the group when the focus enters it.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>→</kbd> / <kbd>←</kbd> | In a horizontal toolbar: moves the focus to the next or previous enabled item, skipping disabled ones; the items of a `ToggleGroup` are items of the toolbar. From the last item it moves to the first, and from the first to the last. The keys follow the text direction, so they are mirrored in right-to-left. |
| <kbd>↓</kbd> / <kbd>↑</kbd> | In a vertical toolbar: moves the focus to the next or previous enabled item, wrapping around the ends. Moving the focus to an item of a `ToggleGroup` does not press it. |
| <kbd>↓</kbd> / <kbd>↑</kbd> | In a horizontal toolbar, on an item that opens a `Menu`: opens the menu with the focus on its first item (Down) or on its last item (Up). While the menu is open, the arrow keys move between its items, and Escape gives the focus back to the item. |
| <kbd>Home</kbd> / <kbd>End</kbd> | Moves the focus to the first or last enabled item. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Does what the focused control does: a button runs, a `Toggle` is pressed or released, an item of a `ToggleGroup` is pressed, a `MenuTrigger` opens its menu. |
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | The toolbar is one tab stop: Tab enters it on the first enabled item, or on the item that had the focus last, and Tab or Shift+Tab from any item leaves it. |
| <kbd>←</kbd> / <kbd>→</kbd> / <kbd>Home</kbd> / <kbd>End</kbd> | In a text field item: moves the caret, and the focus stays in the field. Put the field last in a horizontal toolbar, as the arrow keys do not move the focus out of it. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

## Focus Behavior

- The toolbar is one Tab stop. Before the focus enters it, the first enabled item holds the Tab stop; after that, the item that had the focus last, so Tab and Shift+Tab come back to where the user left.
- A click on an item moves the Tab stop to it, as the arrow keys do.
- The arrow keys of the other axis do nothing, except on a `MenuTrigger` item, where the Down and Up arrows open its menu.
- A text field item keeps the Left and Right arrows, Home and End for its caret. In a horizontal toolbar the arrow keys never move the focus out of it, only Tab does, and that leaves the toolbar: put the field last, as the [WAI-ARIA toolbar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) advises, so the arrow keys reach every other item.
- While a menu opened from an item is open, the arrow keys move between the items of the menu. Escape closes it, and the focus goes back to the item.
- Disabled items are natively disabled: they never take the focus, and the arrow keys skip them.

## Screen Reader Semantics

- `Toolbar` is a `toolbar` with `aria-orientation`, so a screen reader announces which arrow keys move between its items.
- `ToolbarItem` adds no role: the control keeps its own, a `button`, a `button` with `aria-pressed` for a `Toggle`, a `button` with `aria-haspopup="menu"` and `aria-expanded` for a `MenuTrigger`, or a `textbox` or `searchbox`.
- A `ToggleGroup` inside the toolbar stays a `radiogroup` of `radio` items with `aria-checked`, or a `group` of buttons with `aria-pressed` with `multiple`.
- A `Separator` is a `separator` with its `aria-orientation`.

## Accessibility Risks

- A toolbar without a name: a page with several toolbars cannot tell them apart.
- A control left out of `ToolbarItem`: it keeps a Tab stop of its own, and the arrow keys never reach it.
- A toolbar with one or two controls: the arrow keys add a step the user does not expect. Use plain buttons instead.
- A text field before other items of a horizontal toolbar: the arrow keys stop at it, and the items after it are reached only around the ends, from the first item. A text field first in the toolbar holds the first Tab stop, and the keyboard never reaches the rest.
- A label that changes with the state, like "Mute" and "Unmute" on a `Toggle`: the screen reader already announces "pressed".
