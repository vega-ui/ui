# Badge Styling

## Overview

`Badge` styling is concentrated in one compact surface with size, appearance, and semantic variant variables.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--badge-size` | `Badge` | Height and minimum width. |
| `--badge-font-size` | `Badge` | Text size. |
| `--badge-background-color` | `Badge` | Background color. |
| `--badge-border-color` | `Badge` | Outline color. |
| `--badge-color` | `Badge` | Text color. |

## Part-Level Variables

- `Badge`: owns the entire badge surface.

## State And Variant Interaction

- `size` changes height and font size.
- `appearance` changes fill, surface, outline, or ghost treatment.
- `variant` changes the semantic color family.

## Examples

```css
.compactBadge {
  --badge-size: 18px;
}
```

```css
.brandBadge {
  --badge-border-radius-ratio: 0.5;
}
```

## Do Not Override

- Do not stretch the badge into a paragraph container.
- Do not rely on color alone to carry meaning.
- Do not invent custom variants without matching styles.
