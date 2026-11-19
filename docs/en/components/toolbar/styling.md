# Toolbar Styling

## Overview

`Toolbar` lays its children out with flexbox: a row with `align-items: center` and a gap of `var(--spacing-2)`, or with `orientation="vertical"` a column whose children stretch. It has no background, border or padding of its own, so it fits a header, a card or a floating panel. `ToolbarItem` adds no styles: the look of every item is the look of its control, like `Button` or [Toggle](../toggle/styling.md).

## Public CSS Variables

`Toolbar` has no CSS variables of its own. The items take the variables of their controls:

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--button-height` | `Button`, `Toggle` and `ToggleGroupToggle` items | Height of an item, and the width of a `square` one; `size` sets it. |
| `--button-color` | items | Text and icon color, with `-hover` and `-active`. |
| `--button-background-color` | items | Background, with `-hover` and `-active`. |
| `--button-border-color` | items | Border color, with `-hover` and `-active`. |

## Part-Level Variables

- `Toolbar`: `display: flex`, `align-items: center` and `gap: var(--spacing-2)`; with `data-orientation="vertical"`, `flex-direction: column` and `align-items: stretch`.
- A direct child `Separator` with `aria-orientation="vertical"` gets `align-self: stretch`, `height: auto` and a margin of `var(--spacing-2)` on both sides; one with `aria-orientation="horizontal"` gets the same margin above and below.
- `ToolbarItem`: no styles.
- `ToggleGroup` inside the toolbar: `display: inline-flex` with a gap of `var(--spacing-1)`, a row in both orientations.

## State And Variant Interaction

- `data-orientation` on the root is `horizontal` or `vertical`; style a vertical toolbar with `[data-orientation='vertical']`.
- `[aria-pressed='true']` marks a pressed `Toggle` or an item of a `ToggleGroup` with `multiple`, and `[aria-checked='true']` the pressed item of a `ToggleGroup`; `[data-pressed='true']` marks both.
- `:disabled` marks a disabled item, `[aria-expanded='true']` a `MenuTrigger` whose menu is open, and `:focus-visible` the item the keyboard moved to.

## Examples

Pass `className='editorToolbar'` to `Toolbar` for a tinted bar with tighter items and a neutral pressed state:

<!-- example: toolbar/styling-examples.css -->
```css
.editorToolbar[role='toolbar'] {
  gap: var(--spacing-1);
  padding: var(--spacing-2);
  border-radius: var(--radius-4);
  background: var(--fills-tertiary);
}

.editorToolbar[data-orientation='vertical'] {
  width: max-content;
}

.editorToolbar [aria-pressed='true'],
.editorToolbar [aria-checked='true'] {
  --button-background-color: var(--fills-primary);
  --button-background-color-hover: var(--fills-primary-hover);
  --button-background-color-active: var(--fills-primary-active);
  --button-color: var(--label-primary);
  --button-color-hover: var(--label-primary);
  --button-color-active: var(--label-primary);
}
```
<!-- /example -->

## Do Not Override

- Do not set `display: none` or `visibility: hidden` on an enabled item to hide it: it stays an item, and the arrow keys try to move the focus to it. Remove it from the toolbar instead.
- Do not reverse the order with `flex-direction: row-reverse` or `order`: the arrow keys follow the order in the DOM, not the order on the screen.
- Do not remove the focus ring of the items: in a toolbar the focus moves with the arrow keys, and the ring is the only sign of the current item.
- Do not set `tabindex` on the items yourself: the toolbar moves the Tab stop between them.
