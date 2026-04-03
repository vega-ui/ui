# IconButton Styling

## Overview

`IconButton` styling is split between `ButtonBase` for semantic variant and appearance behavior, and the local `IconButton` size layer for square dimensions and icon sizing.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--icon-button-size` | `IconButton` | Square control size. |
| `--icon-button-br-ratio` | `IconButton` | Border-radius ratio. |
| `--icon-size` | nested icon content | Suggested icon size derived from the button size. |
| `--button-color` | `ButtonBase` | Current content color. |
| `--button-background-color` | `ButtonBase` | Current background color. |

## Part-Level Variables

- `IconButton`: local square sizing and radius.
- `ButtonBase`: shared variant, appearance, disabled, hover, active, and focus styling.

## State And Variant Interaction

- `size` maps directly to square button size.
- `variant` and `appearance` are handled by `ButtonBase`.
- Icon legibility depends on both control size and icon glyph selection.

## Examples

```css
.compactIconButton {
  --icon-button-size: 28px;
}
```

```css
.roundedIconButton {
  --icon-button-br-ratio: 0.5;
}
```

## Do Not Override

- Do not remove focus visibility without a replacement.
- Do not force icon sizes that look unbalanced inside the chosen button size.
- Do not use icon-only styling as a substitute for missing accessible labeling.
