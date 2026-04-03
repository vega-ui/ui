# Tooltip Styling

## Overview

`Tooltip` styling is driven by floating-surface semantics plus a small arrow visual. The component should stay visually lighter than `Popover` and significantly lighter than modal overlays.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--surface-secondary` | `TooltipContent`, `TooltipArrow` | Tooltip surface. |
| `--surface-shadow` | `TooltipContent` | Floating elevation. |
| `--text-color` | `TooltipContent` | Readable tooltip text. |

## Part-Level Variables

- `TooltipContent` uses floating surface semantics.
- `TooltipArrow` uses the same surface color as the content.

## State And Variant Interaction

- Most variation comes from placement and content length, not a large variable API.
- Styling should keep the tooltip distinct from action-heavy popovers.

## Examples

```css
.brand-theme {
  --surface-secondary: #1f1f22;
  --text-color: #fff;
}
```

## Do Not Override

- Do not turn tooltip styling into a pseudo-popover with task-heavy content.
- Do not flatten color and shadow until the tooltip loses its floating hint-like character.
