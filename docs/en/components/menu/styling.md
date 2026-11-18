# Menu Styling

## Overview

`MenuContent` is a popover on the secondary surface with the surface shadow, laid out as a column of items. It is placed against the trigger with CSS anchor positioning and `position-area`, flips to the other side when there is no room, and keeps a small gap from the trigger. It scales in from the side of the trigger when it opens and fades out when it closes; with `prefers-reduced-motion: reduce` it only fades. The focused item is highlighted: the pointer moves the focus, so hover and keyboard show the same highlight.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--menu-item-height` | `MenuContent`, items | Minimum height of an item; `size` sets it on the content. The corner radius of the items and of the content follows it. |
| `--menu-max-height` | `MenuContent` | Maximum height of the menu before its items scroll; 320px when not set. |
| `--menu-item-background-color` | items | Background of an item at rest; transparent by default. |
| `--menu-item-background-color-focus` | items | Background of the focused item. |
| `--menu-item-background-color-active` | items | Background of an item while it is pressed. |
| `--duration-spring` | `MenuContent` | Duration of the scale when the menu opens, with `--ease-spring`. |
| `--duration-exit` | `MenuContent` | Duration of the fade and the scale when the menu closes. |
| `--transition-state-delay` | items | Duration of the background and color change of an item. |

## Part-Level Variables

- `MenuContent`: flex column with a small gap and padding, `width: max-content` with a minimum width, the secondary surface, the surface shadow, the scroll when it is taller than `--menu-max-height`, and the space around a `Separator` inside it.
- `MenuItem`, `MenuCheckboxItem`, `MenuRadioItem`: flex row with a gap between the indicator, the label and anything after it, height from `--menu-item-height`, inline padding, font size by `data-size`, no wrapping, start-aligned text and no underline, so a link item looks like the others.
- `MenuGroup`, `MenuRadioGroup`: a column with the same gap as the menu.
- `MenuItemIndicator`: does not shrink, takes the primary label color, and is `visibility: hidden` unless its item is checked, so it keeps its space.

## State And Variant Interaction

- `:focus` on an item uses `--menu-item-background-color-focus`. Under `forced-colors: active` the focused item gets a `Highlight` outline instead.
- `:active` uses `--menu-item-background-color-active`, except on a disabled item.
- `[aria-disabled="true"]` uses the disabled label color, a `not-allowed` cursor and a neutral focus background.
- `[aria-checked="true"]` or `[data-checked="true"]` marks a checked checkbox or radio item and shows its `MenuItemIndicator`.
- `size` sets `data-size` on the content and the items: `xs`, `sm`, `md`, `lg` or `xl`, with a smaller or larger item height and font size.
- `placement` sets `data-side` (`top`, `right`, `bottom` or `left`) and `data-align` (`start`, `center` or `end`) on the content; they choose the `position-area` and the side the menu scales from.
- `aria-expanded="true"` and `data-open="true"` mark the trigger while the menu is shown; style an open trigger with them.
- `:popover-open` on the content is true while the menu is shown.

## Examples

Pass `className='denseMenu'` to `MenuContent` for shorter items and a lower menu, and `className='dangerItem'` to a destructive `MenuItem`:

<!-- example: menu/styling-examples.css -->
```css
.denseMenu[role='menu'] {
  --menu-item-height: 28px;
  --menu-max-height: 240px;
}

.dangerItem[role='menuitem'] {
  --menu-item-background-color-focus: color-mix(in oklch, var(--color-error) 12%, transparent);
  --menu-item-background-color-active: color-mix(in oklch, var(--color-error) 20%, transparent);

  color: var(--color-error);
}
```
<!-- /example -->

## Do Not Override

- Do not set `display` on `MenuContent`: the closed menu is hidden with `display: none`, and a `display` of your own keeps it on the screen while closed.
- Do not set `inset`, `margin` or `position-area` on `MenuContent` to move it; use `placement` on `Menu`.
- Do not remove the focus background of the items: the focus is the only sign of the current item while the keyboard moves through the menu.
- Do not style disabled items with `:disabled`: they use `aria-disabled` and never match it.
