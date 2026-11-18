# ContextMenu Comparison

## Quick Decision Rule

Use `ContextMenu` for a shortcut: the actions of the thing under the pointer, opened by a right click or a long touch, that are also reachable another way.

## `ContextMenu` vs `Menu`

Use `ContextMenu` when:

- the menu should open at the pointer, on a right click or a long touch on an area, like a row, a card or a canvas
- the same actions are also on a visible button or toolbar

Use `Menu` when:

- a visible button opens the menu, like "Edit" or "⋯"
- the menu is the main or the only way to its actions

Main trade-off: a context menu is fast for those who know it and invisible for everyone else, while a menu button is visible and announced as a menu button. Use both together: a `Menu` on a "More" button and a `ContextMenu` with the same items.

## `ContextMenu` vs `Popover`

Use `ContextMenu` when:

- the content is only a list of items, moved through with the arrow keys and typeahead

Use `Popover` when:

- the content has text, fields, buttons or other controls

Main trade-off: a menu gives its items the menu keyboard and closes when one runs, while a popover keeps the Tab order of its content and leaves closing to you.

## Choose This Component When

- Rows, cards or files have actions that power users expect on a right click
- A canvas or a board offers view options at the pointer, next to a toolbar with the same options
- A long touch on a touch screen should open the actions of an item

## Do Not Choose This Component When

- The context menu would be the only way to an action: add a visible button or use [Menu](../menu/)
- The menu opens from a button: use [Menu](../menu/)
- The floating content has fields or other controls: use [Popover](../popover/)
- You need a menubar: it is not part of this version
