# ContextMenu Styling

## Overview

`ContextMenuTrigger` has no look of its own: style the area like any element. `MenuContent` and its items look as in [Menu](../menu/styling.md). In a context menu the top-left corner of `MenuContent`, the top-right in a right-to-left page, sits at the point and overlaps it slightly, so the pointer is over the menu; it flips up or toward the start of the line near the edges of the viewport. It fades in without the scale of `Menu`, since a flipped menu would grow from the wrong corner, and fades out when it closes.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--menu-item-height` | `MenuContent`, items | Minimum height of an item; `size` sets it on the content. The corner radius of the items and of the content follows it. |
| `--menu-max-height` | `MenuContent` | Maximum height of the menu before its items scroll; 320px when not set. |
| `--menu-item-background-color` | items | Background of an item at rest; transparent by default. |
| `--menu-item-background-color-focus` | items | Background of the focused item. |
| `--menu-item-background-color-active` | items | Background of an item while it is pressed. |
| `--duration-exit` | `MenuContent` | Duration of the fade when the menu opens and when it closes. |
| `--transition-state-delay` | items | Duration of the background and color change of an item. |

## Part-Level Variables

- `ContextMenuTrigger`: only `-webkit-touch-callout: none`, so iOS shows no callout on a long press; layout, size and look are yours.
- `MenuContent`, items, groups and `MenuItemIndicator`: as in [Menu](../menu/styling.md#part-level-variables).

## State And Variant Interaction

- `data-open="true"` marks the area while its menu is shown; style an area whose menu is open with it.
- `data-side="point"` marks a `MenuContent` that opens at a point.
- `:focus`, `:active`, `[aria-disabled="true"]` and `[aria-checked="true"]` on the items, and `data-size` on the content and the items, work as in `Menu`.
- `:popover-open` on the content is true while the menu is shown.

## Examples

Pass `className='fileRow'` to `ContextMenuTrigger` to mark the row whose menu is open, and `className='boardMenu'` to `MenuContent` for shorter items and a lower menu:

<!-- example: context-menu/styling-examples.css -->
```css
.fileRow[data-open='true'] {
  background: var(--fills-secondary);
  border-color: var(--color-primary-500);
}

.boardMenu[role='menu'] {
  --menu-item-height: 28px;
  --menu-max-height: 240px;
}
```
<!-- /example -->

## Do Not Override

- Do not set `display` on `MenuContent`: the closed menu is hidden with `display: none`, and a `display` of your own keeps it on the screen while closed.
- Do not set `inset`, `margin` or `position-area` on `MenuContent`: they place the menu at the point and flip it near the edges.
- Do not remove the focus background of the items: the focus is the only sign of the current item while the keyboard moves through the menu.
- Do not set `-webkit-touch-callout` back on the area: iOS would show its callout over the menu on a long press.
