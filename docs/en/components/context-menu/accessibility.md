# ContextMenu Accessibility

## Labeling

- `MenuContent` in a `ContextMenu` has no `aria-labelledby`, as there is no button to name it. Pass `aria-label` or `aria-labelledby` to `MenuContent` yourself, naming the object the menu acts on, like the file name. The components never set a label themselves.
- Name every `MenuRadioGroup`, and every `MenuGroup` that has a heading, with `aria-labelledby` pointing at the heading or with `aria-label`.
- An icon-only button that opens the same actions in a `Menu`, like a "⋯" `IconButton`, needs an `aria-label` that names the object.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>Shift</kbd> + <kbd>F10</kbd> | With the focus on an element inside the area: opens the menu at that element instead of the menu of the browser, and moves the focus to its first item. The context menu key does the same where the keyboard has one. |
| <kbd>↓</kbd> / <kbd>↑</kbd> | In the menu: moves the focus to the next or previous item. From the last item it moves to the first, and from the first to the last. Disabled items take the focus too. |
| <kbd>Home</kbd> / <kbd>End</kbd> | In the menu: moves the focus to the first or last item. |
| <kbd>c</kbd> | Typeahead: a printable character moves the focus to the next item whose label starts with the typed text. Disabled items are included. The label is the text of the item, or its `label` prop. |
| <kbd>Enter</kbd> | In the menu: runs the focused item and closes the menu; the browser gives the focus back to the element that had it when the menu opened. An item of a submenu closes every menu. A disabled item does nothing, and a `preventDefault()` in the `onClick` of an item keeps the menu open. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | On an item that opens a submenu: opens the submenu and moves the focus to its first item. |
| <kbd>→</kbd> / <kbd>←</kbd> | On an item that opens a submenu, the Right arrow opens the submenu with the focus on its first item; in a submenu, the Left arrow closes it and returns the focus to its item. In a right-to-left page the two arrows swap. |
| <kbd>Space</kbd> | In the menu: runs a plain item like Enter. A checkbox or radio item is checked or unchecked, and the menu stays open. |
| <kbd>Escape</kbd> | Closes the menu without running an item; the browser gives the focus back to the element that had it when the menu opened. In a submenu it closes only the submenu and returns the focus to its item. |
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | In the menu: closes the menu and moves the focus on to the next or the previous element. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

## Focus Behavior

- Opening the menu moves the focus to its first item.
- A menu opened with the context menu key or Shift+F10 appears at the focused element, since the browser gives the point of that element. These keys open the menu only while the focus is inside the area, so an area with nothing focusable in it opens only from the pointer; keep its actions reachable from a visible button or [Menu](../menu/).
- The items have `tabIndex={-1}`: the focus moves between them only with the arrow keys, Home, End, typeahead and the pointer, as in `Menu`.
- The library does not move the focus when the menu closes: the browser gives it back to the element that had it when the menu opened, like the button of a row. After a right click on an area with nothing focused, the focus goes to the page.
- Tab and Shift+Tab close the menu and move the focus on in the page.
- In a submenu, Escape and the Left arrow (the Right arrow in a right-to-left page) close only the submenu and return the focus to the item that opened it.

## Screen Reader Semantics

- `ContextMenuTrigger` has no role, no `aria-haspopup` and no `aria-expanded`: the area is not a menu button, and a screen reader announces its content as it is.
- `MenuContent` is a `menu`; `MenuItem` is a `menuitem`, `MenuCheckboxItem` a `menuitemcheckbox` and `MenuRadioItem` a `menuitemradio`, both with `aria-checked`. `MenuSubmenuTrigger` is a `menuitem` with `aria-haspopup="menu"`.
- Disabled items have `aria-disabled="true"`: they are announced as unavailable but stay focusable, as in `Menu`.

## Accessibility Risks

- An action that is only in the context menu: a context menu is not discoverable, many users never right click, and macOS has no context menu key. Every action must also be reachable another way, like a visible button or a `Menu` on a "More" button.
- A `MenuContent` without `aria-label` or `aria-labelledby`: the menu has no name.
- An area with nothing focusable in it: the keyboard cannot open its menu at all.
- Controls or long text inside the menu: screen readers in a menu expect only items, and the arrow keys never reach the rest.
