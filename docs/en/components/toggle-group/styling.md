# ToggleGroup Styling

## Overview

`ToggleGroup` lays its items out as an `inline-flex` row with `align-items: center` and a gap of `var(--spacing-1)`, with no background, border or orientation of its own. Its `ToggleGroupToggle` items have the look of a [Toggle](../toggle/styling.md): released and pressed, through the button variables.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--button-height` | items | Height, and the width with `square`; `size` sets it. |
| `--button-color` | items | Text and icon color, with `--button-color-hover` and `--button-color-active`. |
| `--button-background-color` | items | Background, with `--button-background-color-hover` and `--button-background-color-active`. |
| `--button-border-color` | items | Border color, with `-hover` and `-active`. |

## Part-Level Variables

- `ToggleGroup`: `display: inline-flex`, `align-items: center`, `gap: var(--spacing-1)`. Set `flex-direction: column` yourself for a column, like in a vertical [Toolbar](../toolbar/).
- Items: the released and pressed variables of [Toggle](../toggle/styling.md#part-level-variables).

## State And Variant Interaction

- `[role='radiogroup']` and `[role='group']` tell the two modes of the group apart.
- `[aria-checked='true']` marks the pressed item of a group without `multiple`, and `[aria-pressed='true']` the pressed items of a group with `multiple`. `[data-pressed='true']` marks all of them.
- `[data-variant='secondary']` and `[data-appearance='transparent']` of an item stay the same in both states: select the pressed items by `[data-pressed='true']`.
- `:disabled`, `:hover`, `:active` and `:focus-visible` work as on a button.

## Examples

Pass `className='segmentedGroup'` to a group without `multiple` for a joined look on a tinted track:

<!-- example: toggle-group/styling-examples.css -->
```css
.segmentedGroup[role='radiogroup'] {
  gap: 0;
  padding: var(--spacing-1);
  border-radius: var(--radius-4);
  background: var(--fills-tertiary);
}

.segmentedGroup [aria-checked='true'] {
  --button-color: var(--label-primary);
  --button-color-hover: var(--label-primary);
  --button-color-active: var(--label-primary);
  --button-background-color: var(--surface-primary);
  --button-background-color-hover: var(--surface-primary);
  --button-background-color-active: var(--surface-primary);
}
```
<!-- /example -->

## Do Not Override

- Do not remove the focus ring: the arrow keys move the focus without pressing, so the ring is the only sign of the focused item.
- Do not reorder the items with `order` or `row-reverse`: the arrow keys follow the order in the DOM.
- Do not hide an enabled item with `display: none`: it stays an item. Remove it or disable it.
- Do not make the pressed item differ only by a hue: keep a background or a fill that shows without color.
