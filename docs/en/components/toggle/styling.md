# Toggle Styling

## Overview

`Toggle` has the look of a [Button](../button/styling.md), with or without `square`, in two states. It renders `variant="secondary"` and `appearance="transparent"` and draws the pressed state with the variables of `primary` `ghost` on `[data-pressed='true']`, so it takes no `variant` or `appearance` of its own. Change the look through the button variables on the pressed and released states. The layout of a [ToggleGroup](../toggle-group/styling.md) is on its own page.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--button-height` | `Toggle` | Height, and the width with `square`; `size` sets it. |
| `--button-br-ratio` | `Toggle` | Corner radius as a ratio of the height. |
| `--button-color` | `Toggle` | Text and icon color, with `--button-color-hover` and `--button-color-active`. |
| `--button-background-color` | `Toggle` | Background, with `--button-background-color-hover` and `--button-background-color-active`. |
| `--button-border-color` | `Toggle` | Border color, with `-hover` and `-active`. |

## Part-Level Variables

- Released: the variables of `secondary` `transparent`, a transparent background with the color of the label.
- Pressed: the variables of `primary` `ghost`, a tint of `--color-primary-500` behind a primary text and icon.
- Disabled: the disabled colors of the button, in both states.

## State And Variant Interaction

- `[aria-pressed='true']` and `[data-pressed='true']` mark a pressed toggle.
- `[data-variant='secondary']` and `[data-appearance='transparent']` stay the same in both states: select the pressed state by `[data-pressed='true']`.
- `:disabled`, `:hover`, `:active` and `:focus-visible` work as on a button.

## Examples

Pass `className='markToggle'` to a toggle for a neutral pressed state instead of the primary tint:

<!-- example: toggle/styling-examples.css -->
```css
.markToggle[data-pressed='true'] {
  --button-color: var(--label-primary);
  --button-color-hover: var(--label-primary);
  --button-color-active: var(--label-primary);
  --button-background-color: var(--fills-primary);
  --button-background-color-hover: var(--fills-primary-hover);
  --button-background-color-active: var(--fills-primary-active);
}
```
<!-- /example -->

## Do Not Override

- Do not pass `variant` or `appearance` to the child with `asChild`: they win over the state, and pressed and released look the same.
- Do not make the pressed state differ only by a hue: keep a background or a fill that shows without color.
- Do not remove the focus ring: the toggle keeps the focus after a press, and the ring is the only sign that it has it.
