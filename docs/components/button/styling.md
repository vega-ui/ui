# Button Styling

## Overview

`Button` styling is split between `ButtonBase` for semantic variant and appearance behavior, and the local `Button` size layer for spacing, height, and width.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--button-height` | `Button` | Control height. |
| `--button-br-ratio` | `Button` | Border-radius ratio. |
| `--button-color` | `ButtonBase` | Current text color. |
| `--button-background-color` | `ButtonBase` | Current background color. |
| `--button-border-color` | `ButtonBase` | Current border color. |

## Part-Level Variables

- `Button`: local size, padding, and `fullWidth` behavior.
- `ButtonBase`: shared variant, appearance, disabled, hover, active, and focus styling.

## State And Variant Interaction

- `size` changes height, padding, and font size.
- `variant` and `appearance` are mostly handled by `ButtonBase`.
- Disabled state is handled at the button-base layer across all appearances.

## Examples

```css
.compactButton {
  --button-height: 32px;
}
```

```css
.brandButton {
  --button-background-color: var(--color-primary-500);
}
```

## Do Not Override

- Do not remove focus visibility without a replacement.
- Do not invent custom appearance strings without matching CSS support.
- Do not treat semantic navigation and button styling as the same concern.
