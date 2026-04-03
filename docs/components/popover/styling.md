# Popover Styling

## Overview

`Popover` styling is based mainly on floating surface semantics. Most customization should preserve the sense that the content is brief, elevated, and anchored.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--surface-primary` | `PopoverContent` | Popover surface. |
| `--surface-shadow` | `PopoverContent` | Floating elevation. |

## Part-Level Variables

- `PopoverContent` uses floating-surface theme semantics rather than a large `--popover-*` variable set.
- `PopoverBackdrop`, when present, follows the shared overlay token model rather than popover-local variables.

## State And Variant Interaction

- Optional backdrop changes presentation more than token usage.
- Content density often has more impact than token changes, so spacing and width choices matter as much as color.

## Examples

```css
.brand-theme {
  --surface-primary: #fffdf9;
  --surface-shadow: 0 20px 60px rgba(18, 14, 9, 0.14);
}
```

## Do Not Override

- Do not restyle the popover into a pseudo-dialog without changing the component choice itself.
- Do not flatten the shadow and surface contrast until the floating layer loses its anchor-like feel.
