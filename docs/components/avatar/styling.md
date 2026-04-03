# Avatar Styling

## Overview

`Avatar` styling is concentrated in the root identity surface, with child parts inheriting its size and color context.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--avatar-size` | `Avatar` and child parts | Overall avatar dimensions. |
| `--avatar-br-ratio` | `Avatar` | Border-radius ratio. |

## Part-Level Variables

- `Avatar`: root size, color, and clipping surface.
- `AvatarImage`: image content clipped to the root.
- `AvatarFallback`: text fallback sized against the root.
- `AvatarIcon`: icon fallback aligned to the root size.

## State And Variant Interaction

- `size` maps directly to spacing tokens.
- `variant` changes background and foreground treatment.
- Fallback readability depends heavily on chosen size.

## Examples

```css
.roundedAvatar {
  --avatar-br-ratio: 0.5;
}
```

```css
.compactAvatar {
  --avatar-size: 20px;
}
```

## Do Not Override

- Do not allow fallback text to outgrow the chosen size.
- Do not remove clipping if images still depend on the root shape.
- Do not rely on color alone to distinguish variant meaning.
