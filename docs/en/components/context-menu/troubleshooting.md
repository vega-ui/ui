# ContextMenu Troubleshooting

## The Keyboard Cannot Open The Menu

### Symptom

Shift+F10 or the context menu key does nothing on the area.

### Likely Cause

The keys open the menu only while the focus is inside the area, where the browser fires `contextmenu` for them. An area with nothing focusable in it, like a canvas, never has the focus. macOS has no context menu key.

### How To Verify

- Tab through the page and check whether any element inside the area takes the focus.

### Fix

- Make the area your own focusable element with `asChild`, like the `<button>` of an item, or put a focusable element inside it, as in the [photo example](./examples.md#controlledstateful-a-right-click-selects-the-photo).
- Put the same actions on a visible button or a [Menu](../menu/), as every action of a context menu must also be reachable another way.

## The Menu Has No Name

### Symptom

A screen reader announces "menu" without a name.

### Likely Cause

`MenuContent` in a `ContextMenu` has no `aria-labelledby`, since there is no button to name it, and no `aria-label` was passed.

### How To Verify

- Inspect the `role="menu"` element in the accessibility tree of the browser's dev tools: its name is empty.

### Fix

- Pass `aria-label` to `MenuContent` that names the object, like the file name, or `aria-labelledby` pointing at a visible heading.

## The Focus Does Not Go Back To The Area

### Symptom

After Escape or an item that runs, the focus is on the page, not on the area.

### Likely Cause

The library does not move the focus when the menu closes: the browser gives it back to the element that had it when the menu opened. After a right click on an area with nothing focused, there was no such element, so the focus goes to the page.

### How To Verify

- Check `document.activeElement` before the right click: it is `body`.

### Fix

- Nothing to fix when nothing had the focus: the library does not move the focus on close. A menu opened with the keyboard opens from a focused element inside the area, and the focus goes back to that element.

## The Menu Is Not At The Pointer

### Symptom

The menu opens in a corner of the page instead of at the point of the right click.

### Likely Cause

The browser does not support CSS anchor positioning: Chrome and Edge before 129, Safari before 26, Firefox before 147. The menu still opens, closes and moves the focus, but it has nothing to position against.

### How To Verify

- Check `CSS.supports('anchor-name', '--a')` in the browser.

### Fix

- Ask the users to update the browser; the library has no script fallback for positioning.
